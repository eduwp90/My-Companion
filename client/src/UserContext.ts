import { createContext } from 'react';

interface UserContextInterface {
  user: {} | null;
  setUser: Function
}

// export const UserContext = createContext({user:{}, setUser: Function});
export const UserContext = createContext({} as UserContextInterface);