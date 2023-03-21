import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Aside from '../../Components/Aside/Aside'
import Tasks from '../../Components/Tasks/Tasks'
import { CustomContext } from '../../utils/Context'

const Home = () => {
	const { user } = useContext(CustomContext)
	if (user.email.length === 0) {
		return <Navigate to='/login' />
	}
	return (
		<main className='main'>
			<div className='container'>
				<div className='main__content'>
					<Aside />
					<Tasks />
					<ToastContainer/>
				</div>
			</div>
		</main>
	)
}

export default Home
