import './JournalAddButton.css'
import CardButton from '../CardButton/CardButton'

function JournalAddButton({clearForm}) {

	return (
		<CardButton onClick={clearForm} className="journal-add"> + Новое воспоминание</CardButton>
  
	)
}

export default JournalAddButton;
