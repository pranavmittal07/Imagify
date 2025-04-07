import React from 'react'
import { assets, testimonialsData } from '../assets/assets'
import { motion } from 'framer-motion'

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6 }
  })
}

const Testimonials = () => {
  return (
    <div className='flex flex-col justify-center items-center text-center my-24 p-6 md:px-28'>
      <motion.h1
        className='text-3xl sm:text-4xl font-semibold'
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Customer Testimonials
      </motion.h1>
      
      <motion.p
        className='text-gray-500 mb-8'
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        What our users are saying
      </motion.p>

      <div className='flex flex-wrap justify-center gap-6'>
        {testimonialsData.map((testimonial, index) => (
          <motion.div
            key={index}
            className='bg-white/20 backdrop-blur-lg p-8 rounded-lg shadow-md w-80 cursor-pointer hover:scale-[1.02] transition-transform duration-300 ease-in-out'
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            custom={index}
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className='flex flex-col items-center text-center'>
              <img className='rounded-full w-14' src={testimonial.image} alt={testimonial.name} />
              <h2 className='text-xl font-semibold mt-3'>{testimonial.name}</h2>
              <p className='text-gray-500 mb-2'>{testimonial.role}</p>
              <div className='flex mb-4'>
                {Array(testimonial.stars).fill().map((_, i) => (
                  <img key={i} src={assets.rating_star} alt="star" />
                ))}
              </div>
              <p className='text-sm text-gray-600'>{testimonial.text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Testimonials
