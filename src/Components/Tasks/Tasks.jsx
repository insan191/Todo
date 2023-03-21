import React, { useContext } from 'react'
import { CustomContext } from '../../utils/Context'
import TasksCreate from '../TasksCreate/TasksCreate'
import TasksItem from '../TasksItem/TasksItem'

const Tasks = () => {
	const { user, active } = useContext(CustomContext)
	return (
		<div className='tasks'>
			{active.length ? (
				active === 'all' ? (
					user.categories.map(item => (
						<TasksItem key={item.id} activeClone={item.categoryName} />
					))
				) : (
					<>
						<TasksItem activeClone={active} />
						<TasksCreate />
					</>
				)
			) : (
				<p className='tasks__missing'>Задачи отсутствуют</p>
			)}
		</div>
	)
}

export default Tasks
