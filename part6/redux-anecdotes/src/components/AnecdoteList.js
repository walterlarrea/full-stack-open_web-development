import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleVote }) => {
  return (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => handleVote(anecdote.id)}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const searchBoxFilter = useSelector(({ filters }) => filters.searchBox)

  const anecdotesOrderedByVotesAndFiltered = useSelector(({ anecdotes }) =>
    [...anecdotes]
      .filter((a => a.content === '' ||
        a.content
          .toLowerCase()
          .includes(searchBoxFilter.toLowerCase())))
      .sort((a, b) => b.votes - a.votes))

  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(voteAnecdote(id))

    dispatch(setNotification(`you voted '${anecdotesOrderedByVotesAndFiltered.find(a => a.id === id).content}'`))
    setTimeout(() => {
      dispatch(removeNotification(''))
    }, 5000)
  }

  return (
    <div>
      {anecdotesOrderedByVotesAndFiltered.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleVote={() =>
            vote(anecdote.id)}
        />
      )}
    </div>
  )
}

export default AnecdoteList