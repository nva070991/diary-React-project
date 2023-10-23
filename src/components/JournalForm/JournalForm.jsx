import Button from '../Button/Button'
import { useEffect, useReducer } from 'react'
import cn from 'classnames'
import styles from './JournalForm.module.css'
import { INITIAL_STATE, formReducer } from './JournalFormState'


function JournalForm({addItem}) {

	const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE)
	const {isValid, isFormReadyToSubmit, values} = formState

	useEffect(() => {
		let timerId
		if(!isValid.title || !isValid.text || !isValid.date || !isValid.tag) {
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

	},[isFormReadyToSubmit])

	const addJournalItem = (e) => {

		e.preventDefault()
		
		dispatchForm({type: 'SUBMIT'})

	}

	const onChange =(e) => {
		dispatchForm({type: 'SET_VALUE', payload: { [e.target.name] : e.target.value}})

	}
	return (
		<>
			<form className={styles['journal-form']} onSubmit={addJournalItem}>
				<div>
					<input value={values.title} onChange={onChange} className={cn(styles['journal-form-title'], {[styles.invalid] : !isValid.title})} type='text' name='title'/>

				</div>

				<div className={styles['journal-form-div']}>
					<label className={styles['journal-form-label']} htmlFor="date">
						<img className={styles['journal-form-logo']} src="/calendar.svg" alt="Иконка календаря" />
						<span>Дата</span>
					</label>
					<input id='date' value={values.date} onChange={onChange} className={cn(styles['journal-form-date'], {[styles.invalid] : !isValid.date})} type='date' name='date'/>
				</div>
				<div className={styles['journal-form-div']}>
					<label className={styles['journal-form-label']} htmlFor="tag">
						<img className={styles['journal-form-logo']} src="/folder.svg" alt="Иконка папки" />
						<span>Метки</span>
					</label>
					<input value={values.tag} onChange={onChange} className={cn(styles['journal-form-tag'], {[styles.invalid] : !isValid.tag})} id='tag' type='text' name='tag'/>
				</div>
				<textarea value={values.text} onChange={onChange} className={cn(styles['journal-form-text'], {[styles.invalid] : !isValid.text})} name="text" id="" cols="30" rows="10"></textarea>
				<Button text="Сохранить"/>
			</form>
		</>
	)
}

export default JournalForm;
