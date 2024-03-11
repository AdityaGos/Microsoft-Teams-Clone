import React, { useContext } from 'react'
import {signOut} from "firebase/auth"
import {auth} from "../firebase"
import { AuthContext } from '../context/AuthContext';
const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  function capitalizeFirstLetter(string) {
    return string?.charAt(0).toUpperCase() + string?.slice(1);
}
  return (
    <div className='navbar'>
      <span className="logo">Microsoft Teams</span>
      <div className="user">
        <img src={currentUser.photoURL} alt="" />
        <span>{capitalizeFirstLetter(currentUser?.displayName)}</span>
        <button onClick={()=>{ signOut(auth)}}>Logout</button>
      </div>
    </div>
  )
}

export default Navbar