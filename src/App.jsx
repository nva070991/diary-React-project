import './App.css'
import Button from './components/Button/Button';
import JournalItem from './components/JournalItem/JournalItem';
import CardButton from './components/CardButton/CardButton'
import LeftPanel from './layouts/LeftPanel/LeftPanel';
import Header from './components/Header/Header';
import JournalList from './components/JournalList/JournalList';
import Body from './layouts/Body/Body'
import JournalAddButton from './components/JournalAddButton/JournalAddButton';


function App() {
	const data = [
		{
			title: 'Подготовка к обновлению курсов',
			text: 'Горные походы открывают удивительные природные ландшафт',
			date: new Date()
		},
		{
			title: 'Поход в горы',
			text: 'Я ходил в горы',
			date: new Date()
		}
	]

	return (
		<div className="app">
			<LeftPanel>
				<Header/>
				<JournalAddButton/>
				<JournalList>
					<CardButton>
						<JournalItem title={data[0].title} text={data[0].text} date={data[0].date}/>
					</CardButton>
					<CardButton>
						<JournalItem title={data[1].title} text={data[1].text} date={data[1].date}/>
					</CardButton>

				</JournalList>
			</LeftPanel>
			<Body>
				<h1>Заголовок</h1>
				<p>текст</p>
				<Button/>
			</Body>
		
	
			
		</div>
	)
}

export default App;
