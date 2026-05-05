import './Home.css'
import worldimg from '../assets/world.png'
import { About } from './About'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export const Home = (() => {
  const h1ref=useRef()
  useGSAP(()=>{
    const h1text=h1ref.current.innerText.split(" ")
    const mid=h1text.length/2
    h1ref.current.innerHTML = h1text
    .map((char, index) => {
      return `<span class="${index <= mid ? "a" : "b"}" style="display:inline-block;color:var(--pcolor);">${char}</span>`;
    })
    .join(" "); 

    const tl = gsap.timeline();

    
    tl.from("h1 .a", {
      color: 'grey',
      y: 150,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
    })
    .from("h1 .b", {
      color: 'grey',
      y: -150,
      opacity: 0,
      duration: 0.8,
      stagger: -0.15,
    }, "<") 
  
    
    .to("h1 span", {
      textShadow: "0px 0px 6px rgb(82, 81, 81)",
      duration: .8,
      repeat: -1,
      yoyo:true,
      
    },"+=0.6");

      gsap.fromTo(".home-btn", 
        { scale: 1 }, 
        { 
          scale: 1.05, 
          duration: 0.5, 
          repeat: -1, 
          yoyo: true, 
          ease: "power1.inOut" 
        }
      );

      gsap.from(".world-map", {
        scale:3,
        duration:1.2,
        ease:"power2.inOut"
      });

  })
  return (
    <div className='home'>
      <div className="main-home">
        <div className='home-text'>
          <h1 style={{overflow:"hidden"}} ref={h1ref}>Explore the World, One Country at a time.</h1> 
          <p>Discover the history, culture and beauty of every nation. Sort, search and filter through countries to find the details you need.</p>
          <Link to='/Country'><button className='home-btn'>Start Exploring</button></Link>

        </div> 
        <div className="right">
          <img className='world-map' src={worldimg} alt="world img" />
        </div>
        
      </div>
      <About></About>
    </div>
  )
})
