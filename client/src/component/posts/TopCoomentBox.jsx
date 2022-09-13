import React, { useRef, useState } from "react";
import { useMainContext } from "./messge/context.jsx";

function TopCommentBox(props) {
  const [setMessageReset, setCommentIncrement] = useMainContext();

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
    fetch("/new-comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messageData: message.current.value }),
    }).then(() => {
      setMessageReset((PrevState) => !PrevState);
      setCommentIncrement(10);
      message.current.value = "";
      setEnableBtn(true);
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
                message.current.value = "";
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

export default TopCommentBox;
