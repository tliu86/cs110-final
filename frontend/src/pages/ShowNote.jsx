import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import { useSnackbar } from 'notistack'

const ShowNote = () => {
  const [note, setNote] = useState({});
  const [similarNotes, setSimilarNotes] = useState([]);
  const [review, setReview] = useState('');
  const [myReview, setMyReview] = useState(false);
  const [AverageRating, setAverageRating] = useState(5);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const userID = localStorage.getItem("userID");
  const {id} = useParams();

  const updateReviews = async () => {
    fetch(`http://localhost:5555/notes/${id}/reviews`, {
        headers: {
            "content-type": "application/json",
            "x-access-token": localStorage.getItem('token'),
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
        })
        .then(data => {
            // console.log(userID, data)
            let myReview = data.reviews.filter((review) => review.userID == userID)[0]
            if (myReview) {
                // console.log(myReview)
                setMyReview(true);
                setReview(myReview.content);
                setRating(myReview.rating);
            }

            setReviews(data.reviews);
            setAverageRating(data.averageRating);
        })
        .catch(error => {
            console.log(error);
            setReviews(false);
        });
  }

  const handleSubmitReview = async () => {
    const data = {
        content: review,
        rating,
    };

    console.log(JSON.stringify(data))

    if (!rating) return enqueueSnackbar('You need to add a rating.', {variant: 'Error'});

    let resp = await fetch(`http://localhost:5555/notes/${id}/review`, {
        method: 'POST',
        headers: {
            "content-type": "application/json",
            "x-access-token": localStorage.getItem('token'),
        },
        body: JSON.stringify(data)
    });
    if(!resp.ok) {
        return enqueueSnackbar('Review Submission Failed', {variant: 'Error'});
    }

    let respData = resp.json();
    enqueueSnackbar('Note Created Successfully', {variant: 'success'});

    // add review to list

    await updateReviews();

    };

    const handleDeleteReview = async () => {
    
        let resp = await fetch(`http://localhost:5555/notes/${id}/review`, {
            method: 'DELETE',
            headers: {
                "x-access-token": localStorage.getItem('token'),
            },
        });
        if(!resp.ok) {
            return enqueueSnackbar('Review Deletion Failed', {variant: 'Error'});
        }
        
        setReview('');
        setRating(5);
        setMyReview(false);

        await updateReviews();
    
        
        };

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5555/notes/${id}`, {
            headers: {
                "content-type": "application/json",
                "x-access-token": localStorage.getItem('token'),
            },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
        })
        .then(data => {
            setNote(data);
        })
        .catch(error => {
            console.log(error);
            setNote(false);
        });

    fetch(`http://localhost:5555/notes/${id}/reviews`, {
        headers: {
            "content-type": "application/json",
            "x-access-token": localStorage.getItem('token'),
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
        })
        .then(data => {
            // console.log(userID, data)
            let myReview = data.reviews.filter((review) => review.userID == userID)[0]
            if (myReview) {
                // console.log(myReview)
                setMyReview(true)
                setReview(myReview.content);
                setRating(myReview.rating);
            }

            setReviews(data.reviews);
            setAverageRating(data.averageRating);
            setLoading(false);
        })
        .catch(error => {
            console.log(error);
            setReviews(false);
            setLoading(false);
        });

    fetch(`http://localhost:5555/notes/${id}/reviews`, {
        headers: {
            "content-type": "application/json",
            "x-access-token": localStorage.getItem('token'),
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
        })
        .then(data => {
            console.log(userID, data)
            let myReview = data.reviews.filter((review) => review.userID == userID)[0]
            if (myReview) {
                console.log(myReview)
                setMyReview(true)
                setReview(myReview.content);
                setRating(myReview.rating);
            }

            setReviews(data.reviews);
            setAverageRating(data.averageRating);
            // setLoading(false);
        })
        .catch(error => {
            console.log(error);
            setReviews(false);
            // setLoading(false);
        });
    
    fetch(`http://localhost:5555/notes/${id}/similar`, {
        headers: {
            "content-type": "application/json",
            "x-access-token": localStorage.getItem('token'),
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
        })
        .then(data => {
            // console.log(data)
            setSimilarNotes(data);
            setLoading(false);
        })
        .catch(error => {
            console.log(error);
            setSimilarNotes(false);
            setLoading(false);
        });
    }, []);

  return (
    <div className=''>
        {/* <BackButton />
        <h1 className='text-3xl my-4 w-fit'>Show Note</h1> */}

        {loading ? (<Spinner />) : !note ? "note not found": (
            <div className='flex flex-row'>
                <div className='p-4'>
                    <BackButton />
                    {/* <h1 className='text-3xl my-4 w-fit'>Show Note</h1> */}
                    <div className='flex mt-1 flex-col h-fit border-2 border-sky0-400 rounded-xl w-fit p-4'>
                        {/* <div className='my-1'>
                            <span className='text-xl mr-4 text-gray-500'>Id</span>
                            <span>{note._id}</span>
                        </div> */}
                        <div className='my-1'>
                            <span className='text-xl mr-4 text-gray-500'>Title</span>
                            <span>{note.title}</span>
                        </div>
                        <div className='my-1'>
                            <span className='text-xl mr-4 text-gray-500'>Author</span>
                            <span>{note.authorName}</span>
                        </div>
                        <div className='my-1'>
                            <span className='text-xl mr-4 text-gray-500'>Subject</span>
                            <span>{note.subject}</span>
                        </div>
                        <div className='my-1'>
                            <span className='text-xl mr-4 text-gray-500'>Created On</span>
                            <span>{new Date(note.createdAt).toString()}</span>
                        </div>

                    </div>
                    {userID != note.author && <div>
                        <h1 className='text-3xl my-4 w-fit'>Review This Note</h1>
                        <textarea
                            type='text'
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            className='border-2 border-gray-500 px-4 py-2 w-full'
                        
                        />
                        <label htmlFor="rating">Rating:</label>
                        <input 
                            type="number" 
                            id="rating" 
                            min="1" 
                            max="5" 
                            value={rating}
                            onChange={(e) => setRating(parseInt(e.target.value))}
                            className='border-2 border-gray-500 py-2 mt-2 ml-2 pl-2'
                        />
                        <button className='p-2 bg-sky-300 m-2' onClick={handleSubmitReview}>
                            {myReview ? "Update" : "Submit"} Review
                        </button>

                        {myReview && (<button className='p-2 bg-red-300 m-2' onClick={handleDeleteReview}>
                            Delete Review
                        </button>)}
                    </div>}

                    <div className="flex items-center pr-8">
                        <span className='text-3xl w-fit mr-4'>{reviews.length} Review{reviews.length == 1 ? '' : 's'}</span>
                        <span className='text-xl w-fit mr-4 ml-auto'>Average Rating {Math.round(AverageRating * 100) / 100}/5</span> 
                        {[...Array(Math.round(AverageRating))].map((e,i) => (
                            <svg key={i} className="w-4 h-4 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                            </svg>)
                        )}
                        {[...Array(5 - Math.round(AverageRating))].map((e,i) => (
                            <svg key={i} className="w-4 h-4 ms-1 text-gray-300 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                        </svg>
                        ))}
                    </div>
                    <div className="overflow-y-scroll max-h-[35vh] max-w-[40rem]">
                        {reviews?.map((review) => {
                            console.log(review)
                            if (false && review.userID == userID) {
                                return (
                                    <div key={review.userID}>
                                        {review.content}
                                        {review.rating}
                                        {review.userID}
                                        {review.noteID}
                                        {review.userName}
                                    </div>
                                )
                            } else {
                                return (
                                    <div key={review.userID} className="mt-2">
                                        <div className="flex items-center">
                                            <span className="mr-3">{review.userName}</span>
                                            <div className="flex items-center ml-auto mr-4">
                                            {[...Array(review.rating)].map((e,i) => (
                                                <svg key={i} className="w-4 h-4 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                                                </svg>)
                                            )}
                                            {[...Array(5 - review.rating)].map((e,i) => (
                                                <svg key={i} className="w-4 h-4 ms-1 text-gray-300 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                                            </svg>))}
                                            </div>
                                        </div>
                                        <span>
                                            {review.content}
                                        </span>
                                    </div>
                                )}
                        })}
                    </div>
                </div>

                <div className="h-screen max-h-80vh overflow-y-scroll">
                    {note.files?.map((file) => {
                        if (file.type == "pdf") {
                            return (<object 
                                key={file.name}
                                className="w-[50rem] max-w-[70rem] h-[90vh] mb-2" 
                                data={`http://localhost:5555/uploads/${file._id}.${file.type}`}
                            >
                            </object>)
                        } else {
                            return (<img className="mb-2" key={file.name} src={`http://localhost:5555/uploads/${file._id}.${file.type}`}/>)
                        }
                    })}
                    <div className="my-10">
                        <h1 className="text-3xl my-4 w-fit">Other Notes for {note.subject}:</h1>
                        {similarNotes?.map((sN) => {
                            
                            return( sN._id != id && <a className="text-black" key={sN.id} href={`./${sN._id}`}>{sN.title} by {sN.authorName}<br/></a>)
                        })}
                    </div>
                </div>
            </div>
        )}

    </div>
  )
}

export default ShowNote