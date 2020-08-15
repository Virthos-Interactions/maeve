import React, { createContext, useState } from 'react';

export const AuthContext = createContext({});

export default function Context({ children }) {
   const [user, setUser] = useState({ name: 'raphael' });

   function logout() {
      setUser(null);
   }

   function login() {
      setUser({ name: 'raphael' });
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
