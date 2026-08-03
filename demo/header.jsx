import { createSignal } from 'solid-js'

function HeaderApp ( props ) {
  const { data, setupUpdates } = props
  const [message, setMessage] = createSignal(data.greeting || 'Hello from Header!')
  const [count, setCount] = createSignal(0)

  function changeMessage ( newMsg ) {
        setMessage(newMsg)
    }

  function increment () {
        setCount(c => c + 1)
    }

  function getCount () {
        return count()
    }

  setupUpdates ({ changeMessage, increment, getCount })

  return (
    <div class="hello">
      <h3>{message()}</h3>
      <p>Count: {count()}</p>
      <button onClick={increment}>Increment</button>
    </div>
  )
}

export default HeaderApp
