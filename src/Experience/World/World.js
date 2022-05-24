import Experience from "../Experience";
import DeliveryInfo from "./DeliveryInfo";
import Logo from "./Logo";
import Portal from './Portal';



export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        
       
        this.resources.on('ready', ()=>
        {
                //Setup
            this.setPortal()
            this.setLogo() 
            this.setDeliveryInfo()
            
        })
    }
    setPortal()
    {
        this.portal = new Portal()
    }
    setDeliveryInfo()
    {
        this.deliverInfo = new DeliveryInfo()
    }
    setLogo()
    {
        this.logo = new Logo()
    }
    update()
    {
        if(this.logo)
        {
            this.logo.update()
        }
        if(this.portal)
        {
            this.portal.update()
        }
    }

    


}