
import * as THREE from 'three'
import Experience from "./Experience";
// import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
// import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
// import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
// import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

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



        // const params = {
        //     exposure: 0.5,
        //     bloomStrength: 0.5,
        //     bloomThreshold: 0.2,
        //     bloomRadius: 1.5
        // };
        // this.renderScene = new RenderPass( this.scene, this.camera.instance );
        // this.bloomPass = new UnrealBloomPass( new THREE.Vector2( this.sizes.width, this.sizes.height ), 1.5, 0.4, 0.85 );
        // this.bloomPass.threshold = params.bloomThreshold;
        // this.bloomPass.strength = params.bloomStrength;
        // this.bloomPass.radius = params.bloomRadius;

        // this.composer = new EffectComposer( this.instance );
        // this.composer.addPass( this.renderScene );
        // this.composer.addPass( this.bloomPass );

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
        // this.composer.render()
        if(this.stats)
        {
            this.stats.afterRender()
        }
    }



}