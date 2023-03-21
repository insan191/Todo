import { faCircle, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { CustomContext } from '../../utils/Context'

const CategoryItem = ({ item }) => {
	const { user, setUser, active, setActive, setCreateTask } =
		useContext(CustomContext)
	const [del, setDel] = useState(false)
	const deleteCategory = id => {
		let newArrayCategories = user.categories.filter(item => item.id !== id)
		axios
			.patch(` http://localhost:8090/users/${user.id}`, {
				categories: newArrayCategories,
			})
			.then(({ data }) => {
				setUser({ ...data, token: user.token })
				localStorage.setItem(
					'user',
					JSON.stringify({ ...data, token: user.token })
				)
				setActive('all')
				toast('Папка удалена')
			})
			.catch(err => toast(`Не получилось удалить папку,${err.message}`))
	}
	return (
		<li
			className={
				active === item.categoryName
					? 'aside__menu-item active'
					: 'aside__menu-item'
			}
			onClick={() => {
				setActive(item.categoryName)
				setCreateTask(false)
			}}
		>
			<div className='aside__menu-item-left'>
				<FontAwesomeIcon
					icon={faCircle}
					style={{ color: item.color }}
					className='aside__menu-item-color'
				/>
				<span className='aside__menu-item-text'>{item.categoryName}</span>
			</div>
			<FontAwesomeIcon
				icon={faXmark}
				className='aside__menu-item-xmark'
				onClick={() => setDel(prev => !prev)}
			/>
			{del === true ? (
				<div className='aside__del-window'>
					<p className='aside__del-text'>Вы действительно хотите удалить?</p>
					<div className='aside__del-block'>
						<button
							className='aside__del-confirm'
							onClick={() => {
								deleteCategory(item.id)
							}}
						>
							Да
						</button>
						<button
							className='aside__del-confirm'
							onClick={() => setDel(false)}
						>
							Отмена
						</button>
					</div>
				</div>
			) : (
				''
			)}
		</li>
	)
}

export default CategoryItem
