import Button from '../Button/Button'
import { useState } from 'react'
import cn from 'classnames'
import styles from './JournalForm.module.css'


function JournalForm({addItem}) {

	const [formValidState, setFormValidState] = useState({
		title: true,
		text: true,
		date: true,
		tag: true
	})

	const addJournalItem = (e) => {
		e.preventDefault()
		const formData = new FormData(e.target)
		const formProps = Object.fromEntries(formData)
		console.log(formProps)
		let isFormValid = true
		if(!formProps.title?.trim().length) {
			setFormValidState(state => ({...state, title : false
			}))
			isFormValid = false
		}
		else {setFormValidState(state => ({...state, title : true
		}))}
		if(!formProps.text?.trim().length) {
			setFormValidState(state => ({...state, text : false
			}))
			isFormValid = false
		}
		else {setFormValidState(state => ({...state, text : true
		}))}
		if(!formProps.date) {
			setFormValidState(state => ({...state, date : false
			}))
			isFormValid = false
		}
		else {setFormValidState(state => ({...state, date : true
		}))}
		if(!formProps.tag?.trim().length) {
			setFormValidState(state => ({...state, tag : false
			}))
			isFormValid = false
		}
		else {setFormValidState(state => ({...state, tag : true
		}))}
		if (!isFormValid) {console.log(isFormValid) 
			return}

		addItem(formProps)
	}
	return (
		<>
			<form className={styles['journal-form']} onSubmit={addJournalItem}>
				<div>
					<input className={cn(styles['journal-form-title'], {[styles.invalid] : !formValidState.title})} type='text' name='title'/>

				</div>

				<div className={styles['journal-form-div']}>
					<label className={styles['journal-form-label']} htmlFor="date">
						<img className={styles['journal-form-logo']} src="/calendar.svg" alt="Иконка календаря" />
						<span>Дата</span>
					</label>
					<input id='date' className={cn(styles['journal-form-date'], {[styles.invalid] : !formValidState.date})} type='date' name='date'/>
				</div>
				<div className={styles['journal-form-div']}>
					<label className={styles['journal-form-label']} htmlFor="tag">
						<img className={styles['journal-form-logo']} src="/folder.svg" alt="Иконка папки" />
						<span>Метки</span>
					</label>
					<input className={cn(styles['journal-form-tag'], {[styles.invalid] : !formValidState.tag})} id='tag' type='text' name='tag'/>
				</div>
				<textarea className={cn(styles['journal-form-text'], {[styles.invalid] : !formValidState.text})} name="text" id="" cols="30" rows="10"></textarea>
				<Button text="Сохранить"/>
			</form>
		</>
	)
}

export default JournalForm;
