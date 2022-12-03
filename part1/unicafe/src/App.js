import { useState } from 'react'

const Button = (props) => <button onClick={props.onClick}>{props.text}</button>

const StatisticsLine = (props) => (
  <tr>
    <td>{props.text}</td>
    <td>{props.value}</td>
  </tr>
)
const Statistics = ({ good, neutral, bad }) => {
  if (good !== 0 || neutral !== 0 || bad !== 0) {
    return (
      <div>
        <table>
          <tbody>
            <StatisticsLine text={'good'} value={good} />
            <StatisticsLine text={'neutral'} value={neutral} />
            <StatisticsLine text={'bad'} value={bad} />

            <StatisticsLine text={'all'} value={good + neutral + bad} />
            <StatisticsLine text={'average'} value={((good - bad) / (good + neutral + bad)).toFixed(1)} />
            <StatisticsLine text={'positive'} value={((100 / (good + neutral + bad)) * good).toFixed(1) + ' %'} />
          </tbody>
        </table>
      </div>
    )
  } else {
    return (
      <div>
        <p>{'No feedback given'}</p>
      </div>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodFbClick = () => setGood(good + 1)

  const handleNeutralFbClick = () => setNeutral(neutral + 1)

  const handleBadFbClick = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGoodFbClick} text={'good'} />
      <Button onClick={handleNeutralFbClick} text={'neutral'} />
      <Button onClick={handleBadFbClick} text={'bad'} />

      <h1>statistics</h1>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
      />
    </div>
  )
}

export default App