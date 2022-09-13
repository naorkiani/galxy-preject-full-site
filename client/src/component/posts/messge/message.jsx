import React, { useRef, useState, useContext } from "react";
import "./message.css";
import CommentBox from "./commentsBox";
import react from "react";
import SubMessage from "./subMessge";
import { useMainContext } from "../messge/context.jsx";

const showReply = react.createContext();

export function useOpenReply() {
  return useContext(showReply);
}

function Message(props) {
  const { setMessageUpdate } = useMainContext();
  const likeIcon = useRef();
  const numLikes = useRef();
  const [arrowUp, setArrowUp] = useState(false);
  const [openReply, setOpenReply] = useState(false);

  const changeOpenReply = () => {
    setOpenReply((prevState) => (prevState = !prevState));
  };

  let arrow = <i className="fas fa-caret-down"></i>;
  const changeArrow = () => {
    setArrowUp((prevState) => (prevState = !prevState));
  };
  if (arrowUp) {
    arrow = <i className="fas fa-caret-up"></i>;
  } else {
    arrow = <i className="fas fa-caret-down"></i>;
  }
  let toggleLike = false;
  let likes = props.like;
  const likeComment = () => {
    toggleLike = !toggleLike;
    if (toggleLike) {
      likes++;
      likeIcon.current.style.color = "#4688de";
    } else {
      likes--;
      likeIcon.current.style.color = "#fffff";
    }
    numLikes.current.innerHtml = likes;
    fetch("/update-like", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messageId: props.useKey, likes: likes }),
    });
  };
  const deleteMessage = () => {
    fetch("/delete-message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ MessageId: props.useKey }),
    }).then(() => {
      setMessageUpdate([2, props.useKey]);
    });
  };

  return (
    <>
      <section className="messageContainer ">
        <div className="messageUser">{props.user}</div>
        <i className="fas fa-user-circle"></i>
        <div className="messageText">{props.Message}</div>
        <section className="messageIconContainer">
          <i
            className="fas fa-thumbs-up"
            ref={likeIcon}
            onClick={likeComment}
            style={{ color: "white" }}
          ></i>
          <div ref={numLikes}>{props.likes}</div>
          <i className="fas fa-thumbs-down" style={{ color: "white" }}></i>
          {!props.editable ? (
            <div onClick={changeOpenReply} style={{ cursor: "pointer" }}>
              REPLY
            </div>
          ) : (
            <div onClick={deleteMessage} style={{ cursor: "pointer" }}>
              DELETE
            </div>
          )}
        </section>
        <showReply.Provider value={changeOpenReply}>
          {openReply && <CommentBox useKey={props.useKey} autoFocus={true} />}
        </showReply.Provider>
        {props.replies.length > 0 && (
          <section className="arrowReplies" onClick={changeArrow}>
            {arrow}
            <div>View {props.replies.length} replies</div>
          </section>
        )}
        {arrowUp && (
          <section className="subMessages">
            {props.replies.map((reply) => {
              <SubMessage
                key={Math.random()}
                parentKey={props.useKey}
                subId={reply._id}
                user={reply.user}
                Message={reply.Message}
                likes={reply.likes}
              />;
            })}
          </section>
        )}
      </section>
    </>
  );
}

export default Message;
