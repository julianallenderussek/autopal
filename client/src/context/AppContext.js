import { createContext, useState } from 'react';

export const AppContext = createContext();

const AppContextProvider = ({children}) => {
  const [first, setFirst] = useState("Checking context");
  const [token, setToken] = useState(() => {
    const token = localStorage.getItem('user');
    if (!token) {
      return null
    } else {
      const parsedToken = JSON.parse(user)
      return token
    }
  });
  
  
  const [user, setUser ] = useState(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      return null
    } else {
      const parsedUser = JSON.parse(user)
      return user
    }
  });

  return (
    <AppContext.Provider value={{
      first,
      user,
      setUser,
      token,
      setToken
    }}>
      {children}
    </AppContext.Provider>
  )
  
}

export default AppContextProvider;
