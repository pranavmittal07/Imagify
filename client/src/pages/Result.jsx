import React from 'react'
import { assets } from '../assets/assets'
import { useState } from 'react'

const Result = () => {

  const [image, setImage] = useState(assets.sample_img_1)
  const [isImageLoaded, setIsImageLoaded] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [input, setInput] = useState('')


  const onSubmitHandler = async (e) => {

  }

  return (
    <form className="flex flex-col items-center px-4 py-6" onSubmit={onSubmitHandler}>
      {/* Image + Loading */}
      <div>
        <div className='relative'>
          <img src={image} alt="Generated Output" className='max-w-sm rounded' />
          <span className={`absolute bottom-0 left-0 h-1 bg-blue-500 ${isLoading ? 'w-full transition-all duration-[10s]': 'w-0'}`}/>
        </div>
        <p className={!isLoading ? 'hidden' : ''}>Loading...</p>
      </div>

      {/* Input Field + Button */
      !isImageLoaded && 
      <div className='flex w-full max-w-xl bg-neutral-500 text-white text-sm p-0.5 mt-10 rounded-full'>
        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          type="text"
          placeholder='Describe what you want to generate'
          className='flex-1 bg-transparent outline-none ml-8 max-sm:w-20 placeholder:text-gray-300'
        />
        <button type="submit" className='bg-zinc-900 px-10 sm:px-16 py-3 rounded-full cursor-pointer'>
          Generate
        </button>
      </div>
      }
      

      {/* Links Section */
      isImageLoaded &&
      <div className="flex gap-2 flex-wrap justify-center text-white text-sm p-0.5 mt-10 rounded-full">
        <p onClick={()=>{setIsImageLoaded(false)}} className="bg-transparent border border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer">Generate Another</p>
        <a href={image} download className="bg-zinc-900 px-10 py-3 rounded-full">Download</a>
      </div>}
      
    </form>
  )
}

export default Result
