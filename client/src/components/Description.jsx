import React from 'react'
import { assets } from '../assets/assets.js'
import { motion } from 'framer-motion'

const Description = () => {
  return (
    <motion.div
      className='flex flex-col justify-center items-center text-center my-24 p-6 md:px-28'
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <motion.h1
        className='text-3xl sm:text-4xl font-semibold'
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        Create AI Images
      </motion.h1>

      <motion.p
        className='text-gray-500 mb-8'
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Turn your imagination into visuals
      </motion.p>

      <div className='flex flex-col gap-8 md:gap-14 md:flex-row items-center text-left'>
        <motion.img
          className='w-80 xl:w-96 rounded-lg shadow-lg'
          src={assets.sample_img_1}
          alt="Sample AI Art"
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        />

        <motion.div
          className='max-w-xl'
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className='mb-4 text-2xl sm:text-3xl font-semibold'>
            Introducing the AI-Powered Text-to-Image Generator
          </h2>
          <p className='text-gray-600 mb-4'>
            Easily bring your ideas to life with our free AI image generator. Whether you need stunning visuals or unique imagery, our tool transforms your text into eye-catching images — watch your concepts come alive instantly.
          </p>
          <p className='text-gray-600'>
            Simply type in a text prompt, and our cutting-edge AI will generate high-quality images in seconds. From product mockups to character art and portraits — even things that don’t exist yet — everything is possible with the power of AI.
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Description
