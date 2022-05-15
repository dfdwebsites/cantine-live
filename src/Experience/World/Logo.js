import * as THREE from 'three'
import gsap from 'gsap'
import Experience from '../Experience.js'
import { MeshBasicMaterial } from 'three'

export default class Logo
{
    constructor()
    {
        this.experience = new Experience()
        this.resources = this.experience.resources
        this.debug = this.experience.debug.ui
        this.scene = this.experience.scene
        this.world = this.experience.world
        this.time = this.experience.time
        this.logic = this.experience.camera.logic
        this.goingOnTransition = true
        // Debug
        if(this.debug)
        {
            this.debugFolder = this.debug.addFolder({
                title: 'Logo',
                expanded: false
            })
        }

        this.setModel()
        this.setAnimation()
    }

    setModel()
    {
        this.model = {}

        this.model.group = new THREE.Group()
        this.model.group.position.x = 0.35
        this.model.group.position.y = 2.5
        this.model.group.position.z = -1.25
        this.scene.add(this.model.group)

        this.model.texture = this.resources.items.dfdLogo
        this.model.texture.flipY = true
        this.model.texture.encoding = THREE.sRGBEncoding

        this.model.geometry = new THREE.PlaneGeometry(1, 1, 1, 1)
        this.model.geometry.rotateY(- Math.PI)

        this.mate = new MeshBasicMaterial({wireframe:true,side:THREE.DoubleSide})
        this.linkArea = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(0.3,0.4),
            this.mate)
        
        this.linkArea.position.x = -0.22
        this.linkArea.position.y = 0.05
        this.linkArea.position.z = -0.05
        this.linkArea.name = 'link'
        this.linkArea.layers.set(2)
        this.linkArea.visible = false
        

        this.model.material = new THREE.MeshBasicMaterial({
            transparent: true,
            premultipliedAlpha: true,
            map: this.model.texture
        })

        this.exitArea = new THREE.Mesh(new THREE.PlaneBufferGeometry(5,5),this.mate)
        this.exitArea.position.z = -0.01
        this.exitArea.name = 'exitCredits'
        this.exitArea.layers.set(2)
        this.exitArea.visible = false


        this.model.mesh = new THREE.Mesh(this.model.geometry, this.model.material)
        this.model.mesh.scale.y = 0.3
        this.model.mesh.scale.x = 0.3
        this.model.group.add(this.model.mesh, this.linkArea, this.exitArea)

        // Debug
        if(this.debug)
        {
            this.debugFolder.add(
                this.linkArea.position,
                'x')
                .name('positionX')
                .min(-5)
                .max(5)
                .step(0.001)
                
            

            this.debugFolder.add(
                this.linkArea.position, 'y')
                .name('positionY')
                .min(-5)
                .max(5)
                .step(0.001)

            this.debugFolder.add(
                this.linkArea.position, 'z')
                .name('positionY')
                .min(-5)
                .max(5)
                .step(0.001)

            this.debugFolder.add(
                this.linkArea.scale,
                'x')
                .name('scaleZ')
                .min(0.001)
                .max(1)
                .step(0.001)
            this.debugFolder.add(
                this.linkArea.scale,
                'y')
                .name('scaleY')
                .min(0.001)
                .max(1)
                .step(0.001)                
        }
    }

    setAnimation()
    {
        this.animations = {}

        this.animations.z = 0
        this.animations.y = 0

        this.animations.limits = {}
        this.animations.limits.z = { min: -0.30, max: 0.38 }
        this.animations.limits.y = { min: -0.2, max: 0.18 }

        this.animations.speed = {}
        this.animations.speed.z = 0.00016
        this.animations.speed.y = 0.00006

        if(this.debug)
        {

            this.debugFolder.add(
                this.animations.limits.z, 'min')
                .name('limitZmin')
                .min(-3)
                .max(0)
                .step(0.0001)
            this.debugFolder.add(
                this.animations.limits.z, 'max')
                .name('limitZmax')
                .min(0)
                .max(3)
                .step(0.0001)
            this.debugFolder.add(
                this.animations.limits.y, 'min')
                .name('limitYmin')
                .min(-3)
                .max(0)
                .step(0.0001)
            this.debugFolder.add(
                this.animations.limits.y, 'max')
                .name('limitYmax')
                .min(0)
                .max(3)
                .step(0.0001)
            this.debugFolder.add(
                this.animations.speed, 'z')
                .name('speedz')
                .min(0)
                .max(0.001)
                .step(0.00001)
            this.debugFolder.add(
                this.animations.speed, 'y')
                .name('speedy')
                .min(0)
                .max(0.001)
                .step(0.00001)   
        }
    }

    toCenter()
    {
        this.goingOnTransition = false
        gsap.to(this.model.mesh.position, { duration: 1.5, ease: "power1.inOut",
                    x: 0,
                    y:0,
                    z:0,
                    onComplete: ()=>
                    {
                        this.goingOnTransition = true
                        if(this.logic.mode === 'credits')
                        {
                            this.changeVisibility()
                            this.experience.world.portal.changeTv()
                            this.linkArea.layers.set(1)
                            this.exitArea.layers.set(1)
                        }
                        // this.experience.world.portal.mergedVan.layers.set(1)
                    }
                })
    }
    changeVisibility()
    {
        this.model.mesh.visible = !this.model.mesh.visible
    }
    update()
    {
        this.animations.z += this.animations.speed.z * this.time.delta
        this.animations.y += this.animations.speed.y * this.time.delta

        if(this.animations.z > this.animations.limits.z.max)
        {
            this.animations.z = this.animations.limits.z.max
            this.animations.speed.z *= -1
        }
        if(this.animations.z < this.animations.limits.z.min)
        {
            this.animations.z = this.animations.limits.z.min
            this.animations.speed.z *= -1
        }
        if(this.animations.y > this.animations.limits.y.max)
        {
            this.animations.y = this.animations.limits.y.max
            this.animations.speed.y *= -1
        }
        if(this.animations.y < this.animations.limits.y.min)
        {
            this.animations.y = this.animations.limits.y.min
            this.animations.speed.y *= -1
        }
        if(this.goingOnTransition)
        {
            this.model.mesh.position.x = this.animations.z
            this.model.mesh.position.y = this.animations.y
        }
    }
}