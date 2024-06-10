import React from 'react'
import { Link } from 'react-router-dom';
import {AiOutlineEdit } from 'react-icons/ai';
import {BsInfoCircle } from 'react-icons/bs';
import {MdOutlineAddBox, MdOutlineDelete} from 'react-icons/md';
const NotesTable = ({notes}) => {
  return (
    <table className='w-full border-separate border-spacing-2' >
                <thead>
                    <tr>
                        <th className='border border-slate-600 rounded-md'>No</th>
                        <th className='border border-slate-600 rounded-md'>Title</th>
                        <th className='border border-slate-600 rounded-md max-md:hidden'>Author</th>
                        <th className='border border-slate-600 rounded-md max-md:hidden'>Subject</th>
                        <th className='border border-slate-600 rounded-md max-md:hidden'>Publish Year</th>
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
                                {note.author}
                            </td>
                            <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                                {note.subject}
                            </td>
                            <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                                {note.publishYear}
                            </td>
                            <td className='border border-slate-700 rounded-md text-center'>
                                <div className='flex justify-center gap-x-4'>
                                    <Link to={`/notes/details/${note._id}`}>
                                        <BsInfoCircle className='text-2xl text-green-800' />
                                    </Link>
                                    <Link to={`/notes/edit/${note._id}`}>
                                        <AiOutlineEdit className='text-2xl text-yellow-600' />
                                    </Link>
                                    <Link to={`/notes/delete/${note._id}`}>
                                        <MdOutlineDelete className='text-2xl text-red-600' />
                                    </Link>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
  )
}

export default NotesTable