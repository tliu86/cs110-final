import React from 'react'
import { Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import CreateNotes from './pages/CreateNotes';
import ShowNote from './pages/ShowNote';
import EditNote from './pages/EditNote';
import DeleteNote from './pages/DeleteNote';
import SignUp from './pages/SignUp';
import Login from './pages/Login';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<SignUp />} />
      <Route path='/login' element={<Login />} />
      <Route path='/home' element={<Home />} />
      <Route path='/notes/create' element={<CreateNotes />} />
      <Route path='/notes/details/:id' element={<ShowNote />} />
      <Route path='/notes/edit/:id' element={<EditNote />} />
      <Route path='/notes/delete/:id' element={<DeleteNote/>} />
    </Routes>
  )
}

export default App