import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Register from './pages/Register/Register'
import Login from './pages/Login/login'
import './styles/style.scss'
import { useContext, useEffect } from 'react'
import { CustomContext } from './utils/Context'

function App() {
	const { setUser } = useContext(CustomContext)

	useEffect(() => {
		if (localStorage.getItem('user') !== null) {
			setUser(JSON.parse(localStorage.getItem('user')))
		}
	}, [])

	return (
		<>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/register' element={<Register />} />
				<Route path='/login' element={<Login />} />
			</Routes>
		</>
	)
}

export default App
