import { createSignal } from 'solid-js'

function SidebarApp ( props ) {
  const { data, setupUpdates } = props
  const [items, setItems] = createSignal([ 'Apples', 'Oranges', 'Pears' ])
  const [filter, setFilter] = createSignal('')

  function addItem ( name ) {
        if ( name )   setItems(items => [ ...items, name ])
    }

  function removeItem ( idx ) {
        setItems(items => items.filter((_, index) => index !== idx))
    }

  function setFilterText ( text ) {
        setFilter(text)
    }

  function visible () {
        return items().filter(item => item.toLowerCase().includes(filter().toLowerCase()))
    }

  setupUpdates ({ addItem, removeItem, setFilter: setFilterText })

  return (
    <div class="sidebar">
      <h3>{data.title || 'Sidebar'}</h3>
      <input value={filter()} onInput={event => setFilterText(event.currentTarget.value)} placeholder="filter..." />
      <ul>
        {visible().map((item, idx) => (
          <li>
            {item}
            <button onClick={() => removeItem(idx)}>x</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SidebarApp
