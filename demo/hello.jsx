import { createSignal } from 'solid-js'



function Hello ( props ) {
  const { data, setupUpdates } = props
  const [message, setMessage] = createSignal(data.greeting || 'Hello')
  const [count, setCount] = createSignal(0)


  
  function changeMessage ( newMsg ) {
        setMessage(newMsg)
    }

  function increment() {
        setCount(c => c + 1)
    }

  function getCount () {
      return count()
    }

  setupUpdates ({
            changeMessage,
            increment,
            getCount
      })



  return (
    <div class="hello">
          <h2>{message()}</h2>
          <p>Count: {count()}</p>
          <button onClick={increment}>Increment</button>
    </div>
  )
} // Hello



export default Hello


