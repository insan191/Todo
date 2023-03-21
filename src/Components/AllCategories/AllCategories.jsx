import { faListUl } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import { CustomContext } from '../../utils/Context'
import CategoryItem from '../CategoryItem/CategoryItem'

const AllCategories = () => {
	const { user, setActive, active } = useContext(CustomContext)
	return (
		<>
			{user.categories.length ? (
				<>
					<div
						className={active === 'all' ? 'aside__all active' : 'aside__all'}
						onClick={() => setActive('all')}
					>
						<FontAwesomeIcon icon={faListUl} className='aside__all-icon' />
						<span className='aside__all-text'>Все задачи</span>
					</div>
					<ul className='aside__menu'>
						{user.categories.map(item => (
							<CategoryItem item={item} key={item.id} />
						))}
					</ul>
				</>
			) : (
				''
			)}
		</>
	)
}

export default AllCategories
