import './App.css'
import Button from './components/Button/Button';
import JournalItem from './components/JournalItem/JournalItem';


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
    <>
  <Button/>
  <JournalItem title={data[0].title} text={data[0].text} date={data[0].date}/>
    </>
  )
}

export default App;
