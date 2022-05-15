import * as THREE from 'three'

import Experience from '../Experience.js'

export default class DeliveryInfo
{
    constructor()
    {
        this.experience = new Experience()
        this.resources = this.experience.resources
        this.materials = this.experience.materials
        this.debug = this.experience.debug.ui
        this.scene = this.experience.scene
        this.world = this.experience.world
        this.time = this.experience.time
        
        // Debug
        if(this.debug)
        {
            this.debugFolder = this.debug.addFolder({
                title: 'delivery',
                expanded: false
            })
        }

        this.setModel()
    }

    setModel()
    {
        this.telephone = new THREE.Mesh(new THREE.PlaneBufferGeometry(2,0.35), new THREE.MeshBasicMaterial({wireframe:true}))
        this.telephone.position.set(4,4.25,3.35)
        this.telephone.rotation.y = -3.86 
        this.telephone.layers.set(1)
        this.telephone.name = 'tel'
        this.telephone.visible = false
        


        this.deliveryDetails = new THREE.Mesh(new THREE.PlaneBufferGeometry(5,5), this.materials.deliveryDetailsMaterial)
        this.deliveryDetails.material.side = THREE.FrontSide
        this.deliveryDetails.position.set(2.4, 4.4, 5)
        this.deliveryDetails.rotation.y = -3.86 //-Math.PI-0.6
        // this.deliveryDetails.material.needsUpdate = true

        this.deliveryDetails.layers.set(5)
        this.scene.add(this.deliveryDetails, this.telephone)

        // Debug
        if(this.debug)
        {
            
                
                this.debugFolder
                    .add(this.telephone.position, 'x')
                    .min(-10)
                    .max(10)
                    .step(0.001)
                    .name("x")
                this.debugFolder
                    .add(this.telephone.position, 'y')
                    .min(-10)
                    .max(10)
                    .step(0.001)
                    .name("x")
                this.debugFolder
                    .add(this.telephone.position, 'z')
                    .min(-10)
                    .max(10)
                    .step(0.001)
                    .name("x")
                this.debugFolder
                    .add(this.telephone.rotation, 'x')
                    .min(-10)
                    .max(10)
                    .step(0.001)
                    .name("rotx")
                this.debugFolder
                    .add(this.telephone.rotation, 'y')
                    .min(-10)
                    .max(10)
                    .step(0.001)
                    .name("roty")
                this.debugFolder
                    .add(this.telephone.rotation, 'z')
                    .min(-10)
                    .max(10)
                    .step(0.001)
                    .name("rot")
                
                this.debugFolder
                    .add(this.telephone.scale, 'x')
                    .min(-10)
                    .max(10)
                    .step(0.001)
                    .name("scalex")
                
                this.debugFolder
                    .add(this.telephone.scale, 'y')
                    .min(-10)
                    .max(10)
                    .step(0.001)
                    .name("scale")
 
        
        }
    }

    update()
    {
    
    }
}