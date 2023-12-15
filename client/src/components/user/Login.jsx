import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import firebase from '../../firebase.js';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const LoginFunc = async (e) => {
    e.preventDefault();
    if(!(email && password)){
        return alert("이메일 또는 비밀번호를 채워주세요")
    }
    try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
        alert("로그인 성공")
        navigate("/")
    }
    catch(err){
        console.log(err)
        setErrorMsg("이메일과 비밀번호를 다시 입력해주세요")
    }
  }

  useEffect(() => {
    setTimeout(() => {
        setErrorMsg("")
    },3000)
  }, [errorMsg])
  
  return (
    <div id='login__wrap'>
        <div className='login__bg'>
            <div className='login__bg__text'>Login</div>
        </div>
        <form action="" className='login__form'>
            <fieldset>
                <legend className='blind'>로그인 영역</legend>
                <div className='login__id'>
                    <label htmlFor="youEmail" className='blind'>이메일</label>
                    <input 
                        className='youEmail' 
                        type="email" 
                        name='youEmail' 
                        placeholder='아이디' 
                        autoComplete='off' 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.currentTarget.value)}
                    />
                </div>
                <div className='login__pass'>
                    <label htmlFor="youPass" className='blind'>비밀번호</label>
                    <input 
                        className='youPass' 
                        type="password" 
                        name='youPass' 
                        placeholder='비밀번호' 
                        autoComplete='off' 
                        required
                        value={password}
                        onChange={(e) => setPassword(e.currentTarget.value)}
                    />
                </div>
                <div>
                    {errorMsg !== "" && <p>{errorMsg}</p>}
                </div>
                <button 
                className='login__btn' 
                type='submit'
                onClick={(e) => LoginFunc(e)}
                >로그인</button>
            </fieldset>
        </form>
    </div>
  )
}

export default Login