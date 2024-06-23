
import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { AuthContext } from "./AuthContext";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {


  const { currentUser} = useContext(AuthContext)
  const INTIIAL_STATE= {
    chatId:"null",
    user:{}
  }

  const chatReducer =(state,action)=>{
    switch (action.type)
    {
      case "CHANGE_USER":
        console.log('change user')
        return {
          user:action.payload,
          chatId:currentUser.uid >action.payload.uid
           ? currentUser.uid+action.payload.uid 
           : action.payload.uid+ currentUser.uid

        }

        case "USER_LOGOUT":
          console.log("user logout called")
          return{
            user:{},
            chatId:null,
          }
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(chatReducer, INTIIAL_STATE)
  

  return (
    <ChatContext.Provider value={{ data:state,dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};