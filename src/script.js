import './style.css'
import Experience from './Experience/Experience'
import gr from './assets/resource/Gr-flag.png'
import uk from './assets/resource/Uk-flag.png'
import logo from './assets/resource/logo.svg'

const grButton = document.querySelector('.grButton')
const ukButton = document.querySelector('.ukButton')
const greekmenu = document.querySelector('.greekMenu')
const greekInfo = document.querySelector('.greekInfo')
const ukMenu = document.querySelector('.ukMenu')
const ukInfo = document.querySelector('.ukInfo')



const grIcon = new Image()
grIcon.src = gr
const ukIcon = new Image()
ukIcon.src = uk
const logoImg = new Image()
logoImg.src = logo

grButton.appendChild(grIcon)
ukButton.appendChild(ukIcon)
document.querySelector('.logo').appendChild(logoImg)

grButton.addEventListener('click', ()=>{
    if (greekmenu.classList.contains('active')) return
    ukMenu.classList.remove('active')
    ukInfo.classList.remove('active')
    
    greekmenu.classList.add('active')
    greekInfo.classList.add('active')
   

})
ukButton.addEventListener('click', ()=>{
    if (ukMenu.classList.contains('active')) return
    greekmenu.classList.remove('active')
    greekInfo.classList.remove('active')

    ukMenu.classList.add('active')
    ukInfo.classList.add('active')
    

})




const experience = new Experience(document.querySelector('canvas.webgl'))

window.onpopstate = function ()
{
    experience.camera.logic.buttonsLocked = false
    if (window.location.hash === '#home')
    {
        
        // if(experience.camera.logic.mode==='credits')
        // {
        //     experience.world.portal.changeTv()
        //     experience.world.logo.changeVisibility()
        //     experience.world.logo.linkArea.layers.set(2)
        //     experience.world.logo.exitArea.layers.set(2)
        // }
        
        experience.camera.camControls.toDefault()
    }
    if (window.location.hash === '#menu')
    {
        
        experience.camera.camControls.toMenu()
    }
    if (window.location.hash === '#delivery')
    {
        
        experience.camera.camControls.toDelivery()
    }
    if (window.location.hash === '#credits')
    {
       
        experience.camera.camControls.toCredits()
    }
}
