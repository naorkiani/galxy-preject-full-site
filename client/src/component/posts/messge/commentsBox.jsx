import React, { useRef, useState } from "react";
import { useOpenReply } from "./message";
import { useMainContext } from "./context";

function CommentBox(props) {
  const { setMessageUpdate } = useMainContext();
  const changeOpenReply = useOpenReply();
  const message = useRef(null);
  const [showCommentLine, setCommentLine] = useState(false);
  const [showButtons, setShowButton] = useState(false);
  const [enableBtn, setEnableBtn] = useState(true);

  const commentFocus = () => {
    setCommentLine(true);
    setShowButton(true);
  };

  const commentFocusOut = () => {
    setCommentLine(false);
  };

  const commentStroke = (event) => {
    let currMessage = event.target.value;
    if (currMessage) {
      setEnableBtn(false);
    } else {
      setEnableBtn(true);
    }
  };
  const sendComment = (event) => {
    event.preventDefault();
    fetch("/new-sub-comment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messageId: props.useKey,
        messageData: message.current.value,
      }),
    }).then(() => {
      setMessageUpdate([1, props.useKey]);
      message.current.value = "";
      setEnableBtn(false);
    });
  };
  return (
    <>
      <form>
        <section className="commentBox">
          <input
            autoFocus={props.autoFocus}
            className="btn"
            placeholder="add a public comment..."
            type="text"
            ref={message}
            onFocus={commentFocus}
            onBlur={commentFocusOut}
            onKeyUp={commentStroke}
          />
          <div className="commentLine"></div>
        </section>
        {showButtons && (
          <>
            <button
              className="commentButton sendButton"
              onClick={sendComment}
              disabled={enableBtn}
            >
              COMMENT
            </button>
            <button
              className="commentButton"
              style={{ color: "gray", backgroundColor: "transparent" }}
              onClick={() => {
                setShowButton(false);
                changeOpenReply();
              }}
            >
              CANCEL
            </button>
          </>
        )}
      </form>
    </>
  );
}

export default CommentBox;
