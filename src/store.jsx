import {createContext,useContext,useEffect,useState} from 'react';import {collection,doc,onSnapshot} from 'firebase/firestore';import {db,WA} from './firebase';
const C=createContext();export const useStore=()=>useContext(C);
export const money=n=>'Rs. '+Math.round(n).toLocaleString();
export const line=i=>i.price*i.w/1000*i.q;
export const wlabel=w=>w>=1000?w/1000+'kg':w+'g';
import {CATS} from './seed';
export const DEF={heroTitle:'Pure Spices. Farm-Fresh Daals.\nRoyal Dry Fruits.',heroSub:'Unpolished grains, stone-ground spices, and handpicked nuts—hygienically packed and delivered fresh to your doorstep.',banner:'',deliveryFee:200,freeFrom:2500,categories:CATS.map(name=>({name,image:''}))};
export let CFG=DEF;
export const delivery=s=>s>=CFG.freeFrom||s===0?0:CFG.deliveryFee;
export const waLink=t=>`https://wa.me/${WA}?text=${encodeURIComponent(t)}`;
export const orderMsg=o=>`🛒 *New Order ${o.orderNo}*\n👤 ${o.name}\n📞 ${o.phone}\n📍 ${o.address}, ${o.city}${o.map?'\n🗺️ '+o.map:''}\n\n`+o.items.map(i=>`• ${i.name} ${wlabel(i.w)} x${i.q} = ${money(line(i))}`).join('\n')+`\n\nDelivery: ${money(o.delivery)}\n*Total: ${money(o.total)}*\n💳 ${o.payment}`;
export function StoreProvider({children}){
 const [products,setP]=useState([]),[loading,setL]=useState(true),[cart,setCart]=useState(()=>{try{return JSON.parse(localStorage.cart||'[]')}catch{return[]}});
 const [cfg,setCfg]=useState(DEF);useEffect(()=>onSnapshot(doc(db,'settings','main'),x=>{const c={...DEF,...(x.data()||{})};if(!c.categories?.length)c.categories=DEF.categories;CFG=c;setCfg(c)},()=>{}),[]);
 useEffect(()=>onSnapshot(collection(db,'products'),s=>{setP(s.docs.map(d=>({id:d.id,...d.data()})));setL(false)},()=>setL(false)),[]);
 useEffect(()=>{localStorage.cart=JSON.stringify(cart)},[cart]);
 const add=(p,w,q=1)=>setCart(c=>{const k=c.find(i=>i.id===p.id&&i.w===w);return k?c.map(i=>i===k?{...i,q:i.q+q}:i):[...c,{id:p.id,name:p.name,image:p.images?.[0]||'',price:p.price,w,q}]});
 const upd=(id,w,q)=>setCart(c=>c.map(i=>i.id===id&&i.w===w?{...i,q:Math.max(1,q)}:i));
 const del=(id,w)=>setCart(c=>c.filter(i=>!(i.id===id&&i.w===w)));
 const sub=cart.reduce((s,i)=>s+line(i),0);
 return <C.Provider value={{cfg,products,loading,cart,add,upd,del,sub,clear:()=>setCart([])}}>{children}</C.Provider>}
