import React from 'react'
import { assets } from '../assets/assets.js'

const Footer = () => {
  return (
    <div className='flex items-center justify-between gap-4 py-3 mt-20 px-6 flex-wrap'>
      <img src={assets.logo} width={150} alt="" />

      <p className='flex-1 border-l border-gray-400 pl-4 text-sm text-gray-500 max-sm:hidden'>
        Copyright © Beachievers | All rights reserved
      </p>

      <div className='flex gap-4'>
        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
          <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn" width={24} />
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
          <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" width={24} />
        </a>
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
          <img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" alt="Twitter" width={24} />
        </a>
      </div>
    </div>
  )
}

export default Footer
