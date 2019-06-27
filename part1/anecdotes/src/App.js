import React, { useState } from 'react';

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;
const Anecdote = ({ text, title, votes }) => (
  <div>
    <h1>{title}</h1>
    <p>{text}</p>
    <p><p>has {votes} votes</p></p>
  </div>
);

function App(props) {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));
  const randomQuote = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomIndex);
  };
  const vote = () => {
    const newVotes = [...votes];
    newVotes[selected]++;
    setVotes(newVotes);
  };
  const mostVotes = votes.reduce((bestIndex, v, i, arr) => v > arr[bestIndex] ? i : bestIndex, 0);

  return (
    <div>
      <Anecdote title="Anecdote of the day" text={anecdotes[selected]} votes={votes[selected]} />
      <Button onClick={vote} text="vote" />
      <Button onClick={randomQuote} text="next anecdote" />
      <Anecdote title="Anecdote with most votes" text={anecdotes[mostVotes]} votes={votes[mostVotes]} />
    </div>
  );
};

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

export default App;
