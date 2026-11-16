# FreshMart – React + Tailwind + Firebase
1. `npm install` then copy `.env.example` to `.env` and fill Firebase keys, WhatsApp number (92300…), admin email.
2. Firebase Console: create project → Firestore Database + Authentication (Email/Password). Add user = admin email.
3. Firestore Rules:
```
rules_version='2';service cloud.firestore{match /databases/{d}/documents{
 function admin(){return request.auth!=null&&request.auth.token.email=='ADMIN_EMAIL_HERE';}
 match /products/{id}{allow read:if true;allow write:if admin();}
 match /orders/{id}{allow create:if true;allow get:if true;allow list,update,delete:if admin();}}}
```
4. `npm run dev` → open `/admin`, login, click "Load default products".
5. Deploy: push to GitHub → vercel.com → Import → add the same env variables → Deploy.
