import { createSignal } from 'solid-js'
import './App.css'

function Hello (props) {
  const { dependencies, data, setupUpdates } = props
  const [message, setMessage] = createSignal(data.greeting || 'Hello')
  const [count, setCount] = createSignal(0)

  setupUpdates({
    changeMessage: (newMsg) => setMessage(newMsg),
    increment: () => setCount(c => c + 1),
    getCount: () => count()
  })

  return (
    <div class="hello">
      <h2>{message()}</h2>
      <p>Count: {count()}</p>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
    </div>
  )
}

function App() {
  return (
    <>
      <div id="app"></div>
      <div id="controls">
        <button id="updateMsg">Update Message</button>
        <button id="increment">Increment</button>
        <button id="getCount">Get Count</button>
      </div>
      <div id="result"></div>
    </>
  )
}

export { App, Hello }
export default App