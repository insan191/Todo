import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { CustomContext } from '../../utils/Context'
import TasksComplete from '../TasksComplete/TasksComplete'

const TasksElement = ({ item }) => {
	const { user, active, setUser } = useContext(CustomContext)
	const [taskWindow, setTaskWindow] = useState(false)
	const deleteTask = id => {
		let newCategories = user.categories.map(item =>
			item.categoryName === active
				? { ...item, tasks: item.tasks.filter(el => el.id !== id) }
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

				toast('Задача удалена')
			})
			.catch(err => toast(`Не получилось удалить задачу,${err.message}`))
	}
	return (
		<li className='tasks__list-item' key={item.id}>
			<div className='tasks__list-left'>
				<TasksComplete item={item} />
				<p className='tasks__list-text'>{item.taskTitle}</p>
			</div>
			{active !== 'all' ? (
				<>
					<FontAwesomeIcon
						icon={faXmark}
						className='tasks__list-delete'
						onClick={() => setTaskWindow(prev => !prev)}
					/>
					{taskWindow === true ? (
						<div className='tasks__del-window'>
							<p className='tasks__del-text'>
								Вы действительно хотите удалить?
							</p>
							<div className='tasks__del-block'>
								<button
									className='tasks__del-confirm'
									onClick={() => {
										deleteTask(item.id)
									}}
								>
									Да
								</button>
								<button
									className='tasks__del-confirm'
									onClick={() => setTaskWindow(false)}
								>
									Отмена
								</button>
							</div>
						</div>
					) : (
						''
					)}
				</>
			) : (
				''
			)}
		</li>
	)
}

export default TasksElement
