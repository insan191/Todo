import { faCircleXmark, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { v4 as uuidv4 } from 'uuid'
import { CustomContext } from '../../utils/Context'
import { dataColors } from '../../utils/dataColors'
import AllCategories from '../AllCategories/AllCategories'

const Aside = () => {
	const [popup, setPopup] = useState(false)
	const [color, setColor] = useState(dataColors[0])
	const [category, setCategory] = useState('')
	const { user, setUser, setActive } = useContext(CustomContext)
	const [leave, setLeave] = useState(false)

	const addCategory = () => {
		let newCategory = {
			categoryName: category,
			color,
			id: uuidv4(),
			tasks: [],
		}
		axios
			.patch(` http://localhost:8090/users/${user.id}`, {
				categories: [...user.categories, newCategory],
			})
			.then(({ data }) => {
				setUser({ ...data, token: user.token })
				localStorage.setItem(
					'user',
					JSON.stringify({ ...data, token: user.token })
				)
				setActive(category)
				setCategory('')
				setPopup(false)
				toast('Папка добавлена')
			})
			.catch(err => toast(`Введите правильно название папки,${err.message}`))
	}

	const logOutUser = () => {
		localStorage.removeItem('user')
		setUser({
			email: '',
		})
	}
	const checkCategories = () => {
		if (
			user.categories.findIndex(item => item.categoryName === category) > -1
		) {
			toast('Такая категория уже существует')
		} else if (!category.length) {
			toast('Дайте название папке')
		} else {
			addCategory()
		}
	}

	return (
		<aside className='aside'>
			<button
				className='aside__leave-btn'
				onClick={() => {
					setLeave(prev => !prev)
				}}
			>
				Выйти
			</button>
			{leave === true ? (
				<>
					<div className='aside__leave-window'>
						<p className='aside__leave-text'>Вы действительно хотите выйти?</p>
						<div className='aside__leave-block'>
							<button className='aside__leave-confirm' onClick={logOutUser}>
								Да
							</button>
							<button
								className='aside__leave-confirm'
								onClick={() => setLeave(false)}
							>
								Отмена
							</button>
						</div>
					</div>
				</>
			) : (
				''
			)}
			<AllCategories />
			<div className='aside__create'>
				<button
					className='aside__addBtn'
					type='button'
					onClick={() => setPopup(prev => !prev)}
				>
					<FontAwesomeIcon icon={faPlus} className='aside__addBtn-icon' />
					<span className='aside__addBtn-text'>Добавить папку</span>
				</button>
				{popup === false ? (
					''
				) : (
					<div className='aside__create-popup'>
						<input
							type='text'
							className='aside__create-field'
							placeholder='Название папки'
							value={category}
							onChange={e => setCategory(e.target.value)}
						/>
						<div className='aside__create-colors'>
							{dataColors.map((item, idx) => (
								<span
									key={idx}
									onClick={() => setColor(item)}
									className='aside__create-color'
									style={{
										background: item,
										border: color === item ? '2px solid #525252' : 'none',
										transition: 'none',
									}}
								/>
							))}
						</div>
						<button
							className='aside__create-btn'
							type='button'
							onClick={checkCategories}
						>
							Добавить
						</button>
						<FontAwesomeIcon
							icon={faCircleXmark}
							className='aside__create-close'
							onClick={() => setPopup(false)}
						/>
					</div>
				)}
			</div>
		</aside>
	)
}

export default Aside
