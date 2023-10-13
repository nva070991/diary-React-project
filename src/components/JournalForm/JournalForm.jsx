import './JournalForm.css'
import Button from '../Button/Button'



function JournalForm({addItem}) {

	const addJournalItem = (e) => {
		e.preventDefault()
		const formData = new FormData(e.target)
		const formProps = Object.fromEntries(formData)



		addItem(formProps)
	}



	return (
		<>
			<form className='journal-form' onSubmit={addJournalItem}>
				<input className='journal-form-title' type='text' name='title'/>
				<input className='journal-form-date' type='date' name='date'/>
				<input className='journal-form-text'  type='text' name='tag'/>
				<textarea className='journal-form-textarea' name="post" id="" cols="30" rows="10"></textarea>
				<Button text="Сохранить"/>
			</form>
		</>
		
		
  
	)
}

export default JournalForm;
