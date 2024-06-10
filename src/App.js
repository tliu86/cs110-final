import LoginPage from "./components/LoginPage.js"
// import Register from "./components/Register.js"
//import React, {useEffect, useState} from 'react'

function App() {
  // const [backenedData, setBackendData] = useState([{}])

  // useEffect(() => {
  //   //fetches a route, which is /api, after getting a response (a json) then we set the backened to whatever data we have obtained 
  //   fetch("/api").then(
  //     response => response.json()
  //   ).then(
  //     data => {
  //       setBackendData(data)
  //     }
  //   )
  // }, [])
  // //[] ensures it only works upon render
  
  return (
    <div className="App">
      {/* <h1> React here </h1> */}
      {/* <Register/> */}
      <LoginPage/>

      {/* {(typeof backenedData.users === "undefined") ? (
        <p> Loading. . . </p>
      ): (
        backenedData.users.map((user, i) => (
          <p key={i}> {user} </p>
        ))
      )} */}
    </div>
  );
}

export default App;
