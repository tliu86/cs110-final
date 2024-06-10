import React from 'react'
import { Link } from 'react-router-dom';
import {AiOutlineEdit } from 'react-icons/ai';
import {BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete} from 'react-icons/md';
import { MdOutlineSubtitles } from "react-icons/md";
import { MdCastForEducation } from "react-icons/md";
import { BiUserCircle } from 'react-icons/bi';
import NoteSingleCard from './NoteSingleCard';


const NotesCard = ({notes}) => {
  return (
    <div className='grid sm: grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {notes.map((note) => 
        (
            <NoteSingleCard key={note._id} item={note} />
        ))}
    </div>
  )
}

export default NotesCard;