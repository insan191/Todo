import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid'
import { CustomContext } from '../../utils/Context'

const TasksCreate = () => {
	const { createTask, setCreateTask, user, active, setUser } =
		useContext(CustomContext)
	const [taskName, setTaskName] = useState('')
	const addTask = () => {
		let newTask = {
			id: uuidv4(),
			taskTitle: taskName,
			isComplete: false,
		}
		let newCategories = user.categories.map(item =>
			item.categoryName === active
				? { ...item, tasks: [...item.tasks, newTask] }
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
				setTaskName('')
				setCreateTask(false)
				toast('Задача добавлена')
			})
			.catch(err => toast(`Введите правильно название задачи,${err.message}`))
	}
	const checkTasks = () => {
		if (
			user.categories
				.find(item => item.categoryName === active)
				.tasks.findIndex(item => item.taskTitle === taskName) > -1
		) {
			toast('Такая задача уже существует')
		} else if (!taskName.length) {
			toast('Дайте название задаче')
		} else {
			addTask()
		}
	}
	return (
		<div className='tasks__create'>
			{createTask === true ? (
				<div className='tasks__create-window'>
					<input
						type='text'
						className='tasks__create-input'
						placeholder='Текст задачи'
						value={taskName}
						onChange={e => setTaskName(e.target.value)}
					/>
					<div className='tasks__create-block'>
						<button
							className='tasks__create-confirm'
							type='button'
							onClick={checkTasks}
						>
							Добавить задачу
						</button>
						<button
							className='tasks__create-confirm'
							type='button'
							style={{ color: '#9C9C9C', background: '#F4F6F8' }}
							onClick={() => setCreateTask(false)}
						>
							Отмена
						</button>
					</div>
				</div>
			) : (
				<button
					className='tasks__create-btn'
					type='button'
					onClick={() => setCreateTask(true)}
				>
					<FontAwesomeIcon className='tasks__create-icon' icon={faPlus} />
					<p className='tasks__create-text'>Новая задача</p>
				</button>
			)}
		</div>
	)
}

export default TasksCreate
