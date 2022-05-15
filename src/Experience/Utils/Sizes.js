import EventEmitter from "./EventEmitter"



export default class Sizes extends EventEmitter
{
    constructor()
    {
        super()

        //Setup
        this.width = window.innerWidth
        this.height = window.innerHeight
        
        this.pixelRatio = Math.min(window.devicePixelRatio, 2)
        this.setMode()
        //Resize event
        window.addEventListener('resize', ()=>
        {
            this.width = window.innerWidth
            this.height = window.innerHeight
            this.pixelRatio = Math.min(window.devicePixelRatio, 2)
            this.setMode()

            this.trigger('resize')
        })
    }
    setMode()
    {
        
        if(this.width < 700)
        {
            this.mode = 'smallScreen'
        }
        else this.mode = 'bigScreen'


    }

}

