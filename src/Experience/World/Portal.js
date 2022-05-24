import Experience from "../Experience";
import * as THREE from 'three'

export default class Portal
{

    constructor()
    {
        this.experience = new Experience()
        this.camera = this.experience.camera
        this.time = this.experience.time
        this.scene = this.experience.scene
        this.materials = this.experience.materials
        this.resources = this.experience.resources
        this.debug = this.experience.debug
        this.logic = this.camera.logic
        
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
            this.changingTvAnim()
        }
        
        
    }

    setModel()
    {
        //animation banner
        this.bannerFront = this.resources.items.testAnim.scene.children.find((child=> child.name === 'banner'))
        this.bannerFront.material = this.materials.bannerMat
       
        this.mixer = new THREE.AnimationMixer(this.resources.items.testAnim.scene)
        this.clips = this.resources.items.testAnim.animations
        
       
        this.clip1 = THREE.AnimationClip.findByName(this.clips, "KeyAction")
        this.action1 = this.mixer.clipAction(this.clip1)
        
        this.action1.play()
        

       
        //grouped meshes
        this.mergedFloor = this.resources.items.cantineModel.scene.children.find((child=> child.name === 'floor'))

        this.mergedVespa = this.resources.items.cantineModel.scene.children.find((child=> child.name === 'vespa'))
        this.mergedVespa.layers.set(1)

        this.mergedDetails = this.resources.items.cantineModel.scene.children.find((child=> child.name === 'details'))

        this.mergedVan = this.resources.items.cantineModel.scene.children.find((child)=> child.name==="cantine")
        


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
    

        
        this.scene.add(this.resources.items.cantineModel.scene)
        this.scene.add(this.resources.items.signModel.scene)
        this.scene.add(this.resources.items.testAnim.scene)
 

    }
    changingTvAnim()
    {
        setTimeout(()=>{
            if(this.logic.mode==='car') this.changeVideoFunc()
            this.changingTvAnim()
        },9000)
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
        if(this.logic.mode === 'car')
        {
            this.camera.camControls.toBurgers()
            this.experience.world.logo.exitArea.layers.set(1)
        }
        else if(this.logic.mode ==='burgers')
        {
           this.changeVideoFunc()
        }
    }
    changeVideoFunc()
    {
        this.videoNum++
        if(this.videoNum>this.materials.videoCarousel.length - 1) this.videoNum = 0
        this.tv.material = this.materials.videoCarousel[this.videoNum]
        this.tv.material.needsUpdate = true
    }

    update()
    {
        if(this.action1)
        this.mixer.update(this.time.delta * 0.0008)
    }



}