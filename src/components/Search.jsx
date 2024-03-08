import React, { useContext, useState } from "react";
import {
  doc,
  collection,
  getDoc,
  query,
  where,
  setDoc,
  getDocs,
} from "firebase/firestore";
import Closed from "../img/clear-svgrepo-com.svg";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";

const Search = () => {
  const { currentUser1 } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [err, setErr] = useState("");
  const handleSearch = async () => {

    const q = query(
      collection(db, "users"),
      where("displayName", ">=", username.toLowerCase()),
      where("displayName", "<=", username.toLowerCase() + "\uf8ff")
    );

    try {

      const querySnapshot = await getDocs(q);
      let data = []
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.data())
        data.push(doc.data());
      })
      setSearchedUsers([...data])
      console.log('data' + data)
    } catch (e) {
      console.log(e);
    }
  };
  const handleKey = (e) => {
    if (e.key === 'Backspace' && username.length === 1 && searchedUsers.length > 0) {
      console.log('Empty search');
      setSearchedUsers([]);
    }
    if (e.code == "Enter") {
      console.log("inside handleKey");
      handleSearch();
    }
  };
  const handleUserSelect = async (id) => {
    // check whether group(chats in firebase) exists, if not create 
    // const combinedUsersId = 
    const res = await getDocs(db, "chats")
  }
  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Search user..."
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKey}
          value={username}
        />
        {username && (
          <div
            style={{ justifyContent: "flex-start" }}
            onClick={() => {
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
            <div key={elem.uid} className="userChat" onClick={() => { handleUserSelect(elem.uid) }}>
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
