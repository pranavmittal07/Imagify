import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import {plans} from '../assets/assets'
import { AppContext } from '../context/AppContext'

const BuyCredit = () => {

  const {user} = useContext(AppContext)

  return (
    <div className='min-h-[65vh] text-center pt-14 mb-10 px-4'>
      <button className='border border-gray-400 px-10 py-2 rounded-full mb-6 text-sm hover:bg-gray-100 transition'>
        Our Plans
      </button>

      <h1 className='text-3xl font-medium mb-10'>Choose the Plan</h1>

      <div className='flex flex-wrap justify-center gap-10 text-left'>
        {plans.map((item, index) => (
          <div
            key={index}
            className='bg-white drop-shadow-sm border rounded-lg py-12 px-8 text-gray-600 hover:scale-105 transition-all duration-500 w-80'
          >
            <img width={40} src={assets.logo_icon} alt="plan-icon" className='w-12 h-12 mb-4' />
            <h2 className='mt-3 mb-1 semibold'>{item.id}</h2>
            <p className='text-sm'>{item.desc}</p>
            <p className='mt-6'>
              <span className='text-3xl font-medium'> ₹ {item.price} </span>/ {item.price} Credits
            </p>

            <button className='w-full bg-gray-800 text-white mt-8 text-sm rounded-md py-2.5 min-w-52 ' >{user ? 'Purchase':'Get Started'}</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BuyCredit
