import * as THREE from 'three'
import Sizes from "./Utils/Sizes.js"
import Time from './Utils/Time.js'
import Camera from './Camera.js'
import Renderer from './Renderer.js'
import World from './World/World.js'
import Stats from './Utils/Stats.js'
import Resources from './Utils/Resources.js'
import Debug from './Utils/Debug.js'
import sources from './sources.js'
import Materials from './World/Materials.js'
import PreLoader from './Preloader.js'
import Raycaster from './Raycaster.js'


//Create an instance of a class 
let instance = null


export default class Experience
{
    constructor(canvas)
    {
        //Check if the instance allready exists
        if(instance)
        {
            //if it does just return the instance
            return instance
        }
        
        //if not save the instance
        instance = this
        
        //Global access
        window.experience = this

        //Options
        this.canvas = canvas


        this.config = {}
        this.config.touch = false
        window.addEventListener('touchstart', () =>
        {
            this.config.touch = true
        }, { once: true })

        //Setup
        this.debug = new Debug()
        this.sizes = new Sizes()
        this.time = new Time()
        this.setStats()

        this.scene = new THREE.Scene()
        
        //send the data through a parameter
        /* this.camera = new Camera(this) */
        
        
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.resources = new Resources(sources)
        this.preloader = new PreLoader()
        this.resources.on('ready', ()=>{
            this.materials = new Materials()
            
        })
        this.world = new World()
        this.rayCaster = new Raycaster()
        //Sizes resize event
        this.sizes.on('resize', ()=>
        {
            this.resize()
        })
        
        //Time tick event 
        this.time.on('tick', ()=>
        {
            this.update()
        })
       

    }

    resize()
    {
        //instead of listening with EventEmmiter on each children we are controling the order from the experience class
        this.camera.resize()
        this.renderer.resize()
    }
    setStats()
    {
        if(this.debug.active)
        {
            this.stats = new Stats(true)
        }
    }
    

    update()
    {
        //same with the animationLoop tick function
        this.camera.update()
        this.renderer.update()
        this.world.update()
        if(this.stats)
        this.stats.update()
    }
    destroy()
    {
        this.sizes.off('resize')
        this.time.off('tick')

        //traverse the whole scene
        this.scene.traverse((child)=>
        {
            if(child instanceof THREE.Mesh)
            {
                child.geometry.dispose()
                for(const key in child.material)
                {
                    const value = child.material[key]

                    if(value && typeof value.dispose === 'function')
                    {
                        value.dispose()
                    }
                }
            }
        })
        this.camera.controls.dispose()
        this.renderer.instance.dispose()
        if(this.debug.active)
        {
            this.debug.ui.destroy()
        }
        
    }


}