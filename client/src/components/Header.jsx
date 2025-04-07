import React, { useContext } from 'react'
import { assets } from '../assets/assets.js'
import { motion } from 'framer-motion'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const { user, setShowLogin } = useContext(AppContext)
  const navigate = useNavigate()

  const onClickHandler = () => {
    if (user) navigate('/result')
    else setShowLogin(true)
  }

  return (
    <motion.div
      className='flex flex-col justify-center items-center text-center my-8'
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {/* Top Banner */}
      <motion.div
        className='text-stone-500 inline-flex gap-2 bg-white px-6 py-1 rounded-full border border-neutral-500'
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <p>Best Text Generator App.</p>
        <motion.img
          src={assets.star_icon}
          alt="star"
          className='w-4'
          animate={{ rotate: [0, 15, -15, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
      </motion.div>

      {/* Heading */}
      <motion.h1
        className='text-4xl max-w-[300px] sm:text-7xl sm:max-w-[590px] mx-auto mt-10'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        Turn text to <span className='text-blue-600'>image</span> in seconds
      </motion.h1>

      {/* Subtext */}
      <motion.p
        className='text-center max-w-xl mx-auto mt-5'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        Unleash your creativity with AI. Turn your imagination into visual art in seconds - just type, and watch the magic happen
      </motion.p>

      {/* CTA Button */}
      <motion.button
        onClick={onClickHandler}
        className='sm:text-lg text-white bg-black w-auto mt-8 px-12 py-2.5 flex items-center gap-2 rounded-full hover:bg-gray-900 transition cursor-pointer'
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        Generate Images
        <img className='h-6' src={assets.star_group} alt="group" />
      </motion.button>

      {/* Sample Images */}
      <motion.div
        className='flex flex-wrap justify-center items-center gap-3 mt-16'
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
      >
        {Array(6).fill('').map((_, index) => (
          <motion.img
            key={index}
            className='w-5 sm:w-8 rounded hover:scale-105 transition-all duration-300 cursor-pointer max-sm:w-10 lg:w-30'
            src={index % 2 === 0 ? assets.sample_img_2 : assets.sample_img_1}
            alt="sample"
            width={70}
            variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: { opacity: 1, scale: 1 }
            }}
          />
        ))}
      </motion.div>

      <motion.p
        className='mt-2 text-neutral'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        Generated Images from the Imagify
      </motion.p>
    </motion.div>
  )
}

export default Header
