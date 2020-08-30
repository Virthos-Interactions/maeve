import React, { createContext, useState, useEffect } from 'react';
import { authentication } from '../services/api';

export const AuthContext = createContext({});

export default function Context({ children }) {
   const [user, setUser] = useState(null);

   useEffect(() => {
      const data = localStorage.getItem('user'); 
      
      if(data) {
         setUser(JSON.parse(data));
      } else {
         setUser(null);
      }
   }, []);

   function logout() {
      setUser(null);
      localStorage.clear();
   }

   function login(email, password) {
      return new Promise(async (resolve, reject) => {
         const response = await authentication.post('/authentication',{
            partnerId: '',
            email,
            password
         }, {
            headers: {
               Abernathy: process.env.REACT_APP_LOGIN_TOKEN 
            }
         });

         if(response.data.errors) {
            reject(response.data.errors);
         } else {
            saveInLocalStorage(response.data);
            setUser(response.data);
            resolve();
         }
      });

   }

   function saveInLocalStorage(data) {
      localStorage.setItem('user', JSON.stringify(data));
   }

   return(
      <AuthContext.Provider value={{
         user,
         signed: user ? true : false,
         logout,
         login,
      }}>
         { children }
      </AuthContext.Provider>
   );
}
