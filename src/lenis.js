import Lenis from 'lenis';
export let lenis=null;
export function initLenis(){lenis=new Lenis({duration:1.2,smoothWheel:true,anchors:true,easing:t=>Math.min(1,1.001-Math.pow(2,-10*t))});let id;const raf=t=>{lenis?.raf(t);id=requestAnimationFrame(raf)};id=requestAnimationFrame(raf);return()=>{cancelAnimationFrame(id);lenis.destroy();lenis=null}}
