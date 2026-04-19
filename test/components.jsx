import { createSignal } from 'solid-js'

export function Test(props) {
  const { dependencies, data, setupUpdates } = props
  const [text, setText] = createSignal(data.greeting || 'Hello')
  const [count, setCount] = createSignal(0)

  function setupText(newText) {
    setText(newText)
  }

  function increment() {
    setCount(c => c + 1)
  }

  function getCount() {
    return count()
  }

  setupUpdates({
    setupText,
    increment,
    getCount
  })

  return (
    <div>
      <div id="ins">{text()}</div>
      <div id="count">Count: {count()}</div>
      <button id="incBtn" onClick={increment}>Increment</button>
    </div>
  )
}

export function NoUpdates(props) {
  const { setupUpdates } = props

  setupUpdates({})

  return <div id="no-updates">No updates</div>
}