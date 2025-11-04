import React, { createContext, useContext, useEffect, useState } from "react";

const createApp = createContext();

export const AppProvider = ({ children }) => {
  const [currentUser, setCurrentuser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(currentUser ? true : false);
  const [loadingData, setLoadingData] = useState(false);
  useEffect(() => {
    setLoadingData(true);
    setCurrentuser(JSON.parse(sessionStorage.getItem("user")));
    setLoggedIn(JSON.parse(sessionStorage.getItem("user")) ? true : false);
    setLoadingData(false);
  }, []);


  const logout = () =>{
    setLoadingData(true)
    sessionStorage.removeItem("user");
    setCurrentuser(null)
    setLoadingData(false)
  }
  return (
    <createApp.Provider
      value={{
        logout,
        currentUser,
        setCurrentuser,
        loggedIn,
        setLoggedIn,
        loadingData,
        setLoadingData,
      }}
    >
      {children}
    </createApp.Provider>
  );
};

export const UseContextApp = () => useContext(createApp);
