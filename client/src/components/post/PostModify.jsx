import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";

import axios from 'axios';

const PostModify = () => {
  let params = useParams();
  let navigate = useNavigate();

  const [postInfo, setPostInfo] = useState({});
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // 글 정보 가져오기
  useEffect(() => {
    let body = {
        postNum: params.postNum
    }

    axios.post("/api/post/detail", body)
    .then((response) => {
        if(response.data.success){
            setPostInfo(response.data.post)
        }
    })
    .catch((err) => {
        console.log(err)
    })
  }, [params.postNum])

  useEffect(() => {
      setTitle(postInfo.title)
      setContent(postInfo.content)
  }, [postInfo])

  const onSubmit = (e) => {
    e.preventDefault();

    if (title === "" || content === "") {
        return alert("제목 또는 내용을 적어주세요!");
    }

    let body = {
        title: title,
        content: content,
        postNum: params.postNum
    }

    axios
        .post("/api/post/modify", body)
        .then((resopnse) => {
            if (resopnse.data.success) {
                alert("글 수정이 완료되었습니다.");
                navigate(`/list`);
            } else {
                alert("글 수정을 실패하였습니다.")
            }
        })
    }

    return (
    <div id='login__wrap'>
        <div className='login__bg'>
            <div className='login__bg__text'>Modify</div>
        </div>
        <form action="" className='login__form'>
            <fieldset>
                <legend className='blind'>글 수정</legend>
                <div className='login__id'>
                    <label htmlFor="youId" className='blind'>제목</label>
                    <input
                    type='text'
                    id="title"
                    value={title || ""}
                    placeholder='제목'
                    onChange={(e) => {
                        setTitle(e.currentTarget.value);
                    }}
                ></input>
                </div>
                <div className='login__pass'>
                    <label htmlFor="youPass" className='blind'>내용</label>
                    <textarea
                        className="youPass"
                        value={content || ""}
                        placeholder='내용'
                        onChange={(e) => {
                            setContent(e.currentTarget.value);
                        }}
                    >
                    </textarea>
                </div>
                <button 
                  className='login__btn'
                  type='submit' 
                  onClick={(e) => {
                  onSubmit(e);
                }}>
                  수정하기
                </button>
                <button>취소하기</button>
            </fieldset>
        </form>
    </div>
  )
}

export default PostModify