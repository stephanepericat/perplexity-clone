import { createContext } from 'react'

export const UserDetailContext = createContext({
  userDetail: {} as Record<string, unknown> | null,
  setUserDetail: (_user: Record<string, unknown>): void => {},
})
