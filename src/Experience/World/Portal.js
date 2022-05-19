import Experience from "../Experience";
import * as THREE from 'three'

// import vertexShader from './shaders/sign/vertex.glsl'
// import fragmentShader from './shaders/sign/fragment.glsl'
// import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
// import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
// import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
// import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';


export default class Portal
{

    constructor()
    {
        this.experience = new Experience()
        this.time = this.experience.time
        this.scene = this.experience.scene
        this.materials = this.experience.materials
        this.resources = this.experience.resources
        this.debug = this.experience.debug
        this.logic = this.experience.rayCaster.logic
        
        if (this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('plane')
        }
        
        this.debugObj = {}
        this.debugObj.positionX = -0.079
        this.debugObj.positionY = 3.117
        this.debugObj.positionZ = 0.659

        //Setup
        //saving this so we can have access to the animations and everything we passed from blender
        
        this.resource = this.resources.items.cantineModel
        if(this.resources.items.cantineModel){
            this.setModel()
            this.setScreen()
        }
        
        
    }

    setModel()
    {
        // const ENTIRE_SCENE = 0, BLOOM_SCENE = 1;

		// const bloomLayer = new THREE.Layers();
		// bloomLayer.set( BLOOM_SCENE )
        
        //grouped meshes
        this.mergedFloor = this.resources.items.cantineModel.scene.children.find((child=> child.name === 'floor'))

        this.mergedVespa = this.resources.items.cantineModel.scene.children.find((child=> child.name === 'vespa'))
        this.mergedVespa.layers.set(1)

        this.mergedDetails = this.resources.items.cantineModel.scene.children.find((child=> child.name === 'details'))

        this.mergedVan = this.resources.items.cantineModel.scene.children.find((child)=> child.name==="cantine")
        // this.mergedVan.layers.set(2)


        //matCaps 
        this.blackMatMesh = this.resources.items.cantineModel.scene.children.find((child)=> child.name==="blackMat")

        this.carGlass = this.resources.items.cantineModel.scene.children.find((child)=> child.name==="carGlass")

        this.silverMat = this.resources.items.cantineModel.scene.children.find((child)=> child.name==="silverMat")
        
        


        //colorTextures
        this.frontLights =  this.resources.items.cantineModel.scene.children.find((child=> child.name === 'frontLights'))
        this.frontLights.material = new THREE.MeshBasicMaterial({color:'#F4F4E3'})

        this.backLights =  this.resources.items.cantineModel.scene.children.find((child=> child.name === 'backLights'))
        this.backLights.material = new THREE.MeshBasicMaterial({color:'#FF0505'})
        
        this.orangeLights =  this.resources.items.cantineModel.scene.children.find((child=> child.name === 'orangeLights'))
        this.orangeLights.material = new THREE.MeshBasicMaterial({color:'#FF7B00'})

        this.casierLight =  this.resources.items.cantineModel.scene.children.find((child=> child.name === 'casierLight'))
        this.casierLight.material = new THREE.MeshBasicMaterial({color:'#279947'})

        this.neon =  this.resources.items.cantineModel.scene.children.find((child=> child.name === 'neon'))
        this.neon.material = new THREE.MeshBasicMaterial({color:"#FF9EAD"})

        this.justWhite =  this.resources.items.cantineModel.scene.children.find((child=> child.name === 'justWhite'))
        this.justWhite.material = new THREE.MeshBasicMaterial({color:0xFFFFFF})
        console.log(this.resources.items.signModel)

        // this.signWhite =  this.resources.items.signModel.scene.children.find((child=> child.name === 'signWhite'))
        this.signWhite =  this.resources.items.signModel.scene.children.find((child=> child.name === "signLogoWhite"))
        this.signWhite.material = new THREE.MeshBasicMaterial({color:0xFFFFFF})

        //tvs

        this.tv = this.resources.items.cantineModel.scene.children.find((child)=> child.name==="tv")
        this.tv.layers.set(1)

        this.creditTvMaterials = []
        this.creditTvMaterials.push(new THREE.MeshBasicMaterial({color:0x292929}))
        this.creditTvMaterials.push(this.materials.creditsDetailsMaterial)


        this.creditTv = this.resources.items.cantineModel.scene.children.find((child=> child.name === "creditTv"))
        this.creditMode = 0
        this.creditTv.material = this.creditTvMaterials[this.creditMode]
        this.creditTv.layers.set(1)


        //imageTextures

        this.menu =  this.resources.items.cantineModel.scene.children.find((child=> child.name === 'menuCar'))
        this.menu.layers.set(1)

        this.menuSign =  this.resources.items.cantineModel.scene.children.find((child=> child.name === 'menuSign'))
        this.menuSign.layers.set(1)

        this.creditSign =  this.resources.items.cantineModel.scene.children.find((child=> child.name === 'creditSign'))
        this.creditSign.layers.set(1)

        this.deliverySign =  this.resources.items.cantineModel.scene.children.find((child=> child.name === 'deliverySign'))
        this.deliverySign.layers.set(1)

        

        
        // const params = {
        //     exposure: 1,
        //     bloomStrength: 5,
        //     bloomThreshold: 0,
        //     bloomRadius: 0,
        //     scene: 'Scene with Glow'
        // };

		// 	const renderScene = new RenderPass( this.scene, this.experience.camera );

		// 	const bloomPass = new UnrealBloomPass( new THREE.Vector2( this.experience.sizes.width, this.experience.sizes.height), 1.5, 0.4, 0.85 );
		// 	bloomPass.threshold = params.bloomThreshold;
		// 	bloomPass.strength = params.bloomStrength;
		// 	bloomPass.radius = params.bloomRadius;

        //     const parameters = {
		// 		minFilter: THREE.LinearFilter,
		// 		magFilter: THREE.LinearFilter,
		// 		format: THREE.RGBAFormat
		// 	};


		// 	const renderTarget = new THREE.WebGLRenderTarget( this.experience.sizes.width * this.experience.sizes.pixelRatio, this.experience.sizes.height * this.experience.sizes.pixelRatio, parameters );
		// 	renderTarget.texture.name = 'EffectComposer.rt1';

		// 	const bloomComposer = new EffectComposer( this.experience.renderer, renderTarget );
		// 	bloomComposer.renderToScreen = false;
		// 	bloomComposer.addPass( renderScene );
		// 	bloomComposer.addPass( bloomPass );

		// 	const finalPass = new ShaderPass(
		// 		new THREE.ShaderMaterial( {
		// 			uniforms: {
		// 				baseTexture: { value: null },
		// 				bloomTexture: { value: bloomComposer.renderTarget2.texture }
		// 			},
		// 			vertexShader: vertexShader,
		// 			fragmentShader: fragmentShader,
		// 			defines: {}
		// 		} ), 'baseTexture'
		// 	);
		// 	finalPass.needsSwap = true;

		// 	const finalComposer = new EffectComposer( this.experience.renderer );
		// 	finalComposer.addPass( renderScene );
		// 	finalComposer.addPass( finalPass );

        if(this.debug.active)
        {
            // this.debugFolder
            //     .add(pointLight.position, 'y')
            //     .min(-10)
            //     .max(10)
            //     .step(0.001)
            //     .name("y")
            // this.debugFolder
            //     .add(pointLight.position, 'z')
            //     .min(-10)
            //     .max(10)
            //     .step(0.001)
            //     .name("z")
        }



        //imageTextures
        this.menuSign.material = this.materials.menu
        
        this.creditSign.material = this.materials.credits

        this.deliverySign.material = this.materials.delivery
        
        this.menu.material = this.materials.menuCar


        //baked
        this.mergedFloor.material = this.materials.floorMaterial

        this.mergedVespa.material = this.materials.vespaMaterial

        this.mergedDetails.material = this.materials.detailsMaterial

        this.mergedVan.material = this.materials.vanMaterial

        //matCaps
        this.blackMatMesh.material = this.materials.blackMaterial

        this.carGlass.material = this.materials.blackMaterial 

        this.silverMat.material = this.materials.silverMaterial
    

        // this.resources.items.cantineModel.scene.position.y = - 2
        // this.resources.items.signModel.scene.position.y = - 2
        
        this.scene.add(this.resources.items.cantineModel.scene)
        this.scene.add(this.resources.items.signModel.scene)
        
        // this.neon.enable(BLOOM_SCENE)
        // renderBloom( true );
        // finalComposer.render();
						

    }
    changeTv()
    {
        this.creditMode++
        if (this.creditMode > 1) this.creditMode = 0
        this.creditTv.material = this.creditTvMaterials[this.creditMode]
        this.creditTv.needsUpdate= true
    }
    setScreen()
    {
        this.videoNum = 0
        this.tv.material = this.materials.videoCarousel[this.videoNum]


    }
    changeVideo(){
        this.videoNum++
        if(this.videoNum>this.materials.videoCarousel.length - 1) this.videoNum = 0
        this.tv.material = this.materials.videoCarousel[this.videoNum]
        this.tv.material.needsUpdate = true
    }

    update()
    {
    }



}