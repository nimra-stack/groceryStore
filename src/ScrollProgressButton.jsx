import {useEffect,useState} from 'react';import {lenis} from './lenis';
const R=21,C=2*Math.PI*R;
export default function ScrollProgressButton(){const [p,setP]=useState(0),[y,setY]=useState(0);
 useEffect(()=>{const f=()=>{const h=document.documentElement.scrollHeight-innerHeight;setY(scrollY);setP(h>0?Math.min(1,scrollY/h):0)};f();addEventListener('scroll',f,{passive:true});addEventListener('resize',f);return()=>{removeEventListener('scroll',f);removeEventListener('resize',f)}},[]);
 const show=y>150;
 return <button aria-label="Scroll to top" onClick={()=>lenis?lenis.scrollTo(0):scrollTo({top:0,behavior:'smooth'})} className={'group fixed bottom-20 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#0f3923]/90 shadow-lg shadow-black/30 backdrop-blur transition-all duration-300 hover:scale-110 active:scale-95 md:bottom-8 md:right-8 '+(show?'translate-y-0 opacity-100':'pointer-events-none translate-y-4 opacity-0')}>
 <svg viewBox="0 0 48 48" className="absolute inset-0 -rotate-90"><circle cx="24" cy="24" r={R} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="2.5"/><circle cx="24" cy="24" r={R} fill="none" stroke="#eab308" strokeWidth="2.5" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C*(1-p)} style={{transition:'stroke-dashoffset .1s linear'}}/></svg>
 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="relative h-5 w-5 text-[#eab308] transition-transform group-hover:-translate-y-0.5"><path d="M12 19V5M5 12l7-7 7 7"/></svg></button>}
