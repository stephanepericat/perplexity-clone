'use client'

import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { supabase } from '@/lib/supabase'
import { UserDetailContext } from '@/context/UserDetailContext'

export function Provider({ children }: { children: React.ReactNode }) {
  const { user } = useUser()
  const [userDetail, setUserDetail] = useState<Record<string, any> | null>(null)

  const createNewUser = async () => {
    let { data: Users } = await supabase
      .from('Users')
      .select('*')
      .eq('email', user?.primaryEmailAddress?.emailAddress)

    if (!Users?.length) {
      const { data } = await supabase
        .from('Users')
        .insert({
          email: user?.primaryEmailAddress?.emailAddress,
          name: user?.fullName,
        })
        .select()

      setUserDetail(data?.[0] || null)

      return
    }

    setUserDetail(Users?.[0] || null)
  }

  useEffect(() => {
    user && createNewUser()
  }, [user])

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      <div className="w-full">{children}</div>
    </UserDetailContext.Provider>
  )
}
