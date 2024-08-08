import React, { useRef, useState } from 'react'

const App = () => {

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(JSON.parse(localStorage.getItem('comments')) || []);
  const [reply, setreply] = useState("")
  const [addReplyCommentIndex,setaddReplyCommentIndex] = useState(null);

  const submitHandler = (e) => {
    e.preventDefault();
    setComments([...comments, {comment : comment, replies : []}])
    localStorage.setItem('comments',JSON.stringify([...comments, {comment : comment, replies : []}]))
    setComment("");
  }
  
  const viewInput = (index) => {
    setaddReplyCommentIndex(index);
  }

  const replyHandler = (index) => {
    let copyComments = [...comments];
    copyComments[index].replies = [...copyComments[index].replies, reply];
    setComments(copyComments);
    localStorage.setItem('comments', JSON.stringify(copyComments));
    setreply("")
  }
  

  return (
    <div>
      <form onSubmit={submitHandler}>
        <input value={comment} onChange={(e) => setComment(e.target.value)} type="text" name="" id="" />
        <input type="submit" value="Add Comment" />
      </form>

      <div style={{marginTop : '5vw', display : 'flex', flexDirection : 'column' , gap : '2vw'}}>
        {comments.map((com,index) => {

          return (
          <div key={index}>
             <div style={{display : 'flex' , gap : '10px'}}>
                {com.comment}
                <button onClick={() => viewInput(index)}>Reply?</button>
              </div> 
              <div style={{marginLeft : '2%'}}> 
                {com.replies.length > 0 && com.replies.map((reply,index) => {
                  return (<div key={index}>{reply}</div>);
                })}
              </div>

            <form onSubmit={() => replyHandler(index)} style={(addReplyCommentIndex >= 0 && addReplyCommentIndex === index) ? {display : 'initial'} : {display:'none'}}> 
              <input value={reply} onChange={(e) => setreply(e.target.value)} type="text"/>
              <button onClick={() => setaddReplyCommentIndex(null)}>Exit?</button>
              <button>Add Comment</button>
            </form>

          </div>
          )

        })}
      </div>
    </div>
  )
}

export default App