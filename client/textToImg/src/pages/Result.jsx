import { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion"; 
import { AppContext } from "../context/state";
const sampleImage = assets.sample_img_1;
export function Result() {
  const [image, SetImage] = useState(assets.sample_img_1);
  const [imageLoaded, SetimageLoaded] = useState(false);
  const [loaded, setLoaded] = useState(true);
  const [input, SetInput] = useState("");
  const {generateImage}=useContext(AppContext);
  const [isGenerating, setIsGenerating] = useState(false);
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!input.trim()) return; // do nothing if input is empty

      setIsGenerating(true);
      const image=await generateImage(input);
      if(image){
        SetimageLoaded(true);
        SetImage(image);
      }
      setIsGenerating(false);
    
  };
  return (
    <motion.div
      className="flex flex-col justify-center items-center max-h-[90vh]"
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="relative">
  <img src={image} alt="Generated" className="max-w-sm rounded" />

  {isGenerating && (
    <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center rounded">
      <div className="w-40 h-1 bg-blue-500 animate-pulse mb-2"></div>
      <p className="text-white text-sm">Generating image...</p>
    </div>
  )}
</div>

      {!imageLoaded ? (
        <form onSubmit={onSubmitHandler} className="flex w-full max-w-xl bg-neutral-500 text-white text-sm p-0.5 mt-10 rounded-full">
          <input
            type="text"
            value={input}
            onChange={(e)=>SetInput(e.target.value)}
            placeholder="Describe what you want to generate"
            className="flex-1 bg-transparent outline-none max-sm:w-20 ml-8"
          />
          <button
            type="submit"
            className="bg-zinc-900 px-10 sm:px-16 py-3 rounded-full text-white"
            onClick={() => {
              setLoaded(false);
            }}
          >
            Generate
          </button>
        </form>
      ) : (
        <div className="flex gap-2 flex-wrap justify-center text-white text-sm p-0.5 mt-10 rounded-full">
          <p
            onClick={() => {
              SetimageLoaded(false);
              SetInput("");
            }}
            className="bg-transparent border-zinc-900 text-black px-8 py-3 border rounded-full cursor-pointer"
          >
            Generate Another
          </p>
          <a
            href={image}
            download
            className="bg-zinc-900 px-10 py-3 rounded-full cursor-pointer"
          >
            Download
          </a>
        </div>
      )}
    </motion.div>
  );
}
