import React, { useContext } from 'react'
import { assets } from '../assets/assets.js'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const GenerateBtn = () => {
  const { user, setShowLogin } = useContext(AppContext)
  const navigate = useNavigate()

  const onClickHandler = () => {
    if (user) {
      navigate('/result')
    } else {
      setShowLogin(true)
    }
  }

  return (
    <motion.div
      className='pb-16 text-center'
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <motion.h1
        className='text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold'
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        See the magic. Try now
      </motion.h1>

      <motion.button
        onClick={onClickHandler}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className='inline-flex items-center gap-2 px-12 py-3 rounded-full bg-black text-white m-auto transition-all duration-500 my-10 shadow-lg cursor-pointer'
      >
        Generate Images
        <img src={assets.star_group} className='h-6' alt="stars" />
      </motion.button>
    </motion.div>
  )
}

export default GenerateBtn
