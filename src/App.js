import React, { useEffect, useState } from 'react';
import MainRouter from './MainRouter';
import { ToastContainer } from 'react-toastify';
import jwtDecode from "jwt-decode";

import "react-toastify/dist/ReactToastify.css"

function App () {
  const [user, setUser] = useState(null);

  useEffect(() => {
    let getJwtToken = localStorage.getItem('jwtToken');
      console.log(getJwtToken);
    if (getJwtToken) {
          const currentTime = Date.now()/1000;
          let decodedJwtToken = jwtDecode(getJwtToken);
          console.log(decodedJwtToken);
          if (decodedJwtToken.exp < currentTime) {
            handleUserLogout();
          } else {
            handleUserLogin(decodedJwtToken)
          }
        }
  }, [])

  // componentDidMount() {
  //   let getJwtToken = localStorage.getItem('jwtToken');
  //   console.log(getJwtToken);
  //   if (getJwtToken) {
  //     const currentTime = Date.now()/1000;
  //     let decodedJwtToken = jwtDecode(getJwtToken);
  //     console.log(decodedJwtToken);
  //     if (decodedJwtToken.exp < currentTime) {
  //       this.handleUserLogout();
  //     } else {
  //       this.handleUserLogin(decodedJwtToken)
  //     }
  //   }
  // }
  
  function handleUserLogin (user) {
    setUser({email: user.email})
  }

  function handleUserLogout () {
    localStorage.removeItem('jwtToken');
    setUser(null);
  }

  
    return (
      <>
        <ToastContainer />
        <MainRouter user={user} handleUserLogin={handleUserLogin} handleUserLogout={handleUserLogout} />
      </>
    )
}

export default App;