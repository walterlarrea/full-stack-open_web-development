import { useState } from 'react'

const Anecdote = ({ title, anecdote, votes }) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>{anecdote} </p>
      <p>has {votes} votes</p>
    </div>
  )
}

const MostVotedAnecdote = ({ anecdotes, votes }) => {
  let mostVoted = -1

  mostVoted = votes.indexOf(Math.max(...votes))

  if (votes[mostVoted] !== 0) {
    return (
      <Anecdote title={'Anecdote with most votes'} anecdote={anecdotes[mostVoted]} votes={votes[mostVoted]} />
    )
  } else {
    return (
      <div><p>No votes given</p></div>
    )
  }
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  const randomAnecdoteIndex = (min, max) => setSelected(Math.floor(Math.random() * (max - min) + min))

  const increaseVotes = (index) => {
    let newVotes = [...votes]
    newVotes[index] += 1

    setVotes(newVotes)
  }

  return (
    <div>
      <Anecdote title={'Anecdote of the day'} anecdote={anecdotes[selected]} votes={votes[selected]} />
      <button onClick={() => increaseVotes(selected)}>vote</button>
      <button onClick={() => randomAnecdoteIndex(0, anecdotes.length)}>next anecdote</button>
      <MostVotedAnecdote anecdotes={anecdotes} votes={votes} />
    </div>
  )
}

export default App