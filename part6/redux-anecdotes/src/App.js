import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import SearchForm from './components/SearchForm'

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <SearchForm />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App