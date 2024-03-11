import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  doc,
  collection,
  getDoc,
  query,
  where,
  setDoc,
  getDocs,
  serverTimestamp,
  updateDoc,
  collectionGroup
} from "firebase/firestore";
import Closed from "../img/clear-svgrepo-com.svg";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
// import {debounce} from 'lodash';



const Search = () => {
  const { currentUser } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [err, setErr] = useState("");

  const debounce =(fnc,delay=300)=>
  {
    let timerContext
    console.log('debounce ')
    return function()
    {
      const self = this 
      const arg = arguments
      clearTimeout(timerContext);
      timerContext=setTimeout(() => { fnc.apply(self, arg) }, delay);
    }
  }
  console.log('userData'+JSON.stringify(searchedUsers))

  const handleSearch = async (searchuser) => {
    console.log('inside handleSearch')
    console.log('searchQuery'+ searchuser)
    const q = query(
      collection(db, "users"),
      where("displayName", ">=", searchuser.toLowerCase()),
      where("displayName", "<=", searchuser.toLowerCase() + "\uf8ff")
    )

     // querySnapshot is real time listener that we have put on users 
      // if from backend a new user is inserted which matches searchString 
      // this will automatically get triggered and fetch the latest result 
    try {
      const querySnapshot = await getDocs(q);
      let data = []
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.data())
        data.push(doc.data());
      })
      // console.log('after search'+JSON.stringify(data))
      // console.log('search string'+ searchuser)
      setSearchedUsers(data)
      // console.log('data' + data)
    } catch (e) {
      console.log(e);
    }
  };



  const handleUserSelect = async (userData) => {
    // check whether group(chats in firebase) exists, if not create 
     const combinedUsersId =currentUser.uid >userData.uid ? currentUser.uid+userData.uid : userData.uid+ currentUser.uid;
    console.log('data after clicking ' +userData.uid)
     try{
      const res = await getDoc(doc(db, "chats",combinedUsersId))

      if(!res.exists())
      {
        const userChatRef = doc(db,"chats",combinedUsersId)
        // await setDoc(doc,(db,"chats",combinedUsersId), {message:[]})
        await setDoc(userChatRef,{message:[]})
        console.log('after creating new chat doc')

         updateDoc(doc(db,"userChats",currentUser.uid),
        {
          [combinedUsersId+'.userInfo']:{
            uid:userData.uid,
            displayName:userData.displayName,
            photoURL:userData.photoURL,
          },
          [combinedUsersId+'.date']:serverTimestamp()
        }).then((res)=> console.log('after updating'+res)).catch((err)=>console.log(err))

        await updateDoc(doc(db,"userChats",userData.uid),
        {
          [combinedUsersId+'.userInfo']:{
            uid:currentUser.uid,
            displayName:currentUser.displayName,
            photoURL:currentUser.photoURL
          },
          [combinedUsersId+'.date']:serverTimestamp()
        })
        
      }
     }catch(e){console.log(e) }

     setSearchedUsers([])
     console.log('reached here to empty Username - HandleSelect')
     setUsername('')
    
  }
  useEffect(()=>{
    // console.log('inside useEffect')
  if (username.trim().length > 0) {
    // If the search string is non-empty, debounce the search function
    debouncedSearch(username);
    // handleSearch(username)
  }
},[username])

  const debouncedSearch= useCallback(debounce(handleSearch,500),[])

  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Search user..."
          onChange={(e) => { setUsername(e.target.value); } }
          value={username}
        />
        {username && (
          <div
            style={{ justifyContent: "flex-start" }}
            onClick={() => {
              console.log('reached here to empty Username - Clear Icon')

              setUsername("");
              setSearchedUsers([])
            }}
          >
            <img src={Closed} alt="" />
          </div>
        )}
      </div>
      {err && <span style={{ padding: "0 10px" }}> Something went wrong</span>}
      {searchedUsers.length > 0 ?
        searchedUsers.map((elem) => {
          const name = elem.displayName
          const displayName = name.charAt(0).toUpperCase() + name.slice(1, elem.displayName.length)
          return (
            <div key={elem.uid} className="userChat" onClick={() => { handleUserSelect(elem) }}>
              <img src={elem?.photoURL} alt="" />
              <div className="userChatInfo">
                <span> {displayName} </span>
              </div>
            </div>
          )
        }

        )
        : null

      }
    </div>
  );
};

export default Search;
