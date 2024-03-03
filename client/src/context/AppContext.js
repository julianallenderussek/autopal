import { createContext, useState } from 'react';

export const AppContext = createContext();

const AppContextProvider = ({children}) => {
  const [first, setFirst] = useState("Checking context");
  const [token, setToken] = useState(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      return null
    } else {
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

  const [role, setRole] = useState(() => {
    const role = localStorage.getItem('role');
    console.log("get Role", role)
    if (!role) {
      return null
    } else {
      return role
    }
  });

  return (
    <AppContext.Provider value={{
      first,
      user,
      setUser,
      role, 
      setRole,
      token,
      setToken
    }}>
      {children}
    </AppContext.Provider>
  )
  
}

export default AppContextProvider;
