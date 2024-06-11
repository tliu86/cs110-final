import React, {useState, useEffect} from 'react'
import { useNavigate, useParams} from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import { useSnackbar } from 'notistack'



const DeleteNote = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {id} = useParams();
    const { enqueueSnackbar } = useSnackbar();

    const handleDeleteNote = () => {
        setLoading(true);
        fetch(`http://localhost:5555/notes/${id}`, {
        method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        })
        .then(() => {
            setLoading(false);
            enqueueSnackbar('Note Deleted Successfully', {variant: 'success'})
            navigate('/home');
        })
        .catch(error => {
            setLoading(false);
            enqueueSnackbar('Error, Note Deletion Failed', {variant: 'Error'})
            console.log(error);
        });
    };
  return (
    <div className='p-4'>
        <BackButton />
        <h1 className='text-3xl my-4'> Delete Note</h1>
        {loading ? <Spinner /> : ''}
        <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
            <h3 className='text-2xl'>Are you sure you want to delete this note</h3>
            <button className='p-4 bg-red-600 text-white m-8 w-full' onClick={handleDeleteNote}>
                Yes, Delete it
            </button>
        </div>

    </div>
  )
}

export default DeleteNote