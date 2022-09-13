import React, { useContext, useState } from "react";

const MainContext = React.createContext();

export function useMainContext() {
  return useContext(MainContext);
}

export function ContextProvider(props) {
  const [messageUpdate, setMessageUpdate] = useState();
  const [MessageReset, SetMessageReset] = useState(false);
  const [commentIncrement, setCommentIncrement] = useState(10);
  const value = {
    MessageReset,
    SetMessageReset,
    messageUpdate,
    setMessageUpdate,
    commentIncrement,
    setCommentIncrement,
  };

  return (
    <MainContext.Provider value={value}>{props.children}</MainContext.Provider>
  );
}
