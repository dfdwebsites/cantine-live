import * as THREE from 'three'
import Experience from '../Experience'
import vertexShader from './shaders/videoText/vertex.glsl'
import fragmentShader from './shaders/videoText/fragment.glsl'


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
        }


    }

    setModelMaterial()
    {
    
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

       
        const banner = this.resources.items.bannerTexture
        banner.encoding = THREE.sRGBEncoding


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

        this.bannerMat = new THREE.MeshBasicMaterial( { map: banner, side: THREE.DoubleSide } );

     
        this.videoCarousel = []

        this.video1 = this.getChromaKeyShaderMaterial(this.resources.items.burgers1, new THREE.Color("rgb(0, 0, 255)"))
        this.video2 = this.getChromaKeyShaderMaterial(this.resources.items.burgers2, new THREE.Color("rgb(0, 0, 255)"))
        this.video3 = this.getChromaKeyShaderMaterial(this.resources.items.burgers3, new THREE.Color("rgb(0, 0, 255)"))
        this.video4 = this.getChromaKeyShaderMaterial(this.resources.items.burgers4, new THREE.Color("rgb(0, 0, 255)"))
        this.video5 = this.getChromaKeyShaderMaterial(this.resources.items.burgers5, new THREE.Color("rgb(0, 0, 255)"))
        for ( let i = 0; i < Object.keys(this.resources.video).length; i ++ ) {
            this.resources.video[Object.keys(this.resources.video)[i]].play()
        }
        
        
        this.videoCarousel.push(this.video1)
        this.videoCarousel.push(this.video2)
        this.videoCarousel.push(this.video3)
        this.videoCarousel.push(this.video4)
        this.videoCarousel.push(this.video5)

    }
    getChromaKeyShaderMaterial(texture, color) {
        return new THREE.ShaderMaterial({
          transparent: true,
          uniforms: {
            map: {
              value: texture
            },
            keyColor: {
              value: color.toArray()
            },
            similarity: {
              value: 0.01
            },
            smoothness: {
              value: 0.0
            }
          },
          vertexShader: vertexShader,
          fragmentShader: fragmentShader
        });
      }
     
    
}
