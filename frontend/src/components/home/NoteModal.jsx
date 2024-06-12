import React from 'react'
import { Link } from 'react-router-dom';
import {AiOutlineEdit, AiOutlineClose } from 'react-icons/ai';
import {BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete} from 'react-icons/md';
import { MdOutlineSubtitles } from "react-icons/md";
import { MdCastForEducation } from "react-icons/md";
import { BiUserCircle } from 'react-icons/bi';

const NoteModal = ({item, onClose}) => {
  return (
    <div className='fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center'
    onClick={onClose}>
        <div onClick={(event) => event.stopPropagation()}
        className='w-[600px] max-w-full h-[400px] bg-white rounded-xl p-4 flex flex-col relative overflow-auto'>
        <AiOutlineClose className="absolute right-6 top-6 text-3xl text-red-600 cursor-pointer"
            onClick = {onClose} />
            <h2 className='w-fit px-4 py-1 bg-red-300 rounded-lg'>
                        {item.publishYear}
                    </h2>
                    <h4 className='my-2 text-gray-500'>Id: {item._id}</h4>
                    <div className='flex justify-start items-center gap-x-2'>
                        <MdOutlineSubtitles className='text-red-300 text-2xl' />
                        <h2 className='my-1'>{item.title}</h2>
                    </div>
                    <div className='flex justify-start items-center gap-x-2'>
                        <BiUserCircle className='text-red-300 text-2xl' />
                        <h2 className='my-1'>{item.author}</h2>
                    </div>
                    <div className='flex justify-start items-center gap-x-2'>
                        <MdCastForEducation className='text-red-300 text-2xl' />
                        <h2 className='my-1'>{item.subject}</h2>
                    </div>
                    <div className='flex justify-between items-center gap-x-2 mt-4 p-4'>
                        <Link to={`/notes/details/${item._id}`}>
                            <BsInfoCircle className='text-2xl text-green-800 hover:text-black' />
                        </Link>
                        <Link to={`/notes/details/${item._id}`}>
                            <AiOutlineEdit className='text-2xl text-yellow-600 hover:text-black' />
                        </Link>
                        <Link to={`/notes/details/${item._id}`}>
                            <MdOutlineDelete className='text-2xl text-red-600 hover:text-black' />
                        </Link>
                    </div>
                    <p className='my-2'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.</p>
        </div>
    </div>
  )
}

export default NoteModal 