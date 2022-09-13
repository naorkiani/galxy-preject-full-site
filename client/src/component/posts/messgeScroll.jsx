import React, { useEffect, useRef, useState } from "react";
import Message from "./messge/message";
import { useMainContext } from "./messge/context";

function MessageScroll(props) {
  const [MessageReset, commentIncrement, setCommentIncrement, messageUpdate] =
    useMainContext();

  const commentIncrementRef = useRef(commentIncrement);

  const [message, setMessages] = useState([]);
  const [showBottomBar, setShowBottomBar] = useState(true);

  useEffect(() => {
    setShowBottomBar(true);
    fetch("/get-data", {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify({ limitNum: 10 }),
    })
      .then((res) => res.json())
      .then((comments) => {
        setMessages(comments);
      });
  }, [MessageReset]);

  useEffect(() => {
    if (messageUpdate) {
      if (messageUpdate[0] === 1) {
        fetch("/update-comment", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ commentId: messageUpdate[1] }),
        })
          .then((res) => res.json())
          .then((commentData) => {
            updateComment(commentData);
          });
      } else if (messageUpdate[0] === 2) {
        deleteComment();
      }
    }
  }, [messageUpdate]);

  function updateComment(commentData) {
    let currentMessage = [...message];
    if (commentData) {
      let currentMessageIndex = currentMessage.findIndex(
        (message) => message._id === commentData._id
      );
      currentMessage.splice(currentMessageIndex, 1, commentData);
      setMessages(currentMessage);
    }
  }
  function deleteComment() {
    let currentMessage = [...message];
    let currentMessageIndex = currentMessage.findIndex(
      (message) => message._id === messageUpdate[1]
    );
    currentMessage.splice(currentMessageIndex, 1);
    setMessages(currentMessage);
  }

  const observer = React.useRef(
    new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting) {
        fetch("/get-more-data", {
          method: "POST",
          headers: { "content-Type": "application/json" },
          body: JSON.stringify({
            commentIncrement: commentIncrementRef.current,
          }),
        })
          .then((res) => res.json())
          .then((comments) => {
            if (comments.length > 0) {
              setTimeout(() => {
                setMessages((prevState) => [...prevState, ...comments]);
              }, 3000);
            } else {
              setTimeout(() => {
                setShowBottomBar(false);
              }, 3000);
            }
            setCommentIncrement((prevState) => (prevState += comments.length));
          });
      }
    }),
    { threshold: 1 }
  );

  useEffect(() => {
    commentIncrementRef.current = commentIncrement;
  }, [commentIncrement]);

  const [bottomBar, setBottomBar] = useState(null);

  useEffect(() => {
    const currentBottomBar = bottomBar;
    const currentObserver = observer.current;
    if (currentBottomBar) {
      currentObserver.observe(currentBottomBar);
    }
    return () => {
      if (currentBottomBar) {
        currentObserver.unobserve(currentBottomBar);
      }
    };
  }, [bottomBar]);

  return (
    <>
      {message.map((message) => (
        <Message
          key={message._id}
          useKey={message._id}
          user={message.user}
          editable={message.editable}
          message={message.message}
          like={message.likes}
          replies={message.replies}
        />
      ))}
      {message.length > 9 && showBottomBar ? (
        <div className="buttonBar" ref={setBottomBar}>
          <div className="loader"></div>
        </div>
      ) : null}
    </>
  );
}

export default MessageScroll;
