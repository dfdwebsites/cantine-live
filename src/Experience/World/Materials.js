import * as THREE from 'three'
import Experience from '../Experience'
// import { SubsurfaceScatteringShader } from 'three/examples/jsm/shaders/SubsurfaceScatteringShader.js';







export default class Materials
{
    constructor()
    {
        this.experience = new Experience()
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug

        



        if (this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('portal')
        }
        
        this.debugObj = {}
        this.debugObj.portalColorStart = '#000000'
        this.debugObj.portalColorEnd = '#ffffff'

        if(this.resources)
        { 
            this.setModelMaterial() 
            // this.setShadersMaterial()
        }

        // if(this.debug.active)
        // {
        //     this.debug.ui
        //     .add(this.firefliesMaterial.uniforms.uSize, 'value')
        //     .min(0)
        //     .max(500)
        //     .step(1)
        //     .name("firefliesSize")
            
        //     this.debugFolder
        //         .addColor(this.debugObj, 'portalColorStart')
        //         .onFinishChange(()=>{
        //             this.portalLightMaterial.uniforms.uColorStart.value.set(this.debugObj.portalColorStart)
        //         })
        //         .name("innerPortalColor")
            
        //     this.debugFolder
        //         .addColor(this.debugObj, 'portalColorEnd')
        //         .onFinishChange(()=>{
        //             this.portalLightMaterial.uniforms.uColorEnd.value.set(this.debugObj.portalColorEnd)
        //         })
        //         .name("outerPortalColor")
        // }


    }

    setModelMaterial()
    {
       
        // const matSilver = this.resources.items.matCapSilver

        // const matBlack = this.resources.items.matCapBlack


        const menu = this.resources.items.menuTextrure
        menu.flipY = false
        menu.encoding = THREE.sRGBEncoding

        const menuCar = this.resources.items.menuCarTextrure
        menu.flipY = false
        menu.encoding = THREE.sRGBEncoding


        const vanBaked = this.resources.items.carBaked
        vanBaked.flipY = false
        vanBaked.encoding = THREE.sRGBEncoding

        const vespaBaked = this.resources.items.vespaBaked
        vespaBaked.flipY = false
        vespaBaked.encoding = THREE.sRGBEncoding

        const floorBaked = this.resources.items.floorBaked
        floorBaked.flipY = false
        floorBaked.encoding = THREE.sRGBEncoding
        
        const detailsBaked = this.resources.items.detailsBaked
        detailsBaked.flipY = false
        detailsBaked.encoding = THREE.sRGBEncoding

        const credits = this.resources.items.creditsTextrure
        credits.flipY = false
        credits.encoding = THREE.sRGBEncoding

        const delivery = this.resources.items.deliveryTextrure
        delivery.flipY = false
        delivery.encoding = THREE.sRGBEncoding

        const creditsDetails = this.resources.items.creditsDetails
        creditsDetails.flipY = false
        creditsDetails.encoding = THREE.sRGBEncoding
        creditsDetails.repeat.set(0.90,1)
        creditsDetails.offset.set(-0.01,0)
        creditsDetails.center.set(0.5,0.5)

        const deliveryDetails = this.resources.items.deliveryDetails
        deliveryDetails.flipY = true
        deliveryDetails.encoding = THREE.sRGBEncoding
        deliveryDetails.offset.set(0,0.1)
        deliveryDetails.repeat.set(1,1)

        deliveryDetails.center.set(0.5,0.5)
        deliveryDetails.rotation= 0
        const API = {
            offsetX: 0,
            offsetY: 0,
            repeatX: 1,
            repeatY: 1,
            rotation: 0, // positive is counter-clockwise
            centerX: 0.5,
            centerY: 0.5
        };
        // function updateUvTransform() {

        //     const texture = creditsDetails

        //     if ( texture.matrixAutoUpdate === true ) {

        //         texture.offset.set( API.offsetX, API.offsetY );
        //         texture.repeat.set( API.repeatX, API.repeatY );
        //         texture.center.set( API.centerX, API.centerY );
        //         texture.rotation = API.rotation; // rotation is around [ 0.5, 0.5 ]

        //     } else {

        //         // one way...
        //         texture.matrix.setUvTransform( API.offsetX, API.offsetY, API.repeatX, API.repeatY, API.rotation, API.centerX, API.centerY );

        //         // another way...
        //         texture.matrix
        //             .identity()
        //             .translate( - API.centerX, - API.centerY )
        //             .rotate( API.rotation )					// I don't understand how rotation can preceed scale, but it seems to be required...
        //             .scale( API.repeatX, API.repeatY )
        //             .translate( API.centerX, API.centerY )
        //             .translate( API.offsetX, API.offsetY );

        //     }

        // }

        

            

        //     this.debug.ui.add( API, 'offsetX', -1.0, 1.0 ).name( 'offset.x' ).onChange( updateUvTransform );
        //     this.debug.ui.add( API, 'offsetY', -1.0, 1.0 ).name( 'offset.y' ).onChange( updateUvTransform );
        //     this.debug.ui.add( API, 'repeatX', 0.25, 2.0 ).name( 'repeat.x' ).onChange( updateUvTransform );
        //     this.debug.ui.add( API, 'repeatY', 0.00, 2.0 ).name( 'repeat.y' ).onChange( updateUvTransform );
        //     this.debug.ui.add( API, 'rotation', - 2.0, 2.0 ).step(0.001).name( 'rotation' ).onChange( updateUvTransform );
        //     this.debug.ui.add( API, 'centerX', 0.0, 1.0 ).name( 'center.x' ).onChange( updateUvTransform );
        //     this.debug.ui.add( API, 'centerY', 0.0, 1.0 ).name( 'center.y' ).onChange( updateUvTransform );

        
       
        //model material

        this.vanMaterial = new THREE.MeshBasicMaterial({
            map:vanBaked
        })
        this.floorMaterial = new THREE.MeshBasicMaterial({
            map:floorBaked,
            
        })
        this.vespaMaterial = new THREE.MeshBasicMaterial({
            map:vespaBaked
        })
        this.detailsMaterial = new THREE.MeshBasicMaterial({
            map:detailsBaked
        })
        this.deliveryDetailsMaterial = new THREE.MeshBasicMaterial({
            // color:0xFFFFFF,
            // alpha:true,
            map: deliveryDetails
        })
        this.creditsDetailsMaterial = new THREE.MeshBasicMaterial({
            map:creditsDetails
        })
        
        this.blackMaterial = new THREE.MeshMatcapMaterial({
            matcap: this.resources.items.matCapBlack,          
            flatShading: true
        })

        this.silverMaterial = new THREE.MeshMatcapMaterial({
            matcap: this.resources.items.matCapSilver,
            flatShading: true
        })

        this.menu = new THREE.MeshBasicMaterial({
            map:menu,
        })
        this.menuCar = new THREE.MeshBasicMaterial({
            map:menuCar
        })

        this.credits = new THREE.MeshBasicMaterial({
            map:credits,
        })

        this.delivery = new THREE.MeshBasicMaterial({
            map:delivery,
        })


        //testing
        this.videoCarousel = []


        this.video1 =  new THREE.MeshBasicMaterial({
            color: 0xFFFFFF,
            map: this.resources.items.burgers1
        })
        this.video2 =  new THREE.MeshBasicMaterial({
            color: 0xFFFFFF,
            map: this.resources.items.burgers2
        })
        this.video3 =  new THREE.MeshBasicMaterial({
            color: 0xFFFFFF,
            map: this.resources.items.burgers3
        })
        
        this.videoCarousel.push(this.video1)
        this.videoCarousel.push(this.video2)
        this.videoCarousel.push(this.video3)

    }
    
    // setShadersMaterial()
    // {

    //     const shader = SubsurfaceScatteringShader;
	// 	const uniforms = THREE.UniformsUtils.clone( shader.uniforms );


    //     // uniforms[ 'map' ].value = imgTexture;

	// 		uniforms[ 'diffuse' ].value = new THREE.Vector3( 1.0, 0.2, 0.2 );
	// 		uniforms[ 'shininess' ].value = 500;

	// 		// uniforms[ 'thicknessMap' ].value = thicknessTexture;
	// 		uniforms[ 'thicknessColor' ].value = new THREE.Vector3( 5.0, 0.0, 0.0 );
	// 		uniforms[ 'thicknessDistortion' ].value = 0.1;
	// 		uniforms[ 'thicknessAmbient' ].value = 5.0;
	// 		uniforms[ 'thicknessAttenuation' ].value = 5.0;
	// 		uniforms[ 'thicknessPower' ].value = 2.0;
	// 		uniforms[ 'thicknessScale' ].value = 50.0;

	// 		this.shaderMaterial = new THREE.ShaderMaterial( {
	// 			uniforms: uniforms,
	// 			vertexShader: shader.vertexShader,
	// 			fragmentShader: shader.fragmentShader,
	// 			lights: true
	// 		} );
	// 		this.shaderMaterial.extensions.derivatives = true;
    // }
}
