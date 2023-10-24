import './App.css'
import LeftPanel from './layouts/LeftPanel/LeftPanel';
import Header from './components/Header/Header';
import JournalList from './components/JournalList/JournalList';
import Body from './layouts/Body/Body'
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import JournalForm from './components/JournalForm/JournalForm'
import { useLocalStorage } from './hooks/use-localstorage.hook';
import { UserContext } from './context/user.context';

function mapItems(items) {
	if (!items) return []

	return items.map(i => ({
		...i,
		date: new Date(i.date)
	}))	
}




function App() {
	const [items, setItem] = useLocalStorage('data')

	const addItem = (item) =>{
		setItem([...mapItems(items), {
			id: items?.length > 0 ? Math.max(...items.map(i => i.id))+1 : 1,
			title: item.title,
			text: item.text,
			date: new Date(item.date)
		}])
	}




	return (
		<UserContext.Provider value={{userId: 1}}>
			<div className="app">
				<LeftPanel>
					<Header/>
					<JournalAddButton/>
					<JournalList items={mapItems(items)}/>	
				</LeftPanel>
				<Body>
					<JournalForm addItem={addItem} />
				</Body>
		
	
			
			</div>
		</UserContext.Provider>
	)
}

export default App;
