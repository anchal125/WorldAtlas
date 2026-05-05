import {useRef} from 'react'
import { data } from '../data'
import { Card } from '../Components/Card'
import './About.css'
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from '@gsap/react'
gsap.registerPlugin(ScrollTrigger);
export const About = () => {
  const h2ref=useRef()
  useGSAP(()=>{
    const h2text=h2ref.current.innerText.split(" ")
    const mid=h2text.length/2
    h2ref.current.innerHTML = h2text
    .map((char, index) => {
      return `<span class="${index <= mid ? "a" : "b"}" style="display:inline-block;color:var(--pcolor);">${char}</span>`;
    })
    .join(" "); 

    const tl = gsap.timeline();

    tl.from("h2 .a", {
      color: 'grey',
      y: 150,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
    })
    
    .from("h2 .b", {
      color: 'grey',
      y: -150,
      opacity: 0,
      duration: 0.8,
      stagger: -0.15,
    }, "<")

    .to("h2 span", {
      textShadow: "0px 0px 6px rgb(82, 81, 81)",
      duration: 0.8,
      repeat: -1,
      yoyo:true,
    }, "+=0.6");

    gsap.utils.toArray(".card").forEach((card) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 100%", 
          end:"top 100%",
          scrub:2,
        },
        scale: 0,
        rotate: 180,
        x: 600,
        ease: "power2.out",
      });
    });
  })

  return (
    <div className='about'>
      <h2 ref={h2ref} style={{ overflow: "hidden" }}>Here are the Interesting Facts <br />we're proud of</h2>
      <div className="cards">
        {data.map((item,index)=>
          <Card className="about-card" key={index} item={item}/>
        )}
      </div>
    </div>
  )
}
