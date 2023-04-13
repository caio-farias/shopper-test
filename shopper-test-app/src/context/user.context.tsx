import { useState, useCallback, PropsWithChildren } from 'react'
import { createContext } from 'use-context-selector'
import { User } from '../types/user'

export interface UserContextType {
	user: User
	loginSuccess: (user: User) => void
	logout: () => void
}

export const UserContext = createContext({} as UserContextType)

export function UserContextProvider({ children }: PropsWithChildren) {
	const [user, setUser] = useState({} as User)

	const loginSuccess = useCallback((user: User) => {
		setUser(user)
	}, [])

	const logout = () => {
		setUser({} as User)
	}

	return (
		<UserContext.Provider
			value={{
				user,
				loginSuccess,
				logout,
			}}
		>
			{children}
		</UserContext.Provider>
	)
}

export default UserContextProvider
