import {initializeApp} from 'firebase/app';import {getFirestore} from 'firebase/firestore';import {getAuth} from 'firebase/auth';
const e=import.meta.env;
const app=initializeApp({apiKey:e.VITE_API_KEY,authDomain:e.VITE_AUTH_DOMAIN,projectId:e.VITE_PROJECT_ID,appId:e.VITE_APP_ID});
export const db=getFirestore(app),auth=getAuth(app);
export const WA=e.VITE_WHATSAPP||'923001234567',ADMIN=(e.VITE_ADMIN_EMAIL||'').trim().toLowerCase();
