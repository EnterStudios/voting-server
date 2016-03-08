import {setEntries, next, vote, INITIAL_STATE} from './core'

export default function reducer(state = INITIAL_STATE, action)  {
  // Take a state and action and call the correct function
  switch (action.type) {
    case 'SET_ENTRIES':
      return setEntries(state, action.entries)
    case 'NEXT':
      return next(state)
    case 'VOTE':
      // update the vote prop of state with the result of the anon function returned from vote
      // Could be simplified with ES6 to state.update('vote', (voteState) => vote(voteState, action.entry))
      return state.update('vote', (voteState) => { return vote(voteState, action.entry) })
    default:
      return state
  }
}
