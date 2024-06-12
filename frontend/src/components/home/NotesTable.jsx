import React from 'react'
import { Link } from 'react-router-dom';
import {AiOutlineEdit } from 'react-icons/ai';
import {BsInfoCircle } from 'react-icons/bs';
import {MdOutlineAddBox, MdOutlineDelete} from 'react-icons/md';
const NotesTable = ({notes}) => {
const userID = localStorage.getItem("userID");

  return (
    <table className='w-full border-separate border-spacing-2' >
                <thead>
                    <tr>
                        <th className='border border-slate-600 rounded-md'>No</th>
                        <th className='border border-slate-600 rounded-md'>Title</th>
                        <th className='border border-slate-600 rounded-md max-md:hidden'>Author</th>
                        <th className='border border-slate-600 rounded-md max-md:hidden'>Subject</th>
                        <th className='border border-slate-600 rounded-md max-md:hidden'>Average Rating</th>
                        <th className='border border-slate-600 rounded-md'>Operations</th>
                    </tr>
                </thead>
                
                <tbody>
                    {notes.map((note, index) => (
                        <tr key={note._id} className='h-8'>
                            <td className='border border-slate-700 rounded-md text-center'>
                                {index + 1}
                            </td>
                            <td className='border border-slate-700 rounded-md text-center'>
                                {note.title}
                            </td>
                            <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                                {note.authorName}
                            </td>
                            <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                                {note.subject}
                            </td>
                            <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                                <div className="flex justify-center items-center ">
                                    <span className='text-xl pr-4'>{note.averageRating}/5</span> 
                                    {[...Array(Math.round(note.averageRating || 0))].map((e,i) => (
                                        <svg key={i} className="w-4 h-4 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                                        </svg>)
                                    )}
                                    {[...Array(5 - Math.round(note.averageRating || 0))].map((e,i) => (
                                        <svg key={i} className="w-4 h-4 ms-1 text-gray-300 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                                    </svg>
                                    ))}
                                </div>
                            </td>
                            <td className='border border-slate-700 rounded-md text-center'>
                                <div className='flex justify-center gap-x-4'>
                                    <Link to={`/notes/details/${note._id}`}>
                                        <BsInfoCircle className='text-2xl text-green-800' />
                                    </Link>
                                   {userID == note.author && (<div className="flex justify-center gap-x-4">
                                        <Link to={`/notes/edit/${note._id}`}>
                                            <AiOutlineEdit className='text-2xl text-yellow-600' />
                                        </Link>
                                        <Link to={`/notes/delete/${note._id}`}>
                                            <MdOutlineDelete className='text-2xl text-red-600' />
                                        </Link>
                                   </div>)}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
  )
}

export default NotesTable