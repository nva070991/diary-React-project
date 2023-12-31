import './JournalList.css'
import CardButton from  '../CardButton/CardButton'
import JournalItem from '../JournalItem/JournalItem'

function JournalList({children, items, setItem}) {

	const sortItems = (a,b) => {
		if (a.date< b.date) {
			return 1
		}
		else return -1

	}



	return (
		<div className="journal-list">
			{items.length === 0 && children}

			{items.length>0 && items.sort(sortItems).map(el => (
				<CardButton onClick={()=>{ 
					setItem(el)}} key={el.id}>
					<JournalItem title={el.title} text={el.text} date={el.date} tag={el.tag}/>
				</CardButton>
			))}
		</div>
  
	)
}

export default JournalList;
