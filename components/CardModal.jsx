import React from 'react'
import { motion } from 'framer-motion';

const CardModal = ({ onClose, entry }) => {

  return (
    <div 
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-cover bg-center"
    style={{
    backgroundBlendMode: 'overlay',
    }}
>
  <motion.div
    initial={{ scale: 0.9, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    exit={{ scale: 0.9, opacity: 0 }}
    transition={{ type: "spring", stiffness: 200, damping: 20 }}
    className="bg-white dark:bg-neutral-400 p-10 rounded-4xl shadow-xl w-[90vw] max-w-5xl"
  >
    
    <div className='flex flex-col gap-4 w-full'>
        <div className=' modal-scroll-container'>
            <div className='flex flex-row justify-between items-center'>
                <div>
                    <p className='font-bold'> {new Date(entry.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="border border-orange-1 rounded-full p-3 text-dark font-bold flex items-center justify-center text-center text-sm">
                    <p>{entry.mood}</p>
                </div>
            </div>
            
            <div>
                <h1 className="text-3xl font-bold mb-10 text-neutral-600 dark:text-neutral-100 mx-auto">{entry.title}</h1>
            </div>
            <div>
                <p className='font-bold text-orange-1'>{entry.tag}</p>
                <p className="font-normal text-sm text-black relative z-10 my-4">
                    {entry.content}
                </p>
            </div>
            <div className='flex flex-col gap-2 mt-10'>
                {/* ... UI for date, mood, content ... */}
                <h1 className='font-bold text-orange-2'>AI Insights</h1>
                {entry.analysis? (
                    <p className='text-sm text-neutral-600'>{entry.analysis}</p>
                ) : (
                    <p>No AI analysis yet.</p>
                )}    
            </div>
        </div>

        <div className="flex justify-end mt-4 gap-2">
        <button
            onClick={onClose}
            className="px-4 py-2 bg-neutral-300 dark:bg-neutral-700 rounded-xl text-sm cursor-pointer"
        >
            Close
        </button>
        </div>
    </div>

    
  </motion.div>
</div>
  )
}

export default CardModal
