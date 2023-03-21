import axios from 'axios'
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { CustomContext } from '../../utils/Context'
const Form = () => {
	const navigate = useNavigate()

	const { pathname } = useLocation()

	const { setUser, user } = useContext(CustomContext)

	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({ mode: 'onChange' })

	const registerUser = data => {
		axios
			.post('http://localhost:8090/register', {
				...data,
				categories: [],
			})
			.then(res => {
				setUser({
					token: res.data.accessToken,
					...res.data.user,
				})
				localStorage.setItem(
					'user',
					JSON.stringify({
						token: res.data.accessToken,
						...res.data.user,
					})
				)
				reset()
				navigate('/')
			})
			.catch(err => console.log(err))
		reset()
	}

	const loginUser = data => {
		axios
			.post('http://localhost:8090/login', {
				...data,
			})
			.then(res => {
				setUser({
					token: res.data.accessToken,
					...res.data.user,
				})
				localStorage.setItem(
					'user',
					JSON.stringify({
						token: res.data.accessToken,
						...res.data.user,
					})
				)
				reset()
				navigate('/')
			})
			.catch(err => console.log(err))
		reset()
	}

	const onSubmit = data => {
		pathname === '/register' ? registerUser(data) : loginUser(data)
	}
	if (user.email.length !== 0) {
		return <Navigate to='/' />
	}
	return (
		<div className='form__content'>
			<form className='form' noValidate onSubmit={handleSubmit(onSubmit)}>
				<h2 className='form__title'>
					{pathname === '/register' ? 'Регистрация' : 'Вход'}
				</h2>
				{pathname === '/register' ? (
					<label className='form__label'>
						<input
							{...register('login', {
								required: {
									message: 'Поле логин обязателен к заполнению',
									value: true,
								},
								maxLength: {
									message: 'Максимальная длина 10 символов',
									value: 10,
								},
								minLength: {
									message: 'Минимальная длина 3 символа',
									value: 3,
								},
							})}
							className='form__field'
							type='text'
							placeholder='Введите логин'
						/>
						<span className='form__error'>
							{errors.login && errors.login.message}
						</span>
					</label>
				) : (
					''
				)}

				<label className='form__label'>
					<input
						{...register('email', {
							required: {
								message: 'Email обязателен к заполнению',
								value: true,
							},
							pattern: {
								message: 'Напишите правильно свой Email',
								value:
									/^((([0-9A-Za-z]{1}[-0-9A-z\.]{0,30}[0-9A-Za-z]?)|([0-9А-Яа-я]{1}[-0-9А-я\.]{0,30}[0-9А-Яа-я]?))@([-A-Za-z]{1,}\.){1,}[-A-Za-z]{2,})$/,
							},
						})}
						className='form__field'
						type='email'
						placeholder='Введите Email'
					/>
					<span className='form__error'>
						{errors.email && errors.email.message}
					</span>
				</label>
				<label className='form__label'>
					<input
						{...register('password', {
							required: {
								message: 'Пароль обязателен к заполнению',
								value: true,
							},
							pattern: {
								message: 'Напишите правильно свой пароль',
								value: /(?=.*[0-9])(?=.*[a-z]){6,}/g,
							},
						})}
						className='form__field'
						type='password'
						placeholder='Введите пароль'
					/>
					<span className='form__error'>
						{errors.password && errors.password.message}
					</span>
				</label>
				{/* <label className='form__label'>
					<input
						className='form__field'
						type='password'
						placeholder='Введите пароль ещё раз'
					/>
					<span className='form__error'>
						{errors.login && errors.login.message}
					</span>
				</label> */}
				<p className='form__text'>
					{pathname === '/register' ? (
						<>
							У меня уже есть аккаунт чтобы{' '}
							<Link className='form__link' to='/login'>
								Войти
							</Link>
						</>
					) : (
						<>
							Ещё нет аккаунта ?{' '}
							<Link className='form__link' to='/register'>
								Зарегистрироваться
							</Link>
						</>
					)}
				</p>
				<button type='submit' className='form__btn'>
					{pathname === '/register' ? 'Зарегистрироваться' : 'Войти'}
				</button>
			</form>
		</div>
	)
}

export default Form
