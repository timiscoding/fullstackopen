import React, { useState } from 'react';

const Form = ({ state: { setGood, setNeutral, setBad, good, neutral, bad }}) => {
  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" onClick={() => setGood(good + 1)} />
      <Button text="neutral" onClick={() => setNeutral(neutral + 1)} />
      <Button text="bad" onClick={() => setBad(bad + 1)} />
    </div>
  );
}
const Button = ({ onClick, text }) => (
  <button onClick={onClick}>{text}</button>
);
const Statistic = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);
const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = total ? (good - bad) / total : 'n/a';
  const positive = total ? good / total : 'n/a';
  const hasFeedback = good || neutral || bad;
  return (
      <div>
        <h1>Statistics</h1>
        {hasFeedback
          ? <table>
              <tbody>
                <Statistic text="good" value={good} />
                <Statistic text="neutral" value={neutral} />
                <Statistic text="bad" value={bad} />
                <Statistic text="average" value={average} />
                <Statistic text="positive" value={positive} />
              </tbody>
            </table>
          : <p>No feedback given</p>}
      </div>
    )

}

function App() {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Form state={{good, setGood, neutral, setNeutral, bad, setBad}} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App;
