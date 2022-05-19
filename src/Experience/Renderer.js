
import * as THREE from 'three'
import Experience from "./Experience";

export default class Renderer
{
    constructor()
    {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.stats = this.experience.stats
        this.canvas = this.experience.canvas
        this.camera = this.experience.camera

        this.setInstance()
    }
    setInstance()
    {
        this.instance = new THREE.WebGLRenderer({
            canvas: this.canvas,
            powerPreference: 'high-performance',
            antialias: true
        })
        //this.instance.physicallyCorrectLights = true
        this.instance.outputEncoding = THREE.sRGBEncoding
        // this.instance.toneMapping = THREE.CineonToneMapping
        // this.instance.toneMappingExposure = 1.75
        
        // this.instance.toneMappingExposure = 1.75
        // this.instance.setClearColor('#211d20')
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(this.sizes.pixelRatio)
        this.context = this.instance.getContext()

        if(this.stats)
        {
            this.stats.setRenderPanel(this.context)
        }

    }
    resize()
    {
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(this.sizes.pixelRatio)
    }
    update()
    {
        if(this.stats)
        {
            this.stats.beforeRender()
        }
        this.instance.render(this.scene, this.camera.instance)
        if(this.stats)
        {
            this.stats.afterRender()
        }
    }



}