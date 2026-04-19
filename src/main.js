"use strict"
/**
 *  Visual Controller for Solid
 *  Controls multiple Solid apps with a single controller.
 * 
 *  History notes:
 *   - Development started on April 19th, 2026
 *   - Published on GitHub for first time: April 19th, 2026
 *  
 */


import { render, hydrate } from 'solid-js/web'
import askForPromise from 'ask-for-promise'



/**
 * Visual Controller for Solid
 * Controls multiple Solid apps with a single controller.
 * 
 * @param {Object} dependencies - Object with dependencies that should be available for all components
 * @return {Object} - Object with methods: publish, destroy, getApp, has
 * @example
 * const html = new VisualController ({ eBus })
 * html.publish ( Test, {greeting:'Hi'}, 'app' )
 */
function VisualController ( dependencies={} ) {
        const 
                  cache = {}  // collect solid apps
                , updateInterface = {}
                ;



    /**
     * Publish a Solid app
     * @param {Function} solidFn - Solid component
     * @param {Object} data - Data for the Solid component
     * @param {string} id - Id of the container where Solid-app will live
     * @return {Promise|boolean} - Promise that will be resolved when the application is ready, or false on error
     * @example
     * const html = new VisualController ({ eBus })
     * html.publish ( Test, {greeting:'Hi'}, 'app' )
     */
    function publish  (solidFn, data, id) {
                const hasKey = cache[id] ? true : false;
                let   node;
                
                if ( !solidFn ) {
                        console.error ( `Error: Component is undefined` )
                        return false
                   }
                if ( hasKey )   destroy ( id )
                node = document.getElementById ( id )
                if ( !node ) {  
                            console.error ( `Can't find node with id: "${id}"`)
                            return false
                    }

                updateInterface[id] = {}
                let dispose;
                const
                      loadTask = askForPromise ()
                    , endTask  = askForPromise ()
                    , setupUpdates = lib =>  updateInterface[id] = lib
                    , props = { dependencies, data, setupUpdates }
                    ;

                if ( node.innerHTML.trim () ) {   // Hydrate SSR result
                            dispose = hydrate ( () => solidFn(props), node )
                            setTimeout ( () =>  loadTask.done (), 1 )
                    }
                else {   // Start a new Solid App
                            dispose = render ( () => solidFn(props), node )
                            setTimeout ( () =>  loadTask.done (), 1 )
                    }

                cache[id] = dispose
                loadTask.onComplete ( () => endTask.done ( updateInterface[id])   )
                return endTask.promise
            } // publish func.



    /**
     * Destroy a Solid app by using container name
     * @param {string} id - Id of the container where Solid-app lives
     * @return {boolean} - Returns true on success and false on failure
     * @example
     * const html = new VisualController ({ eBus })
     * html.destroy ( 'app' )
     */
    function destroy (id) {
                const htmlKeys = Object.keys(cache);
                if ( htmlKeys.includes(id) ) {                    
                        let item    = cache[id];
                        if (typeof item === 'function') item()
                        delete cache[id]
                        delete updateInterface[id]
                        return true
                    }
                else    return false
            } // destroy func.


            
    /**
     * Returns an object with update-methods for Solid-app defined by calling the `props.setupUpdates` function from within the component.
     * @param {string} id - Id of the container where Solid-app lives
     * @return {object} - Object with update-methods for Solid-app or false on failure
     * @example
     * const html = new VisualController ({ eBus })
     * const app = html.getApp ( 'app' )
     * if ( app )   app.pushPlay () // use update methods of the component
     */
    function getApp (id) {
                const item = updateInterface[id];
                if ( !item ) {  
                        console.error ( `App with id: "${id}" was not found.`)
                        return false
                    }
                return item
        } // getApp func.


    
    /**
     * Checks if app with specific "id" was published
     * @param {string} id - Id of the container where Solid-app lives
     * @return {boolean} - Returns true if app with specific id exists, false otherwise
     * @example
     * const html = new VisualController ({ eBus })
     * const has = html.has ( 'app' )
     * if ( has )   console.log ( 'App is available' )
     */
    function has ( id ) {
                return cache[id] ? true : false
        } // has func.



    return {
                  publish
                , destroy 
                , getApp  
                , has
            }
} // visualController



export default VisualController