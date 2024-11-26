import React, { createContext, useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import store from "store2";

const AuthContext = createContext();

const AuthProvider = () => {
  const existingSignUpList = store.get('signUpList');
  console.log(existingSignUpList)
  // Default dev login
  const [currentUser, setCurrentUser] = useState(existingSignUpList.devUser);
  const [currentUserId, setCurrentUserId] = useState('devUser');

  useEffect(() => {
    console.log(currentUser, '- Has changed')
    let updatedUser = currentUser;
    
    let updatedSignUpList = existingSignUpList;
    updatedSignUpList[currentUserId] = updatedUser;
    store.set('signUpList', updatedSignUpList);
  }, [currentUser] ) 

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, currentUserId, setCurrentUserId }}>
      <Outlet />
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };