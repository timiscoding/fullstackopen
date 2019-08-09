import React from 'react';
import { connect } from 'react-redux';
import { newAnecdote } from '../reducers/anecdoteReducer';
import { setNotification, clearNotification } from '../reducers/notificationReducer';

const AnecdoteForm = (props) => {
  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    props.newAnecdote(content);
    event.target.anecdote.value = '';
    props.setNotification('Anecdote added', 5);
  };

  return (
    <div>
      <h2>create new</h2>

      <form onSubmit={addAnecdote}>
        <div><input name="anecdote" /></div>
        <button>create</button>
      </form>
    </div>
  );
};

export default connect(
  null,
  {
    newAnecdote,
    setNotification,
    clearNotification,
  }
)(AnecdoteForm);
