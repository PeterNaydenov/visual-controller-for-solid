"use strict"
/**
 *  Visual Controller for Solid
 *  Controls multiple Solid apps with a single controller.
 * 
 *  History notes:
 *   - Development started on April 19th, 2026
 *   - Published on GitHub for first time: April 19th, 2026
 */



import { render, hydrate } from 'solid-js/web'
import askForPromise from 'ask-for-promise'



/**
 * Configuration options for VisualController
 * @typedef {Object} VisualControllerOptions
 * @property {Object} [dependencies] - Object with dependencies that should be available for all components
 */

/**
 * Methods exposed for external component control
 * @typedef {Object} UpdateMethods
 * @property {Function} [methodName: string] - Any method registered via setupUpdates
 */

/**
 * Props passed to Solid components
 * @typedef {Object} SolidComponentProps
 * @property {Object} dependencies - Dependencies provided during VisualController initialization
 * @property {Object} data - Data passed as second argument to publish
 * @property {Function} setupUpdates - Function to register external update methods
 */

/**
 * VisualController return object
 * @typedef {Object} VisualControllerAPI
 * @property {Function} publish - Publish a Solid app
 * @property {Function} destroy - Destroy a Solid app
 * @property {Function} getApp - Get app update methods
 * @property {Function} has - Check if app exists
 */



/**
 * Visual Controller for Solid
 * @param {VisualControllerOptions} [options] - Configuration options
 * @returns {VisualControllerAPI} - Object with methods: publish, destroy, getApp, has
 */
function VisualController ( options = {} ) {
        const { dependencies = {} } = options
        const 
                  cache = {}  /** @type {Object.<string, function>} */
                , updateInterface = {}  /** @type {Object.<string, UpdateMethods>} */
                ;

    /**
     * Publish a Solid app
     * @param {Function} component - Solid component function
     * @param {Object} [data] - Data for the Solid component
     * @param {string} id - Id of the container
     * @returns {Promise<UpdateMethods>|boolean}
     */
    function publish  (component, data = {}, id) {
                const hasKey = cache[id] ? true : false;
                let   node;
                
                if ( !component ) {
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
                            dispose = hydrate ( () => component(props), node )
                            setTimeout ( () =>  loadTask.done (), 1 )
                    }
                else {   // Start a new Solid App
                            dispose = render ( () => component(props), node )
                            setTimeout ( () =>  loadTask.done (), 1 )
                    }

                cache[id] = dispose
                loadTask.onComplete ( () => endTask.done ( updateInterface[id])   )
                return endTask.promise
            } // publish func.



    /**
     * Destroy a Solid app
     * @param {string} id - Id of the container
     * @returns {boolean}
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
     * Get app update methods
     * @param {string} id - Id of the container
     * @returns {UpdateMethods|false}
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
     * Check if app exists
     * @param {string} id - Id of the container
     * @returns {boolean}
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