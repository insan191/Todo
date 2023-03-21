import { faCircle } from '@fortawesome/free-regular-svg-icons'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { useContext } from 'react'
import { toast } from 'react-toastify'
import { CustomContext } from '../../utils/Context'
const TasksComplete = ({ item }) => {
	const { user, active, setUser } = useContext(CustomContext)
	const completeTask = id => {
		let newCategories = user.categories.map(item =>
			item.categoryName === active
				? {
						...item,
						tasks: item.tasks.map(el =>
							el.id === id ? { ...el, isComplete: !el.isComplete } : el
						),
				  }
				: item
		)
		axios
			.patch(` http://localhost:8090/users/${user.id}`, {
				categories: newCategories,
			})
			.then(({ data }) => {
				setUser({ ...data, token: user.token })
				localStorage.setItem(
					'user',
					JSON.stringify({ ...data, token: user.token })
				)
			})
			.catch(err => toast(err.message))
	}
	return (
		<>
			{item.isComplete === false ? (
				<FontAwesomeIcon
					icon={faCircle}
					className='tasks__list-icon'
					onClick={() => completeTask(item.id)}
				/>
			) : (
				<FontAwesomeIcon
					icon={faCircleCheck}
					className='tasks__list-icon'
					style={{ color: '#4DD599' }}
					onClick={() => completeTask(item.id)}
				/>
			)}
		</>
	)
}

export default TasksComplete
