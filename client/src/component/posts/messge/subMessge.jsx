import React, { useRef, useState, useContext } from "react";
import SubCommentBox from "./SubCommentBox";
import { useMainContext } from "./context";

const showReply = React.createContext();

export function useOpenReply() {
  return useContext(showReply);
}

function SubMessage(props) {
  const { setMessageUpdate } = useMainContext();
  const likeIcon = useRef();
  const numLikes = useRef();

  const [openReply, setOpenReply] = useState(false);

  const changeOpenReply = () => {
    setOpenReply((prevState) => (prevState = !prevState));
  };

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
    fetch("/update-sub-like", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messageId: props.parentKey,
        subId: props.subId,
        likes: likes,
      }),
    });
  };
  const deleteMessage = () => {
    fetch("/delete-sub-comment", {
      method: "POST",
      headers: { "content-type": "application/json " },
      body: JSON.stringify({ messageId: props.parentKey, subId: props.subId }),
    }).then(() => {
      setMessageUpdate([1, props.parentKey]);
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
          {!props.user !== "super user" ? (
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
          {openReply && (
            <SubCommentBox parentKey={props.parentKey} autoFocus={true} />
          )}
        </showReply.Provider>
      </section>
    </>
  );
}

export default SubMessage;
