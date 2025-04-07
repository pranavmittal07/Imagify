import React from 'react'
import { stepsData } from '../assets/assets'
import { motion } from 'framer-motion'

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

const Steps = () => {
  return (
    <motion.div
      className='flex flex-col justify-center items-center text-center my-32'
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h1
        className='text-3xl sm:text-4xl font-semibold mb-2'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        How it works
      </motion.h1>
      
      <motion.p
        className='text-lg text-gray-600 mb-8'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        Transform Words Into Stunning Images
      </motion.p>

      <motion.div
        className='space-y-4 w-full max-w-3xl text-sm px-4'
        variants={containerVariants}
      >
        {stepsData.map((item, index) => (
          <motion.div
            key={index}
            className='flex items-center gap-4 p-4 px-8 bg-white/20 border shadow-md cursor-pointer hover:scale-[1.02] transition-all duration-300 rounded-lg backdrop-blur'
            variants={itemVariants}
          >
            <img width={40} src={item.icon} alt={`Step ${index + 1}`} />
            <div className='text-left'>
              <h2 className='text-xl font-medium'>{item.title}</h2>
              <p className='text-gray-500'>{item.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}

export default Steps
