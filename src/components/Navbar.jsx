import React, { useContext } from 'react'
import {signOut} from "firebase/auth"
import {auth} from "../firebase"
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  const {dispatch} = useContext(ChatContext)

  function handleLogout() {
      dispatch({type:"USER_LOGOUT"})
      signOut(auth)
    }
  return (
    <div className='navbar'>
      <span className="logo">Microsoft Teams</span>
      <div className="user">
        <img src={currentUser.photoURL} alt="" />
        <span>{currentUser?.displayName}</span>
        <button onClick={()=>{ handleLogout()}}>Logout</button>
      </div>
    </div>
  )
}

export default Navbar