import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginUser, clearUser } from './reducer/userSlice'
import firebase from './firebase.js';

import Header from './components/layout/Header'
import Main from './components/layout/Main'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import PostWrite from './components/post/PostWrite'
import PostList from './components/post/PostList'
import PostDetail from './components/post/PostDetail'
import PostModify from './components/post/PostModify'
import Login from './components/user/Login'
import Join from './components/user/Join'

const App = () => {
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.user)

  useEffect(() => {
    firebase.auth().onAuthStateChanged((userInfo) => {
      console.log("userInfo : ", userInfo);
      if(userInfo !== null){
        dispatch(loginUser(userInfo.multiFactor.user));
      } else {
        dispatch(clearUser())
      }
    })
  },[dispatch]);

  // useEffect(() => {
  //   console.log("user : ", user)
  // }, [user])

  // useEffect(() => {
  //   // firebase.auth().signOut();
  // },[]);

  return (
    <>
      <Header />
      <Main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/write' element={<PostWrite />} />
          <Route path='/list' element={<PostList />} />
          <Route path='/detail/:postNum' element={<PostDetail />} />
          <Route path='/modify/:postNum' element={<PostModify />} />
          <Route path='/login' element={<Login />}/>
          <Route path='/join' element={<Join />}/>
        </Routes>
      </Main>
      <Footer />
    </>
  )
}

export default App