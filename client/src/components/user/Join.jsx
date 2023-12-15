import React, { useState } from 'react'
import firebase from '../../firebase.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const Join = () => {
  const [youName, setYouName] = useState("");
  const [youEmail, setYouEmail] = useState("");
  const [youPass, setYouPass] = useState("");
  const [youPassC, setYouPassC] = useState("");
  const [flag, setFlag] = useState(false);

  let navigate = useNavigate();

  const JoinFunction = async (e) => {
    setFlag(true);
    e.preventDefault()
    if( !(youName && youEmail && youPass && youPassC) ) {
      return alert("모든 항목을 채워주세요");
    }
    if( youPass !== youPassC ){
        return alert("비밀번호가 일치하지 않습니다.")
    }

    // 개인정보 -> firebase로 보내기
    let createdUser = await firebase.auth().createUserWithEmailAndPassword(youEmail, youPass)

    await createdUser.user.updateProfile({
        displayName: youName,
    })

    console.log(createdUser.user)

    // 개인정보 -> mongoDb에 저장
    let body = {
      email: createdUser.user.multiFactor.user.email,
      displayName: createdUser.user.multiFactor.user.displayName,
      uid: createdUser.user.multiFactor.user.uid,
    }

    axios.post("/api/user/join", body)
    .then((response) => {
      if(response.data.success){
        alert("회원가입 완료")
        navigate("/login");
      }else {
        alert("회원가입 실패")
      }
    })

  }

  return (
    <div id='login__wrap'>
        <div className='login__bg'>
            <div className='login__bg__text'>join</div>
        </div>
        <form className='login__form'>
            <fieldset>
                <legend className='blind'>회원가입 영역</legend>
                <div className='login__name'>
                    <label htmlFor="youName"  className='blind'>이름</label>
                    <input 
                        className='youName' 
                        value={youName} 
                        onChange={(e) => setYouName(e.currentTarget.value)} 
                        type="text" 
                        name='youName' 
                        placeholder='이름' 
                        autoComplete='off' 
                        required
                    />
                </div>
                <div className='login__email'>
                    <label htmlFor="youEmail"  className='blind'>이메일</label>
                    <input 
                        className='youEmail' 
                        value={youEmail} 
                        onChange={(e) => setYouEmail(e.currentTarget.value)} 
                        type="email" 
                        name='youEmail' 
                        placeholder='이메일' 
                        autoComplete='off' 
                        required
                    />
                </div>
                <div className='login__pass'>
                    <label htmlFor="youPass"  className='blind'>비밀번호</label>
                    <input 
                        className='youPass' 
                        value={youPass} 
                        onChange={(e) => setYouPass(e.currentTarget.value)} 
                        type="text" 
                        name='youPass' 
                        placeholder='비밀번호' 
                        autoComplete='off' 
                        required
                        minLength={8}
                    />
                </div>
                <div className='login__passC'>
                    <label htmlFor="youPassC"  className='blind'>비밀번호확인</label>
                    <input 
                        className='youPassC' 
                        value={youPassC} 
                        onChange={(e) => setYouPassC(e.currentTarget.value)} 
                        type="text" 
                        name='youPassC' 
                        placeholder='비밀번호 확인' 
                        autoComplete='off' 
                        required
                    />
                </div>
                <button disabled={flag} className='login__btn' type='submit' onClick={(e) => JoinFunction(e)}>회원가입</button>
            </fieldset>
        </form>
    </div>
  )
}

export default Join