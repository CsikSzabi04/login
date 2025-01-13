import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import React from 'react'
import { useState, useEffect } from 'react';

export default function Messages({user, db}) {

  const[messages, setMessages] = useState([]);

  useEffect(() => {
    //where("kinek", "==", user.email), 
    if(user){
      const unsub = onSnapshot(query(collection(db, "messages"), orderBy("mikor")), (snap) => {setMessages(snap.docs.map(doc => ({...doc.data(), id:doc.id})));
    });
    return unsub;
  }
  },[user]);

  return (
    <div className='messages'>
        </div>
  )
}
