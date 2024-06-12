// import React from 'react'
// import { Routes, Route} from 'react-router-dom'
// import Home from './pages/Home';
// import CreateNotes from './pages/CreateNotes';
// import ShowNote from './pages/ShowNote';
// import EditNote from './pages/EditNote';
// import DeleteNote from './pages/DeleteNote';
// import SignUp from './pages/SignUp';
// import Login from './pages/Login';
// import ProtectedRoute from './protectedRoute/ProtectedRoute'

// const App = () => {
//   return (
//     <Routes>
//       <Route path='/' element={<SignUp />} />
//       <Route path='/login' element={<Login />} />
//       <Route path='/home' element={<ProtectedRoute> <Home />  </ProtectedRoute>} />
//       <Route path='/notes/create' element={<ProtectedRoute><CreateNotes /></ProtectedRoute>} />
//       <Route path='/notes/details/:id' element={<ProtectedRoute><ShowNote /></ProtectedRoute>} />
//       <Route path='/notes/edit/:id' element={<ProtectedRoute><EditNote /></ProtectedRoute>} />
//       <Route path='/notes/delete/:id' element={<ProtectedRoute><DeleteNote/> </ProtectedRoute>} />
//     </Routes>
//   )
// }

// export default App

import React from 'react'
import { Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import CreateNotes from './pages/CreateNotes';
import ShowNote from './pages/ShowNote';
import EditNote from './pages/EditNote';
import DeleteNote from './pages/DeleteNote';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import EditProfile from './pages/EditProfile';
import ProtectedRoute from './protectedRoute/ProtectedRoute'
import UserProfile from './pages/UserProfile'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<SignUp />} />
      <Route path='/login' element={<Login />} />
      <Route path='/home' element={<ProtectedRoute> <Home/>  </ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute> <UserProfile/> </ProtectedRoute>}/>
      <Route path="/newInfo" element={<ProtectedRoute> <EditProfile/> </ProtectedRoute>}/>
      <Route path='/notes/create' element={<ProtectedRoute><CreateNotes /></ProtectedRoute>} />
      <Route path='/notes/details/:id' element={<ProtectedRoute><ShowNote /></ProtectedRoute>} />
      <Route path='/notes/edit/:id' element={<ProtectedRoute><EditNote /></ProtectedRoute>} />
      <Route path='/notes/delete/:id' element={<ProtectedRoute><DeleteNote/> </ProtectedRoute>} />
    </Routes>
  )
}

export default App