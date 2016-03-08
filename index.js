import makeStore from './src/store'
import startServer from './src/server'

export const store = makeStore()
startServer(store)

// Populate with some fake entries for testing
store.dispatch({
  type: 'SET_ENTRIES',
  entries: require('./entries.json')
});

// Start the contest
store.dispatch({type: 'NEXT'})