import { createContext, useState } from 'react'

export const CustomContext = createContext()

export const Context = props => {
	const [user, setUser] = useState({
		email: '',
	})
	const [createTask, setCreateTask] = useState(false)
	const [active, setActive] = useState('all')
	const value = {
		user,
		setUser,
		active,
		setActive,
		createTask,
		setCreateTask,
	}
	return (
		<CustomContext.Provider value={value}>
			{props.children}
		</CustomContext.Provider>
	)
}
