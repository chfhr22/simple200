import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PostDetail = () => {
    let params = useParams();
    let navigate = useNavigate();
  
    const [postInfo, setPostInfo] = useState({});
    const [flag, setFlag] = useState(false)

    const user = useSelector(state => state.user)
  
      useEffect(() => {
          let body = {
              postNum: params.postNum
          }
  
          axios.post("/api/post/detail", body)
              .then((response) => {
                  console.log(response)
                  setPostInfo(response.data.post);
                  setFlag(true)
              })
              .catch((err) => {
                  console.log(err)
              })
      }, [params.postNum]);
  
      const DeleteHandler = () => {
          if (window.confirm("정말로 삭제하시겠습니까?")) {
              let body = {
                  postNum: params.postNum,
              };
              axios
                  .post("/api/post/delete", body)
                  .then((response) => {
                      if (response.data.success) {
                          alert("게시글이 삭제되었습니다.");
                          navigate("/list"); // 페이지 이동을 위해 navigate 함수를 사용합니다.
                      }
                  })
                  .catch((err) => {
                      console.log(err);
                      alert("게시글 삭제가 실패했습니다.");
                  });
          }
      };
    return (
      <>
        <div className='login__bg'>
              <div className='login__bg__text'>detail</div>
        </div>
        <div className='detail__wrap'>
          {flag ? (
            <>
              <div className='detail__title'>
                <h3>{postInfo.title}</h3>
                <span className='detail__author'>{postInfo.author.displayName}</span>
              </div>
              <div className='detail__content'>
                {postInfo.image ? <img src={postInfo.image} alt={postInfo.title} /> : null}
                {postInfo.content}
              </div>
              
              {user.uid === postInfo.author.uid && (
                <div className='detail__btn'>
                  <Link to={`/modify/${postInfo.postNum}`}>수정하기</Link>
                  <Link to="/list">목록보기</Link>
                  <button onClick={() => DeleteHandler()}>삭제하기</button>
                </div>
              )}
            </>
          ) : (
            <div>로딩중</div>
          )}
        </div>
      </>
    )
}

export default PostDetail