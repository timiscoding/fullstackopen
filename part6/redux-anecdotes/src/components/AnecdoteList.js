import React from 'react';
import { connect } from 'react-redux';
import { voteFor } from '../reducers/anecdoteReducer';
import { setNotification, clearNotification } from '../reducers/notificationReducer';

const byVotes = (a, b) => a.votes - b.votes;

const AnecdoteList = (props) => {
  const vote = (anecdote) => () => {
    props.voteFor(anecdote);
    props.setNotification(`You voted for '${anecdote.content}'`, 5);
  };

  return (
    <div>
      {props.visibleAnecdotes.sort(byVotes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  );
};

const showAnecdotes = ({ anecdotes, filter }) => {
    if (filter === '') return anecdotes;
    const filterLower = filter.toLowerCase();
    return anecdotes.filter(anecdote =>
      anecdote.content.toLowerCase().includes(filterLower));
  };

const mapStateToProps = (store) => {
  return {
    visibleAnecdotes: showAnecdotes(store),
  };
};

const mapDispatchToProps = {
  voteFor,
  setNotification,
  clearNotification
};

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList);
