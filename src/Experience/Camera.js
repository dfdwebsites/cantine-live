import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Experience from "./Experience"
import gsap from 'gsap'



export default class Camera
{
    constructor()
    {
      
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.menu = document.querySelector('.menu')
        this.back = document.querySelector('.back')
        this.menuList = document.querySelector('.menuList')
        this.backToDefault = document.querySelector('.backToDefault')
        this.canvas = this.experience.canvas
        this.debug = this.experience.debug
        this.setInstance()
        this.setLogic()
        this.setControls()
        this.setCamAngles()
        this.setTransitions()
        this.setCamControls()
       
        this.menu.addEventListener('click', ()=>
        {
            this.camControls.toMenu()
        })
        this.back.addEventListener('click', ()=>{
            this.menuList.classList.remove('block')
            this.camControls.toDefault()
        })
        this.backToDefault.addEventListener('click', ()=>
        {
            this.camControls.toDefault()
        })

        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('camera')
            
            this.positionDebugFolder = this.debugFolder.addFolder('cameraPosition')
            this.positionDebugFolder.add(this.instance.position, 'x').min(-20).max(20).step(0.1).onChange(()=>{this.controls.update() })
            this.positionDebugFolder.add(this.instance.position, 'y').min(-20).max(20).step(0.1).onChange(()=>{this.controls.update() })
            this.positionDebugFolder.add(this.instance.position, 'z').min(-20).max(20).step(0.1).onChange(()=>{this.controls.update() })

            this.targetDebugFolder = this.debugFolder.addFolder('cameraTarget')
            this.targetDebugFolder.add(this.controls.target, 'x').min(-20).max(20).step(0.1).onChange(()=>{this.controls.update() })
            this.targetDebugFolder.add(this.controls.target, 'y').min(-20).max(20).step(0.1).onChange(()=>{this.controls.update() })
            this.targetDebugFolder.add(this.controls.target, 'z').min(-20).max(20).step(0.1).onChange(()=>{this.controls.update() })

            this.cameraAngleDebug = this.debugFolder.addFolder("camangledebug")
            this.cameraAngleDebug.add(this.controls , 'minAzimuthAngle').min(-3).max(3).step(0.001)
            this.cameraAngleDebug.add(this.controls , 'maxAzimuthAngle').min(-3).max(3).step(0.001)
            this.cameraAngleDebug.add(this.controls , 'minPolarAngle').min(-3).max(3).step(0.001)
            this.cameraAngleDebug.add(this.controls , 'maxPolarAngle').min(-3).max(3).step(0.001)
            this.cameraAngleDebug.add(this.controls , 'maxDistance').min(0).max(50).step(0.001)
            this.cameraAngleDebug.add(this.controls , 'minDistance').min(0).max(50).step(0.001)
            
            this.debugFolder.add(this.controls, 'enablePan')
            this.cam = true
            this.cameraToggle = {unlockCamera:false}
            this.debugFolder
            .add(this.cameraToggle, 'unlockCamera')
            .onChange(() =>
            {
                this.cam ? this.camAngle.default() : this.camAngle.unlocked()
            })   
        }




    }

    setInstance()
    {
        this.instance = new THREE.PerspectiveCamera(
            50, 
            this.sizes.width / this.sizes.height,
            0.1,
            100
            )
        this.instance.position.x = -7.7
        this.instance.position.y = 7.4
        this.instance.position.z = -16.6
        this.instance.layers.enable(1)
        this.instance.layers.disable(5)
        this.scene.add(this.instance)
    }

    setLogic()
    {
        this.logic = {}
        this.logic.buttonsLocked = false
        this.logic.mode = 'car'
        this.logic.lockButtons = async (lockDuration) =>
        {
            this.logic.buttonsLocked = true
            await this.sleep(lockDuration)
            this.logic.buttonsLocked = false
        }
    }



    setControls()
    {
        this.controls = new OrbitControls(this.instance, this.canvas)
        this.controls.enableDamping = true
        this.controls.enablePan = false
    
        this.controls.rotateSpeed = 0.8
        this.controls.zoomSpeed = 0.8
        this.controls.maxPolarAngle = 1.34   //vertical
        this.controls.minPolarAngle = -Math.PI / 8
        this.controls.maxAzimuthAngle = Math.PI * 2   // orizontal
        // this.controls.minAzimuthAngle =
        this.controls.maxDistance = 30
        
    }

    setCamAngles()
    {
        this.camAngle = {}

        this.camAngle.unlocked = () =>
        {
            this.controls.target.x = 0
            this.controls.target.y = 0
            this.controls.target.z = 0
            this.controls.maxDistance = 30
            this.controls.minDistance = 0
            this.controls.minAzimuthAngle = 0
            this.controls.maxAzimuthAngle = Math.PI * 1.999
            this.controls.minPolarAngle = 0
            this.controls.maxPolarAngle = Math.PI
            this.cam = true
        }

        this.camAngle.default = () =>
        {
            this.controls.minDistance = 9
            this.controls.maxDistance = 26
            this.controls.minAzimuthAngle = 0 
            this.controls.maxAzimuthAngle = Math.PI *1.9999
            this.controls.minPolarAngle = 0.487
            this.controls.maxPolarAngle = 1.429
            this.cam = false
        }

    }

    setCamControls()
    {
        this.camControls = {}

        this.camControls.toDefault = async () =>
        {
            if (this.logic.buttonsLocked === false)
            {
                if(this.backToDefault.classList.contains('fadeIn'))
                {
                    this.backToDefault.classList.remove('fadeIn')
                }

                window.location.hash= '#home'
                this.instance.layers.enableAll()
                this.instance.layers.disable(5)

                if(this.logic.mode==='menu')
                {
                    if(this.menuList.classList.contains('block'))
                    {
                        this.menuList.classList.remove('block')
                    }
                }
            
                this.logic.mode = 'car'
                this.logic.lockButtons(1600)
                this.camAngle.unlocked()
                this.transitions.default(1.5)
                await this.sleep(1500)
                this.camAngle.default()
                
            }
        }

        this.camControls.toMenu = async () =>
        {
            
            if (this.logic.buttonsLocked === false && this.logic.mode === 'car' || 
                this.logic.buttonsLocked=== false && this.logic.mode ==='delivery')
            {
                this.instance.layers.disable(5)
                this.logic.mode = 'menu'
                window.location.hash = "#menu"
                this.logic.lockButtons(3100)
                this.camAngle.unlocked()
                this.transitions.menu(3)
                await this.sleep(3000)
                if(this.logic.mode==='menu')
                {this.toggleMenu()
                this.instance.layers.disableAll()
                window.pageYOffset = 0}
            }
        }

        this.camControls.toDelivery = async () =>
        {
            if (this.logic.buttonsLocked === false && this.logic.mode === 'car')
            {
                if(this.logic.mode='menu')
                {
                    if(this.menuList.classList.contains('block'))
                    {
                        this.menuList.classList.remove('block')
                    }
                }
                this.logic.mode = 'delivery'
                window.location.hash = "#delivery"
                this.logic.lockButtons(2500)
                this.camAngle.unlocked()
                this.transitions.delivery(1.5)
                await this.sleep(1500)
                this.backToDefault.classList.add('fadeIn')
                if (this.logic.mode==='delivery')this.instance.layers.enable(5)
            }
        }
        this.camControls.toCredits = async () =>
        {
            
            if (this.logic.buttonsLocked === false && this.logic.mode === 'car')
            {
                this.logic.mode = 'credits'
                window.location.hash = "#credits"
                this.logic.lockButtons(3500)
                this.camAngle.unlocked()
                this.transitions.credits(1.5)
                await this.sleep(1500)
                this.experience.world.logo.toCenter()
                this.backToDefault.classList.add('fadeIn')
            }
        }
        this.camControls.toBurgers = async () =>
        {
            
            if (this.logic.buttonsLocked === false && this.logic.mode === 'car')
            {
                this.logic.mode = 'burgers'
                window.location.hash = "#burgers"
                this.logic.lockButtons(1500)
                this.camAngle.unlocked()
                this.transitions.burgers(1.5)
                await this.sleep(1500)
                this.backToDefault.classList.add('fadeIn')
            }
        }
    }
    setTransitions()
    {
            this.transitions = {}

            /* ************
            ***  MENU  ****
            **************/
            this.transitions.menu = async (duration) =>
            {
                this.controls.enableRotate = false
                this.controls.enableZoom = false
                console.log(this.sizes.mode)

                if(this.sizes.mode === 'bigScreen'){
                    gsap.to(this.instance.position, { duration: duration / 2, ease: "power1.inOut",
                    x: 1.7,
                    y:1.8,
                    z:2.0})
                    // z:this.projectsDistance
                
                    gsap.to(this.controls.target, { duration: duration / 2, ease: "power1.inOut",
                    x: 1.7,
                    y:1.8,
                    z:0.0})
                    gsap.to(this.instance.position, {delay:duration / 2, duration: duration / 2, ease: "power1.inOut",
                    x: 1.7,
                    y:1.4,
                    z:2.0})
                    gsap.to(this.controls.target, {delay:duration / 2, duration: duration / 2, ease: "power1.inOut",
                    x: 1.7,
                    y:1.4,
                    z:0})
                    
                    // await this.sleep(1500)
                }
                else if(this.sizes.mode === 'smallScreen')
                {
                    gsap.to(this.instance.position, { duration: duration / 2, ease: "power1.inOut",
                    x: 1.7,
                    y:1.9,
                    z:2.8})
                    // z:this.projectsDistance
                
                    gsap.to(this.controls.target, { duration: duration / 2, ease: "power1.inOut",
                    x: 1.7,
                    y:1.9,
                    z:0.3})
                    gsap.to(this.instance.position, {delay:duration / 2, duration: duration / 2, ease: "power1.inOut",
                    x: 1.7,
                    y:1.5,
                    z:2.8})
                    gsap.to(this.controls.target, {delay:duration / 2, duration: duration / 2, ease: "power1.inOut",
                    x: 1.7,
                    y:1.5,
                    z:0.3})
                    
                }
            }

            /* ****************
            ***  DELIVERY  ****
            ******************/
            this.transitions.delivery = async (duration) =>
            {
                this.controls.enableRotate = false
                this.controls.enableZoom = false
                console.log(this.sizes.mode)
                if(this.sizes.mode === 'bigScreen'){
                    gsap.to(this.instance.position, { duration: duration, ease: "power1.inOut",
                    x: 8.2,
                    y:2.2,
                    z:-1})
                    
 
                    gsap.to(this.controls.target, { duration: duration, ease: "power1.inOut",
                    x: 1.4,
                    y:2.2,
                    z:6.6})
                }
                else if(this.sizes.mode === 'smallScreen')
                {
                    gsap.to(this.instance.position, { duration: duration, ease: "power1.inOut",
                    x: 8.5,
                    y:2,
                    z:-2.3})

                    gsap.to(this.controls.target, { duration: duration, ease: "power1.inOut",
                    x: 1,
                    y:2,
                    z:6.6})        
                }
              
            }
            /* ***************
            ***  CREDITS  ****
            *****************/
            this.transitions.credits = async (duration) =>
            {
                this.controls.enableRotate = false
                this.controls.enableZoom = false
                console.log(this.sizes.mode)
                if(this.sizes.mode === 'bigScreen'){
                    gsap.to(this.instance.position, { duration: duration, ease: "power1.inOut",
                    x: 0.4,
                    y:2.45,
                    z:-2.2})
              
                    gsap.to(this.controls.target, { duration: duration, ease: "power1.inOut",
                    x: 0.4,
                    y:2.45,
                    z:0})
                    
                   
                }
                else if(this.sizes.mode === 'smallScreen')
                {
                    gsap.to(this.instance.position, { duration: duration, ease: "power1.inOut",
                    x: 0.4,
                    y:2.45,
                    z:-3.7})
                
                    gsap.to(this.controls.target, { duration: duration, ease: "power1.inOut",
                    x: 0.4,
                    y:2.45,
                    z:0})

                }
            }
            this.transitions.burgers = async (duration) =>
            {
                this.controls.enableRotate = false
                this.controls.enableZoom = false
                console.log(this.sizes.mode)
                if(this.sizes.mode === 'bigScreen'){
                    gsap.to(this.instance.position, { duration: duration, ease: "power1.inOut",
                    x: -1.4,
                    y:2.8,
                    z:3})
              
                    gsap.to(this.controls.target, { duration: duration, ease: "power1.inOut",
                    x: -1.4,
                    y:2.8,
                    z:0})
                    
                   
                }
                else if(this.sizes.mode === 'smallScreen')
                {
                    gsap.to(this.instance.position, { duration: duration, ease: "power1.inOut",
                    x: -1.4,
                    y:2.8,
                    z:3.4})
              
                    gsap.to(this.controls.target, { duration: duration, ease: "power1.inOut",
                    x: -1.4,
                    y:2.8,
                    z:0})

                }
            }

            /* ***************
            ***  DEFAULT  ****
            *****************/
            this.transitions.default = async (duration) =>
            {
                this.controls.enableRotate = false
                this.controls.enableZoom = false
    
                gsap.to(this.instance.position, { duration: duration, ease: "power1.inOut",
                x: -10.4,
                y: 9.4,
                z: 22})
                
                gsap.to(this.controls.target, { duration: duration, ease: "power1.inOut",
                x: 0.,
                y: 1.4,
                z: 0})
    
                await this.sleep(1500)
                this.controls.enableRotate = true
                this.controls.enableZoom = true
            }
    }

    toggleMenu()
    {
        
        this.menuList.classList.add("block")
        this.menuList.scrollTop = this.menu.scrollHeight

    }

    sleep(ms) 
    {
        return new Promise(resolve => setTimeout(resolve, ms));
    }


    resize()
    {
        //getting called from the experience class
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }
    update()
    {
        //getting called from the experience class
        this.controls.update()
    }

}