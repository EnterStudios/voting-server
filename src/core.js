import {List, Map} from 'immutable'

export const INITIAL_STATE = Map()

export function setEntries(state, entries) {
  return state.set('entries', List(entries))
}

function getWinners(vote) {
  if (!vote) {return []}
  const [a, b] = vote.get('pair') // We know there are two results, so we can auto assign them to a & b
  const aVotes = vote.getIn(['tally', a], 0) // Get the result for tally where prop is a. Default to 0
  const bVotes = vote.getIn(['tally', b], 0)

  // Return whatever is higher. If its a draw, return both
  if (aVotes > bVotes) {
    return [a]
  } else if (aVotes < bVotes) {
    return [b]
  } else {
    return [a,b]
  }

}

export function next(state) {
  const entries = state.get('entries')
    .concat(getWinners((state.get('vote')))) //Get the entries, and add on the winners

  // Check if there is only one entry left. If so make it the winner.
  if (entries.size === 1) {
    return state.remove('vote')
                .remove('entries')
                .set('winner', entries.first())
  }

  // Merge will overwrite the previous entries. It is a shallow (?) merge.
  return state.merge({
    vote: Map({pair: entries.take(2)}),
    entries: entries.skip(2)
  })
}

export function vote(voteState, entry) {
  // Explanation
  // From state go state.tally.<entry>
  // default to 0 if nothing is found
  // Then run the function and update that prop to the result
  // return everything
  // see https://facebook.github.io/immutable-js/docs/#/Map/updateIn & http://teropa.info/blog/2015/09/10/full-stack-redux-tutorial.html (Find: Using updateIn makes this pleasingly succinct.)
  return voteState.updateIn(
    ['tally', entry],
    0,
    (tally) => tally + 1
  )
}