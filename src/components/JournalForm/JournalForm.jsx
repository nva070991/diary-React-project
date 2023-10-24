import Button from '../Button/Button'
import { useEffect, useReducer, useRef } from 'react'
import cn from 'classnames'
import styles from './JournalForm.module.css'
import { INITIAL_STATE, formReducer } from './JournalFormState'
import Input from '../Input/Input'


function JournalForm({addItem}) {

	const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE)
	const {isValid, isFormReadyToSubmit, values} = formState
	const titleRef = useRef()
	const textRef = useRef()
	const tagRef = useRef()
	const dateRef = useRef()

	const focusError = (isValid) => {
		switch(true) {
		case !isValid.title:
			titleRef.current.focus()
			break
		case !isValid.date:
			dateRef.current.focus()
			break
		case !isValid.tag:
			tagRef.current.focus()
			break
		case !isValid.text:
			textRef.current.focus()
			break
		}

	}

	useEffect(() => {
		let timerId
		if(!isValid.title || !isValid.text || !isValid.date || !isValid.tag) {
			focusError(isValid)
			timerId= setTimeout(()=> {
				dispatchForm({ type: 'RESET_VALIDITY'})
			}, 2000)

			return ()=>{
				clearTimeout(timerId)
			}
		}
	} , [isValid])

	useEffect(()=>{
		if(isFormReadyToSubmit) {
			addItem(values)
			dispatchForm({type: 'CLEAR'})
		}

	},[isFormReadyToSubmit, values, addItem])

	const addJournalItem = (e) => {
		e.preventDefault()
		dispatchForm({type: 'SUBMIT'})
	}

	const onChange =(e) => {
		dispatchForm({type: 'SET_VALUE', payload: { [e.target.name] : e.target.value}})

	}
	return (
		<form className={styles['journal-form']} onSubmit={addJournalItem}>
			<div>
				<Input value={values.title} appearance='title' isValid={isValid.title} ref={titleRef} onChange={onChange} className={cn(styles['journal-form-title'], {[styles.invalid] : !isValid.title})} type='text' name='title'/>

			</div>

			<div className={styles['journal-form-div']}>
				<label className={styles['journal-form-label']} htmlFor="date">
					<img className={styles['journal-form-logo']} src="/calendar.svg" alt="Иконка календаря" />
					<span>Дата</span>
				</label>
				<Input id='date' isValid={isValid.date} ref={dateRef} value={values.date} onChange={onChange} type='date' name='date'/>
			</div>
			<div className={styles['journal-form-div']}>
				<label className={styles['journal-form-label']} htmlFor="tag">
					<img className={styles['journal-form-logo']} src="/folder.svg" alt="Иконка папки" />
					<span>Метки</span>
				</label>
				<Input value={values.tag} ref={tagRef} isValid={isValid.tag} onChange={onChange}  id='tag' type='text' name='tag'/>
			</div>
			<textarea value={values.text} ref={textRef} onChange={onChange} className={cn(styles['journal-form-text'], {[styles.invalid] : !isValid.text})} name="text" id="text" cols="30" rows="10"></textarea>
			<Button text="Сохранить"/>
		</form>
	)
}

export default JournalForm;
