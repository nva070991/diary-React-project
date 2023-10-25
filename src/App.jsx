import './App.css'
import LeftPanel from './layouts/LeftPanel/LeftPanel';
import Header from './components/Header/Header';
import JournalList from './components/JournalList/JournalList';
import Body from './layouts/Body/Body'
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import JournalForm from './components/JournalForm/JournalForm'
import { useLocalStorage } from './hooks/use-localstorage.hook';
import { UserContext } from './context/user.context';
import { useState } from 'react';

function mapItems(items) {
	if (!items) return []

	return items.map(i => ({
		...i,
		date: new Date(i.date)
	}))	
}




function App() {
	const [items, setItem] = useLocalStorage('data')
	const [selectedItem, setSelectedItem] = useState(null)




	const addItem = (item) =>{
		if (!item.id) {
			setItem([...mapItems(items), {
				id: items?.length > 0 ? Math.max(...items.map(i => i.id))+1 : 1,
				title: item.title,
				text: item.text,
				date: new Date(item.date),
				tag: item.tag
			}])
		}
		else {
			setItem([...mapItems(items).map((i)=> {
				if (i.id===item.id) {
					return {
						...item
					}
				}
				else {
					return i
				}
			})])
		}
	}

	const deleteItem = (id) => {

		setItem([...items.filter(i=> i.id!==id)])

	}




	return (
		<UserContext.Provider value={{userId: 1}}>
			<div className="app">
				<LeftPanel>
					<Header/>
					<JournalAddButton clearForm={()=>setSelectedItem(null)}/>
					<JournalList setItem={setSelectedItem} items={mapItems(items)}>Записей нет, добавьте воспоминание</JournalList>
				</LeftPanel>
				<Body>
					<JournalForm data={selectedItem} onDelete={deleteItem} addItem={addItem} />
				</Body>
			</div>
		</UserContext.Provider>
	)
}

export default App;
