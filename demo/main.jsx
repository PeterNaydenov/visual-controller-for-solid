import VisualController from '/src/main.js'
import Hello from '/demo/hello.jsx'

const html = new VisualController({})



html.publish ( Hello, { greeting: 'Hi from Solid!' }, 'app')
    .then ( updates => {
            console.log('App loaded with updates:', updates)
            document.getElementById ( 'hasText' ).textContent = html.has('app')
        })



document
  .getElementById ( 'updateMsg' )
  .addEventListener ( 'click', () => {
            const app = html.getApp('app')
            if (app)   app.changeMessage ( `Updated at ${new Date().toLocaleTimeString()}` )
      })



document
  .getElementById('increment')
  .addEventListener ( 'click', () => {
            const app = html.getApp('app')
            if (app) app.increment()
      })



document
  .getElementById('getCount')
  .addEventListener ( 'click', () => {
            const app = html.getApp('app')
            if (app) {
              document.getElementById('resultText').textContent = app.getCount()
            }
      })



document
  .getElementById ( 'destroy' )
  .addEventListener ( 'click', () => {
            const result = html.destroy('app')
            document.getElementById('resultText').textContent = 'Destroyed: ' + result
            document.getElementById('hasText').textContent = html.has('app')
      })