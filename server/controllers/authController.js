import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import razorpay from 'razorpay';
import transactionalModel from "../models/transactionModel.js";

// Register User
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please fill all required fields." });
  }

  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ message: "User already exists with this email." });
  }

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await userModel.create({
    name,
    email, 
    password: hashedPassword
  });

  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });

  res.status(201).json({
    message: "User registered successfully",
    user: {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email
    },
    token
  });
};

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please provide both email and password." });
  }

  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password." });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password." });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });

  res.status(200).json({
    message: "Login successful",
    user: {
      id: user._id,
      name: user.name,
      email: user.email
    },
    token
  });
};

// Assuming user is already authenticated via middleware

const userCredit = async (req, res) => {
  const user = req.user;

  if (user.creditBalance <= 0) {
    return res.status(403).json({
      success: false,
      message: "You have no credits left. Please recharge.",
      remainingCredits: user.creditBalance,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  }


  await user.save();

  return res.status(200).json({
    success: true,
    message: "Credit used successfully.",
    remainingCredits: user.creditBalance,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
};

// Logout just tells client to remove token
const logoutUser = (req, res) => {
  // If you're not using cookies, you just clear token client-side
  res.status(200).json({ message: 'User logged out successfully' });
};

const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

const paymentRazorpay = async(req,res) => {
  try{
    const userId = req.user._id
    const { planId } = req.body;

    const userData = await userModel.findById(userId)

    if(!userId || !planId){
      return res.json({success: false, message: 'Missing Details'});
    }

    let credits, plan, amount, date;

    switch(planId){
      case 'Basic':
        plan = 'Basic'
        credits = 100
        amount = 1000
        break;
      
      case 'Advanced':
        plan = 'Advanced'
        credits = 500
        amount = 5000
        break;

      case 'Business':
        plan = 'Business'
        credits = 5000
        amount = 25000
        break;
      
      default:
        return res.json({success:false, message:'plan not found'})
    }

    date = Date.now();

    const transactionData = {
      userId, plan, credits, amount, date
    }

    const newTransaction = await transactionalModel.create(transactionData)

    const options = {
      amount : amount*100,
      currency: process.env.CURRENCY,
      receipt: newTransaction._id,
    }

    await razorpayInstance.orders.create(options, (error, order)=>{
      if(error){
        console.log(error);
        return res.json({success: false, message: error})
      }else{
        res.json({success: true, order})
      }
    })

  }catch (error){
    console.log(error)
    res.json({success:false, message: error.message})
  }
};

const verifyRazorpay = async(req,res)=>{
  try{
    const {razorpay_order_id} = req.body;
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)

    if(orderInfo.status === 'paid'){
      const transactionData = await transactionalModel.findById(orderInfo.receipt)

      if(transactionData.payment){
        return res.json({success:false, message:' Payment Failed'})
      }

      const userData = await userModel.findById(transactionData.userId)

      const creditBalance = userData.creditBalance + transactionData.credits;

      await userModel.findByIdAndUpdate(userData._id, {creditBalance})

      await transactionalModel.findByIdAndUpdate(transactionData._id,{payment: true})

      res.json({success:true, message: "Credits Added"})
    }else{
      res.json({success: false, message: "Payment Failed"})
    }
  }catch(error){
    console.log(error);
    res.json({success:false, message: error.message});
  }
}

export { registerUser, loginUser, userCredit, logoutUser, paymentRazorpay, verifyRazorpay};
  