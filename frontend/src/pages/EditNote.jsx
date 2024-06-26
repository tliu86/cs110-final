import React, {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import {useSnackbar } from 'notistack';

const EditNote = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [subject, setSubject] = useState('');
    const [publishYear, setPublishYear] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
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
        .then((data) => {
            setTitle(data.title)
            setAuthor(data.author)
            setSubject(data.subject)
            setPublishYear(data.publishYear)
            setLoading(false)
        })
        .catch((error) => {
            setLoading(false)
            alert('An error happened,. Please check console')
            console.log(error)
        })
    }, [])
    const handleEditNote = () => {
        const data = {
            title,
            author,
            subject,
            publishYear,
        };
        setLoading(true);
        fetch(`http://localhost:5555/notes/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(() => {
            setLoading(false);
            enqueueSnackbar('Note Updated Successfully', {variant: 'success'})
            navigate('/home');
        })
        .catch(error => {
            setLoading(false);
            enqueueSnackbar('Error, Note Update Failed', {variant: 'Error'})
            console.log(error);
        });
    };

    return (
    <div className='p-4'>
        <BackButton />
        <h1 className='text-3xl my-4'>Edit Book</h1>
        {loading ? (<Spinner />) : ''}
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
            <div className='my-4'>
                <label className='text-xl mr-4 text-gray-500'>Title</label>
                <input 
                    type='text'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className='border-2 border-gray-500 px-4 py-2 w-full'
                />
            </div>
            <div className='my-4'>
                <label className='text-xl mr-4 text-gray-500'>Author</label>
                <input 
                    type='text'
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className='border-2 border-gray-500 px-4 py-2 w-full'
                />
            </div>
            <div className='my-4'>
                <label className='text-xl mr-4 text-gray-500'>Subject</label>
                <input 
                    type='text'
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className='border-2 border-gray-500 px-4 py-2 w-full'
                />
            </div>
            <div className='my-4'>
                <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
                <input 
                    type='text'
                    value={publishYear}
                    onChange={(e) => setPublishYear(e.target.value)}
                    className='border-2 border-gray-500 px-4 py-2 w-full'
                />
            </div>
            <button className='p-2 bg-sky-300 m-8' onClick={handleEditNote}>
                Edit
            </button>
            
        </div>

    </div>
  )
}

export default EditNote