import userModel from "../models/userModel.js";
import axios from "axios";
import FormData from "form-data";

export const generateImage = async (req, res) => {
    try {
        const { prompt } = req.body;
        const userId = req.user?._id;

        console.log(req.body, req.user)
        // 🔐 Validate input
        if (!userId || !prompt) {
            return res.status(400).json({ success: false, message: "Missing user ID or prompt." });
        }

        // 💳 Atomic credit check & deduction
        const user = await userModel.findOneAndUpdate(
            { _id: userId, creditBalance: { $gt: 0 } },
            { $inc: { creditBalance: -1 } },
            { new: true }
        );

        if (!user) {
            return res.status(403).json({ success: false, message: "Insufficient credit or user not found." });
        }

        // 🖼️ Prepare API call to ClipDrop
        const formData = new FormData();
        formData.append("prompt", prompt);

        const response = await axios.post(
            "https://clipdrop-api.co/text-to-image/v1",
            formData,
            {
                headers: {
                    ...formData.getHeaders(),
                    'x-api-key': process.env.CLIPDROP_API_KEY,
                },
                responseType: 'arraybuffer',
            }
        );

        // 🧪 Convert image to base64
        const base64Image = Buffer.from(response.data, 'binary').toString('base64');
        const imageUrl = `data:image/png;base64,${base64Image}`;

        // 📤 Return the result
        res.json({
            success: true,
            message: "Image generated successfully.",
            image: imageUrl,
            creditBalance: user.creditBalance
        });

    } catch (error) {
        console.error("Error generating image:", error.message);

        if (error.response) {
            return res.status(502).json({
                success: false,
                message: "ClipDrop API error.",
                status: error.response.status,
                data: error.response.data,
            });
        }

        res.status(500).json({
            success: false,
            message: "Internal server error.",
            error: error.message,
        });
    }
};
