import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const [selected, setSelected] = useState(generateRandomInteger(anecdotes.length))
  const [votes, setVotes] = useState(new Uint8Array(anecdotes.length))

  function generateRandomInteger(max) {
    return (Math.floor(Math.random() * max))
  }

  function upVote() {
    const newVotes = [...votes]
    newVotes[selected]++
    setVotes(newVotes)
  }

  function indexOfMax(arr) {
    if (arr.length === 0) {
        return -1;
    }

    var max = arr[0];
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }

    return maxIndex;
}

  return (
    <div>
      <h1>Anectode of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>Nb of vote : {votes[selected]}</p>
      <button onClick={()=>upVote()}>Up Vote</button>
      <button onClick={() => setSelected(generateRandomInteger(anecdotes.length))}>Random Anecdote</button>
      <h1>Anectode with the most votes</h1>
      <p>{anecdotes[indexOfMax(votes)]}</p>
      <p>Nb of vote : {votes[indexOfMax(votes)]}</p>
    </div>
  )
}

export default App