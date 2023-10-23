import './App.css'
import JournalItem from './components/JournalItem/JournalItem';
import CardButton from './components/CardButton/CardButton'
import LeftPanel from './layouts/LeftPanel/LeftPanel';
import Header from './components/Header/Header';
import JournalList from './components/JournalList/JournalList';
import Body from './layouts/Body/Body'
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import JournalForm from './components/JournalForm/JournalForm'
import {useEffect, useState} from 'react'




function App() {
	const [items, setItem] = useState([])

	useEffect(()=>{
		const data = JSON.parse(localStorage.getItem('data'))
		if (data) {
			setItem(data.map(item => ({
				...item,
				date: new Date(item.date)
			})))
		}

	},[])

	useEffect(()=>{
		if (items.length) {
			console.log('Воспоминание записано')
			localStorage.setItem('data', JSON.stringify(items))
		}
	},[items])

	const addItem = (item) =>{
		setItem(oldItem => [...oldItem, {
			id: oldItem.length > 0 ? Math.max(...oldItem.map(i => i.id))+1 : 1,
			title: item.title,
			text: item.text,
			date: item.date==='' ? new Date() : new Date(item.date)
		}])
	}

	const sortItems = (a,b) => {
		if (a.date< b.date) {
			return 1
		}
		else return -1

	}


	return (
		<div className="app">
			<LeftPanel>
				<Header/>
				<JournalAddButton/>
				<JournalList>
					{items.length === 0 && <p>Записей нет</p>}
					{items.length>0 && items.sort(sortItems).map(el => (
						<CardButton key={el.id}>
							<JournalItem title={el.title} text={el.text} date={el.date}/>
						</CardButton>
					))}
				</JournalList>
			</LeftPanel>
			<Body>
				<JournalForm addItem={addItem} />
			</Body>
		
	
			
		</div>
	)
}

export default App;
