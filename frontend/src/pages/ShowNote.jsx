import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'

const ShowNote = () => {
  const [note, setNote] = useState({});
  const [loading, setLoading] = useState(false);
  const {id} = useParams();

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5555/notes/${id}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
        })
        .then(data => {
            setNote(data);
            setLoading(false);
        })
        .catch(error => {
            console.log(error);
            setLoading(false);
        });
    }, []);

  return (
    <div className='p-4'>
        <BackButton />
        <h1 className='text-3xl my-4'>Show Note</h1>
        {loading ? (<Spinner />) : (
            <div className='flex flex-col border-2 border-sky0-400 rounded-xl w-fit p-4'>
                <div className='my-4'>
                    <span className='text-xl mr-4 text-gray-500'>Id</span>
                    <span>{note._id}</span>
                </div>
                <div className='my-4'>
                    <span className='text-xl mr-4 text-gray-500'>Title</span>
                    <span>{note.title}</span>
                </div>
                <div className='my-4'>
                    <span className='text-xl mr-4 text-gray-500'>Author</span>
                    <span>{note.author}</span>
                </div>
                <div className='my-4'>
                    <span className='text-xl mr-4 text-gray-500'>Subject</span>
                    <span>{note.subject}</span>
                </div>
                <div className='my-4'>
                    <span className='text-xl mr-4 text-gray-500'>Publish Year</span>
                    <span>{note.publishYear}</span>
                </div>
                <div className='my-4'>
                    <span className='text-xl mr-4 text-gray-500'>Create Time</span>
                    <span>{new Date(note.createdAt).toString()}</span>
                </div>

            </div>
        )}

    </div>
  )
}

export default ShowNote