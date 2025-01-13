import './App.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Messages from './pages/Messages.jsx'
import Users from './pages/Users.jsx'
import About from './pages/About.jsx'
import Login from './pages/Login.jsx'
import Notfound from './pages/Notfound.jsx'

import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebaseConfig.js";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useState } from 'react'
import Layout from './Layout.jsx'
import { useEffect } from 'react'

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export default function App() {

  const [user, setUser] = useState("Bela");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => setUser(currentUser));
    return () => unsubscribe;
  },[]);

  async function logout() {
    await signOut(auth);  
  }

  const router = createBrowserRouter([
    { path: "/", element: <Layout user={user} logout={logout} auth={auth}/>, children:[
      { path: "/login", element: <Login auth={auth} setUser={setUser} /> },
      { path: "*", element: <Notfound /> }
    ]}
  ]);
  
   return (
    <div className='app'> 
      <RouterProvider router={router} />
    </div>
   )
}
