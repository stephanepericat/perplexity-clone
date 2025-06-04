import { createContext } from 'react'

export const UserDetailContext = createContext({
  userDetail: {} as Record<string, any> | null,
  setUserDetail: (user: any) => {},
})
