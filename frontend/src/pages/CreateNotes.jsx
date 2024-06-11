/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import { useSnackbar } from 'notistack'

const CreateNotes = () => {
    const [title, setTitle] = useState('');
    // const [author, setAuthor] = useState('');
    const [subject, setSubject] = useState('');
    // const [publishYear, setPublishYear] = useState('');
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const handleSaveNote = () => {
        const data = {
            title,
            // author,
            subject,
            // publishYear,
        };

        if (!title || !subject || !files) return enqueueSnackbar('Error, Enter all fields and upload your notes.', {variant: 'Error'});

        setLoading(true);

        const formData = new FormData();
        files.forEach((file, index) => {
            formData.append(`file${index}`, file);
        });

        formData.set('title', title);
        formData.set('subject', subject);

        fetch('http://localhost:5555/notes', {
            method: 'POST',
            headers: {
                "x-access-token": localStorage.getItem('token'),
            },
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((r) => {
            setLoading(false);
            enqueueSnackbar('Note Created Successfully', {variant: 'success'});
            // window.open(`/notes/details/${r._id}`, '_blank').focus();
            navigate('/home');
        })
        .catch(error => {
            setLoading(false);
            enqueueSnackbar('Error, Note Creation Failed', {variant: 'Error'});
            console.log(error);
        });
    };

    return (
    <div className='p-4'>
        <BackButton />
        <h1 className='text-3xl my-4'>Create Note</h1>
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
            {/* <div className='my-4'>
                <label className='text-xl mr-4 text-gray-500'>Author</label>
                <input 
                    type='text'
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className='border-2 border-gray-500 px-4 py-2 w-full'
                />
            </div> */}
            <div className='my-4'>
                <label className='text-xl mr-4 text-gray-500'>Subject</label>
                <input 
                    type='text'
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className='border-2 border-gray-500 px-4 py-2 w-full'
                />
            </div>
            {/* <div className='my-4'>
                <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
                <input 
                    type='text'
                    value={publishYear}
                    onChange={(e) => setPublishYear(e.target.value)}
                    className='border-2 border-gray-500 px-4 py-2 w-full'
                />
            </div> */}
            <div>
                <label className="text-xl mr-4 text-gray-500" htmlFor="files">Pictures or pdf of notes</label>
                <input
                    id="files" 
                    type="file" 
                    onChange={(e) => setFiles([...e.target.files])}
                    className="px-4 py-2 w-full" 
                    accept="image/*,.pdf"
                    multiple 
                />
            </div>
            <button className='p-2 bg-sky-300 m-8' onClick={handleSaveNote}>
                Save
            </button>
            
        </div>

    </div>
  )
}

export default CreateNotes