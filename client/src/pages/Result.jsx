import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';

const Result = () => {
  const { generateImage } = useContext(AppContext);

  const [image, setImage] = useState(assets.sample_img_1);
  const [isImageGenerated, setIsImageGenerated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setIsLoading(true);

    if(input){
      const resultImage = await generateImage(input);
      console.log(resultImage)
      if (resultImage) {
        setImage(resultImage);
        setIsImageGenerated(true);
      }
    }
    setIsLoading(false);
  };

  return (
    <form className="flex flex-col items-center px-4 py-6" onSubmit={onSubmitHandler}>
      {/* Image + Loading */}
      <div>
        <div className="relative">
          <img src={image} alt="Generated Output" className="max-w-sm rounded" />
          <span
            className={`absolute bottom-0 left-0 h-1 bg-blue-500 ${
              isLoading ? 'w-full transition-all duration-[10s]' : 'w-0'
            }`}
          />
        </div>
        <p className={!isLoading ? 'hidden' : ''}>Loading...</p>
      </div>

      {/* Input Field */}
      {!isImageGenerated && (
        <div className="flex w-full max-w-xl bg-neutral-500 text-white text-sm p-0.5 mt-10 rounded-full">
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder="Describe what you want to generate"
            className="flex-1 bg-transparent outline-none ml-8 max-sm:w-20 placeholder:text-gray-300"
          />
          <button
            type="submit"
            disabled={isLoading}
            className={`bg-zinc-900 px-10 sm:px-16 py-3 rounded-full cursor-pointer ${
              isLoading ? 'opacity-50' : ''
            }`}
          >
            {isLoading ? 'Generating...' : 'Generate'}
          </button>
        </div>
      )}

      {/* Buttons */}
      {isImageGenerated && (
        <div className="flex gap-2 flex-wrap justify-center text-white text-sm p-0.5 mt-10 rounded-full">
          <p
            onClick={() => {
              setIsImageGenerated(false);
              setInput('');
              setImage(assets.sample_img_1);
            }}
            className="bg-transparent border border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer"
          >
            Generate Another
          </p>
          <a href={image} download className="bg-zinc-900 px-10 py-3 rounded-full">
            Download
          </a>
        </div>
      )}
    </form>
  );
};

export default Result;
