import anecdoteService from '../services/anecdotes';

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const id = action.data.id;
      const anecdoteToChange = state.find(anecdote => anecdote.id === id);
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      };
      return state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote);
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
    await anecdoteService.update(anecdote.id, anecdoteToUpdate);
    dispatch({
      type: 'VOTE',
      data: { id: anecdote.id },
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
