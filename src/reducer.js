import {setEntries, next, vote, INITIAL_STATE} from './core'

export default function reducer(state = INITIAL_STATE, action)  {
  // Take a state and action and call the correct function
  switch (action.type) {
    case 'SET_ENTRIES':
      return setEntries(state, action.entries)
    case 'NEXT':
      return next(state)
    case 'VOTE':
      return vote(state, action.entry)
    default:
      return state
  }
}
