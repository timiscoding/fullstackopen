import anecdoteService from '../services/anecdotes';

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const changedAnecdote = action.data;
      return state.map(anecdote => anecdote.id !== changedAnecdote.id ? anecdote : changedAnecdote);
    case 'ADD_ANECDOTE':
      return [ ...state, action.data ];
    case 'INIT_ANECDOTES':
      return action.data;
    default:
      return state;
  }
}

export const voteFor = (anecdote) => {
  return async (dispatch) => {
    const anecdoteToUpdate = { ...anecdote, votes: anecdote.votes + 1 };
    const updatedAnecdote = await anecdoteService.update(anecdote.id, anecdoteToUpdate);
    dispatch({
      type: 'VOTE',
      data: updatedAnecdote,
    });
  };
};

export const newAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.createNew(content);
    dispatch({
      type: 'ADD_ANECDOTE',
      data: anecdote,
    });
  };
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    });
  };
};

export default reducer
