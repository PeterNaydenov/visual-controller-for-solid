# Visual Controller for Solid (@peter.naydenov/visual-controller-for-solid)

![version](https://img.shields.io/github/package-json/v/peterNaydenov/visual-controller-for-solid)
![license](https://img.shields.io/github/license/peterNaydenov/visual-controller-for-solid)



Tool for building a micro-frontends(MFE) based on Solid components - Start multiple Solid applications in the same HTML page and control them.

Install visual controller:
```
npm i @peter.naydenov/visual-controller-for-solid
```

Initialization process:
```js
// for es6 module projects:
import notice from '@peter.naydenov/notice' // event emitter by your personal choice.
import VisualController from '@peter.naydenov/visual-controller-for-solid'


let 
      eBus = notice ()
    , dependencies = { eBus }  // Provide everything that should be exposed to components 
    , html = new VisualController ( dependencies ) 
    ;
// Ready for use...
```

Let's show something on the screen:
```js
// Let's have Solid component 'Hello' with prop 'greeting'

html.publish ( Hello, {greeting:'Hi'}, 'app' )
//arguments are: ( component, props, containerID )
```

## Inside of the Components

*Note: If your component should be displayed only, that section can be skipped.*

All provided libraries during visualController initialization are available through `props.dependencies`. Use `props.setupUpdates` if you need to manipulate component from outside.

```js
function Hello (props) {
  const { dependencies, data, setupUpdates } = props
  const { eBus } = dependencies
  const [message, setMessage] = createSignal(data.greeting || 'Hello')

  setupUpdates ({   // Provides to visualContoller method 'changeMessage' 
        changeMessage (update) {
              setMessage(update)
          }
    })
}
```

The external call will look like this:

```js
html.getApp ( 'app' ).changeMessage ( 'New message content' )
```




## Visual Controller Methods
```js
  publish : 'Render Solid app in container. Associate app instance with the container.'
, getApp  : 'Returns app instance by container name'
, destroy : 'Destroy app by using container name '
, has     : 'Checks if app with specific "id" was published'
```



### VisualController.publish ()
Publish a Solid app.
```js
html.publish ( component, props, containerID )
```
- **component**: *function*. Solid component
- **props**: *object*. Solid components props
- **containerID**: *string*. Id of the container where Solid-app will live.
- **returns**: *Promise<Object>*. Update methods library if defined. Else will return an empty object;

Example:
```js
 let html = new VisualController ();
 html.publish ( Hi, { greeting: 'hi'}, 'app' )
```

Render component 'Hi' with prop 'greeting' and render it in html element with id "app".





### VisualController.getApp ()
Returns the library of functions provided from method `setupUpdates`. If Solid-app never called `setupUpdates`, result will be an empty object.

```js
 let controls = html.getApp ( containerID )
```
- **containerID**: *string*. Id of the container.

Example:
```js
let 
      id = 'videoControls'
    , controls = html.getApp ( id )
    ;
    // if app with 'id' doesn't exist -> returns false, 
    // if app exists and 'setupUpdates' was not used -> returns {}
    // in our case -> returns { changeMessage:f }
if ( !controls )   console.error ( `App for id:"${id}" is not available` )
else {
        if ( controls.changeMessage )   controls.changeMessage ('new title') 
   }
```
If visual controller(html) has a Solid app associated with this name will return it. Otherwise will return **false**.





### VisualController.has ()
Checks if app with specific "id" was published.

```js
 const has = html.has ( containerID )
```
- **containerID**: *string*. Id of the container.
- **returns**: *boolean*. Returns true if app with specific id exists, false otherwise





### VisualController.destroy ()
Will destroy Solid app associated with this container name and container will become empty. Function will return 'true' on success and 'false' on failure. 
Function will not delete content of provided container if there is no Solid app associated with it.

```js
html.destroy ( containerID )
```
- **containerID**: *string*. Id name.





### Extra

Visual Controller has versions for few other front-end frameworks:
- [Vue 3](https://github.com/PeterNaydenov/visual-controller-for-vue3)
- [React](https://github.com/PeterNaydenov/visual-controller-for-react)
- [Svelte 5](https://github.com/PeterNaydenov/visual-controller-for-svelte5)
- [Vue 2](https://github.com/PeterNaydenov/visual-controller-for-vue)
- [Svelte 3 and 4](https://github.com/PeterNaydenov/visual-controller-for-svelte3)





## Links

- [History of changes](https://github.com/PeterNaydenov/visual-controller-for-solid/blob/master/Changelog.md)
- [License](https://github.com/PeterNaydenov/visual-controller-for-solid/blob/master/LICENSE)



## Credits
'visual-controller-for-solid' is created and supported by Peter Naydenov



## License

'visual-controller-for-solid' is released under the [MIT license](https://github.com/PeterNaydenov/visual-controller-for-solid/blob/master/LICENSE)