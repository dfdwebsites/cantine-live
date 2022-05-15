import * as THREE from 'three'
import Experience from './Experience.js'
import EventEmitter from './Utils/EventEmitter.js'

export default class PreLoader extends EventEmitter
{
    constructor()
    {
        super()

        this.experience = new Experience()
        this.camera = this.experience.camera
        this.scene = this.experience.scene
        this.sounds = this.experience.sounds
        this.resources = this.experience.resources
        this.sizes = this.experience.sizes
        this.overlay = document.querySelector('.overlay')
        this.cooking = document.querySelector('#cooking')
        // this.startButton = document.querySelector('.start')  
        this.menu = document.querySelector('.menu')     



        // Progress
        this.resources.on('itemLoaded', () =>
        {
            this.progressRatio = (this.resources.loaded + 1)/ this.resources.toLoad
            
            document.getElementById("progressPercentage").innerHTML = Math.trunc(this.progressRatio * 100)
        })

        //Loaded
        this.resources.on('ready', () =>
        {

            window.setTimeout(() =>
            {
                this.cooking.classList.add('fade')
            }, 1500)

            window.setTimeout(() =>
            {
                // this.readyScreen()
                // this.startButton.click()
                this.start()
            }, 2500)
        })
    }
    
    // readyScreen()
    // {
    //     this.cooking.remove()
    //     this.startButton.style.display = "inline"
    //     this.startButton.classList.add('fadeIn')
    //     this.startButton.addEventListener("click", async () => {

    //         // Remove overlay and button
    //         this.overlay.classList.add('fade')
    //         this.startButton.classList.add('fadeOut')

    //         window.setTimeout(() =>
    //         {
    //             this.startButton.remove()
    //             this.overlay.remove()
    //         }, 2000)

    //         // // Trigger start events
    //         // this.controller = this.experience.controller
    //         // this.performance = this.experience.performance

    //         // // Move Camera
    //         this.camera.camControls.toDefault()
    //         window.setTimeout(() =>
    //         {
    //             this.menu.style.display = "inline"
    //             this.menu.classList.add('fadeIn')
    //         }, 1500)

    //         // // Required for instagram brower compatibility
    //         // this.sizes.resize()
            

    //         // Emit Event
    //         this.trigger('start')


    //     },{ once: true });
    // }
    start = async () => {
        this.cooking.remove()
        this.overlay.classList.add('fade')

        window.setTimeout(() =>
        {
            this.overlay.remove()
        }, 2000)

        this.camera.camControls.toDefault()
        window.setTimeout(() =>
        {
            this.menu.style.display = "inline"
            this.menu.classList.add('fadeIn')
        }, 1500)

        this.trigger('start')
    }

    sleep(ms) 
    {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}