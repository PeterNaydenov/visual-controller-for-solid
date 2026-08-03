# Visual Controller for Solid (@peter.naydenov/visual-controller-for-solid)

![version](https://img.shields.io/github/package-json/v/PeterNaydenov/visual-controller-for-solid)
![license](https://img.shields.io/github/license/PeterNaydenov/visual-controller-for-solid)

Run multiple Solid applications on the same page from a single controller. Each app gets its own region defined by invisible markers — no DOM ids, wrapper elements, or `getElementById` calls.

## Install

```bash
npm i @peter.naydenov/visual-controller-for-solid
```

## Quick start

```js
import VisualController from '@peter.naydenov/visual-controller-for-solid'
import HeaderApp from './header.jsx'
import SidebarApp from './sidebar.jsx'

const html = new VisualController({ /* shared dependencies */ })

html.set(({ start, end }) => {
    document.querySelector('#main').append(start, end)
    return 'header'
})

html.set(({ start, end }) => {
    document.querySelector('#main').append(start, end)
    return 'sidebar'
})

html.publish('header', HeaderApp, { greeting: 'Hi!' })
html.publish('sidebar', SidebarApp, { title: 'Items' })
```

```html
<main id="main">
    <h2>Static page heading</h2>
    <!-- regions are placed by the JS above; no app wrapper elements are needed. -->
</main>
```

The callback return value becomes the region alias. Multiple regions can share one parent. Publishing an alias that already has an app destroys the old app and mounts the new one in the same region.

> **v3 — region-based API.** The previous container-id-based API is no longer used.

## Component integration

Components receive shared dependencies, input data, and `setupUpdates` through their props. Use `setupUpdates` to expose controls to the host page.

```jsx
import { createSignal } from 'solid-js'

function HeaderApp (props) {
  const { data, setupUpdates } = props
  const [message, setMessage] = createSignal(data.greeting || 'Hello')
  const [count, setCount] = createSignal(0)

  function changeMessage (value) {
    setMessage(value)
  }

  function increment () {
    setCount(value => value + 1)
  }

  setupUpdates({
    changeMessage,
    increment,
    getCount: () => count()
  })

  return (
    <div>
      <h2>{message()}</h2>
      <p>Count: {count()}</p>
      <button onClick={increment}>Increment</button>
    </div>
  )
}
```

Call exposed controls through the region alias:

```js
const app = html.getApp('header')
if (app) {
    app.changeMessage('New message content')
    app.increment()
}
```

## API

```js
  set     : 'Define a region by placing markers in the DOM'
, publish : 'Mount a Solid app into a region by alias'
, destroy : 'Unmount apps while keeping the region markers'
, getApp  : 'Return the setupUpdates interface for a published app'
, has     : 'Check whether an app is published in a region'
, isEmpty : 'Check whether a region contains no app content'
, list    : 'Return every alias registered via set'
, reset   : 'Unmount all apps, clear state, and remove markers'
```

### `html.set(fn, ...args)`

Defines a region. The callback receives `{ start, end }` marker nodes and must attach both to the DOM. Its return value is the alias.

```js
html.set(({ start, end }, locale) => {
    document.querySelector('#main').append(start, end)
    return `header-${locale}`
}, 'en')
```

### `html.publish(alias, component, data?, extraParams?)`

Mounts a Solid component into a registered region. `data` is passed to the component as `props.data`; shared dependencies are available as `props.dependencies`. The method returns a promise resolving to the object registered with `setupUpdates`, or `false` on error.

```js
await html.publish('header', HeaderApp)
await html.publish('header', HeaderApp, { greeting: 'Hi!' })
```

### `html.destroy(target?)`

Unmounts published apps and empties their ranges while keeping the markers.

```js
html.destroy('header')              // true / false
html.destroy()                      // number of apps destroyed
html.destroy(['header', 'sidebar']) // number actually destroyed
```

### `html.getApp(alias)`

Returns the control object provided through `setupUpdates`, or `false` when no app is published for the alias.

### `html.has(alias)`

Returns `true` when an app is currently published in the region, otherwise `false`.

### `html.isEmpty(alias)`

Returns whether the region contains no mounted app content. It returns `undefined` for an unknown alias.

### `html.list()`

Returns every alias registered through `set`, whether or not an app is currently published.

```js
html.list() // ['header', 'sidebar']
```

### `html.reset()`

Unmounts all apps, clears internal state, removes all markers, and unregisters all aliases. Regions must be created again with `set()` before publishing.

```js
html.reset()
```

## Other framework versions

- [Vue 3](https://github.com/PeterNaydenov/visual-controller-for-vue3)
- [React](https://github.com/PeterNaydenov/visual-controller-for-react)
- [Svelte 5](https://github.com/PeterNaydenov/visual-controller-for-svelte5)
- [Lit](https://github.com/PeterNaydenov/visual-controller-for-lit)
- [Vue 2](https://github.com/PeterNaydenov/visual-controller-for-vue)
- [Svelte 3 and 4](https://github.com/PeterNaydenov/visual-controller-for-svelte3)

## Links

- [History of changes](https://github.com/PeterNaydenov/visual-controller-for-solid/blob/master/Changelog.md)
- [License](https://github.com/PeterNaydenov/visual-controller-for-solid/blob/master/LICENSE)

## Credits

`visual-controller-for-solid` is created and supported by Peter Naydenov.

## License

`visual-controller-for-solid` is released under the [MIT license](https://github.com/PeterNaydenov/visual-controller-for-solid/blob/master/LICENSE).
