import { faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useState } from 'react'
import { CustomContext } from '../../utils/Context'
import TasksElement from '../TasksElement/TasksElement'

const TasksItem = ({ activeClone }) => {
	const { user, active } = useContext(CustomContext)
	const [changeTitle, setChangeTitle] = useState(false)
	// const [valueActive,setValueActive] = useState(active)
	// const changeTitleCategory = data => {
	// 	let newArrayCategories = user.categories.map(item =>
	// 		item.categoryName !== activeClone
	// 			? { ...item, categoryName: valueActive }
	// 			: item
	// 	)
	// 	axios
	// 		.patch(` http://localhost:8080/users/${user.id}`, {
	// 			categories: newArrayCategories,
	// 		})
	// 		.then(res => {
	// 			setUser({ ...res.data, token: user.token })
	// 			localStorage.setItem(
	// 				'user',
	// 				JSON.stringify({ ...res.data, token: user.token })
	// 			)
	// 			setActive(res.data.categoryName)
	// 			setChangeTitle(false)
	// 			toast('Название категории изменена')
	// 		})
	// 		.catch(err =>
	// 			toast(`Не получилось изменить название категории,${err.message}`)
	// 		)
	// }

	return (
		<>
			<div className='tasks__heading'>
				<h1
					className='tasks__heading-title'
					style={{
						color: user.categories.find(
							item => item.categoryName === activeClone
						).color,
					}}
				>
					{activeClone}
				</h1>
				{active === 'all' ? (
					''
				) : (
					<>
						<FontAwesomeIcon
							icon={faPen}
							className='tasks__heading-icon'
							onClick={() => setChangeTitle(prev => !prev)}
						/>
						{/* {changeTitle === true ? (
							<div className='tasks__create-window'>
								<input
									type='text'
									className='tasks__create-input'
									placeholder='Текст задачи'
									defaultValue={valueActive}
									onChange={e => setValueActive(e.target.value)}
								/>
								<div className='tasks__create-block'>
									<button
										className='tasks__create-confirm'
										type='button'
										onClick={changeTitleCategory}
									>
										Изменить
									</button>
									<button
										className='tasks__create-confirm'
										type='button'
										style={{ color: '#9C9C9C', background: '#F4F6F8' }}
										onClick={() => setChangeTitle(false)}
									>
										Отмена
									</button>
								</div>
							</div>
						) : (
							''
						)} */}
					</>
				)}
			</div>
			<div className='tasks__line'></div>
			<ul className='tasks__list'>
				{user.categories
					.find(item => item.categoryName === activeClone)
					.tasks.map(item => (
						<TasksElement item={item} key={item.id} />
					))}
			</ul>
		</>
	)
}

export default TasksItem
