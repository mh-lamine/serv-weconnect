import{c as le,j as e,I as B,g as U,r as o,P as E,h as ue,i as D,a as M,B as j,k as me,l as pe,m as he,n as fe,o as xe,e as ve,f as ge,p as je,q as H,L as T,J as h}from"./index-Df8QKFDH.js";import{L as C,T as be}from"./textarea-BOmYoyPj.js";import{g as ye,P as Ne,a as we,b as Ce}from"./popover-CrXVkq4E.js";import{B as ke,a as Se,b as _,c as z,d as O}from"./breadcrumb-CGWzFgj9.js";import"./index-Ch0BP5pJ.js";/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ae=le("Trash2",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]]),Me=({id:a,name:r="",label:t,type:n,defaultValue:d,placeholder:l=null,handleChange:s})=>e.jsxs("div",{children:[e.jsx(C,{htmlFor:a,children:t}),e.jsx(B,{id:a,type:n,name:r,defaultValue:d,placeholder:l,onChange:s,className:"text-lg"})]}),A=Me,Ee=()=>e.jsxs("div",{className:"flex flex-1 flex-col items-center justify-center gap-2",children:[e.jsx("h1",{className:"text-3xl text-destructive",children:"Oops!"}),e.jsx("p",{children:"Une erreur s'est produite."})]}),Pe=Ee;var V="Avatar",[Ie,Je]=U(V),[Le,G]=Ie(V),X=o.forwardRef((a,r)=>{const{__scopeAvatar:t,...n}=a,[d,l]=o.useState("idle");return e.jsx(Le,{scope:t,imageLoadingStatus:d,onImageLoadingStatusChange:l,children:e.jsx(E.span,{...n,ref:r})})});X.displayName=V;var J="AvatarImage",K=o.forwardRef((a,r)=>{const{__scopeAvatar:t,src:n,onLoadingStatusChange:d=()=>{},...l}=a,s=G(J,t),c=Re(n),i=ue(f=>{d(f),s.onImageLoadingStatusChange(f)});return D(()=>{c!=="idle"&&i(c)},[c,i]),c==="loaded"?e.jsx(E.img,{...l,ref:r,src:n}):null});K.displayName=J;var W="AvatarFallback",Q=o.forwardRef((a,r)=>{const{__scopeAvatar:t,delayMs:n,...d}=a,l=G(W,t),[s,c]=o.useState(n===void 0);return o.useEffect(()=>{if(n!==void 0){const i=window.setTimeout(()=>c(!0),n);return()=>window.clearTimeout(i)}},[n]),s&&l.imageLoadingStatus!=="loaded"?e.jsx(E.span,{...d,ref:r}):null});Q.displayName=W;function Re(a){const[r,t]=o.useState("idle");return D(()=>{if(!a){t("error");return}let n=!0;const d=new window.Image,l=s=>()=>{n&&t(s)};return t("loading"),d.onload=l("loaded"),d.onerror=l("error"),d.src=a,()=>{n=!1}},[a]),r}var Y=X,Z=K,ee=Q;const ae=o.forwardRef(({className:a,...r},t)=>e.jsx(Y,{ref:t,className:M("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",a),...r}));ae.displayName=Y.displayName;const te=o.forwardRef(({className:a,...r},t)=>e.jsx(Z,{ref:t,className:M("aspect-square h-full w-full",a),...r}));te.displayName=Z.displayName;const se=o.forwardRef(({className:a,...r},t)=>e.jsx(ee,{ref:t,className:M("flex h-full w-full items-center justify-center rounded-full bg-muted",a),...r}));se.displayName=ee.displayName;function Te({name:a,address:r,profilePicture:t,coverImage:n,rmprofile:d,rmcover:l}){const s=async c=>{try{c==="profile"&&await d(),c==="cover"&&await l()}catch(i){console.error(i)}};return e.jsxs("div",{className:"hero w-full aspect-video relative max-h-[40vh] sm:max-h-[20vh] rounded-md overflow-hidden",style:{backgroundImage:`url(${n&&n})`,backgroundSize:"cover",backgroundPosition:"center"},children:[e.jsx("div",{className:"hero-overlay bg-opacity-40"}),e.jsx("div",{className:"hero-content text-neutral-content mt-auto mr-auto",children:e.jsxs("div",{className:"flex items-center space-x-4",children:[e.jsxs(ae,{className:"w-16 h-16",children:[e.jsx(te,{src:t}),e.jsx(se,{className:"text-2xl",children:a&&ye(a)})]}),e.jsxs("div",{className:"ml-4 space-y-1",children:[e.jsx("h1",{className:"text-2xl font-semibold bg-muted px-2 py-1 rounded-sm w-fit",children:a}),e.jsx("p",{className:"bg-muted px-2 py-1 rounded-sm w-fit",children:r})]})]})}),e.jsx("div",{className:"absolute top-3 right-3",children:e.jsxs(Ne,{children:[e.jsx(we,{asChild:!0,children:e.jsx(j,{variant:"destructive",children:e.jsx(Ae,{})})}),e.jsxs(Ce,{align:"end",className:"w-fit flex flex-col gap-2",children:[e.jsx(j,{variant:"outline",onClick:()=>s("profile"),children:"Supprimer la photo de profil"}),e.jsx(j,{variant:"outline",onClick:()=>s("cover"),children:"Supprimer la photo de couverture"})]})]})})]})}var $="Switch",[_e,Ke]=U($),[ze,Be]=_e($),re=o.forwardRef((a,r)=>{const{__scopeSwitch:t,name:n,checked:d,defaultChecked:l,required:s,disabled:c,value:i="on",onCheckedChange:f,...k}=a,[p,b]=o.useState(null),L=me(r,N=>b(N)),v=o.useRef(!1),P=p?!!p.closest("form"):!0,[y=!1,g]=pe({prop:d,defaultProp:l,onChange:f});return e.jsxs(ze,{scope:t,checked:y,disabled:c,children:[e.jsx(E.button,{type:"button",role:"switch","aria-checked":y,"aria-required":s,"data-state":ce(y),"data-disabled":c?"":void 0,disabled:c,value:i,...k,ref:L,onClick:he(a.onClick,N=>{g(R=>!R),P&&(v.current=N.isPropagationStopped(),v.current||N.stopPropagation())})}),P&&e.jsx(Fe,{control:p,bubbles:!v.current,name:n,value:i,checked:y,required:s,disabled:c,style:{transform:"translateX(-100%)"}})]})});re.displayName=$;var ne="SwitchThumb",oe=o.forwardRef((a,r)=>{const{__scopeSwitch:t,...n}=a,d=Be(ne,t);return e.jsx(E.span,{"data-state":ce(d.checked),"data-disabled":d.disabled?"":void 0,...n,ref:r})});oe.displayName=ne;var Fe=a=>{const{control:r,checked:t,bubbles:n=!0,...d}=a,l=o.useRef(null),s=fe(t),c=xe(r);return o.useEffect(()=>{const i=l.current,f=window.HTMLInputElement.prototype,p=Object.getOwnPropertyDescriptor(f,"checked").set;if(s!==t&&p){const b=new Event("click",{bubbles:n});p.call(i,t),i.dispatchEvent(b)}},[s,t,n]),e.jsx("input",{type:"checkbox","aria-hidden":!0,defaultChecked:t,...d,tabIndex:-1,ref:l,style:{...a.style,...c,position:"absolute",pointerEvents:"none",opacity:0,margin:0}})};function ce(a){return a?"checked":"unchecked"}var ie=re,Ve=oe;const F=o.forwardRef(({className:a,...r},t)=>e.jsx(ie,{className:M("peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",a),...r,ref:t,children:e.jsx(Ve,{className:M("pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0")})}));F.displayName=ie.displayName;const $e=/^(?:(?:\+|00)33\s?[1-9](?:[\s.-]?\d{2}){4}|0[1-9](?:[\s.-]?\d{2}){4})$/,qe=/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,He=["image/jpeg","image/jpg","image/png"];function We(){const[a,r]=o.useState(),[t,n]=o.useState(),[d,l]=o.useState(!0),[s,c]=o.useState(),[i,f]=o.useState(),[k,p]=o.useState(!1),[b,L]=o.useState(!1),v=ve(),P=ge(),y=je();async function g(){var u;try{const{data:m}=await v.get("/api/users");return r(m),m}catch(m){n(m),((u=m.response)==null?void 0:u.status)===401&&P("/login",{state:{from:y},replace:!0})}finally{l(!1)}}const N=async()=>{try{await v.delete("/api/users/profile",{profilePicture:null}),await g()}catch(u){console.log(u)}},R=async()=>{try{await v.delete("/api/users/cover",{coverImage:null}),await g()}catch(u){console.log(u)}};o.useEffect(()=>{async function u(){const m=await g();f(m.contactMethods)}u()},[]);const w=u=>{const{id:m,name:x,value:S}=u.target;if(x==="contactMethod"){f(I=>({...I,[m]:S}));return}c({...s,[m]:S})},de=async u=>{if(u.preventDefault(),p(!0),!s&&!i){p(!1),h("Aucune modification n'a été effectuée");return}if(s&&!i&&!Object.keys(s).some(x=>s[x]!==a[x])){c(),p(!1),h("Aucune modification n'a été effectuée");return}if(i&&!s&&!Object.keys(i).some(x=>i[x]!==a.contactMethods[x])){f(a.contactMethods),p(!1),h("Aucune modification n'a été effectuée");return}if(i.phoneNumber&&!$e.test(i.phoneNumber)){h.error("Le numéro de téléphone n'est pas valide"),p(!1);return}if(i.email&&!qe.test(i.email)){h.error("L'adresse email n'est pas valide"),p(!1);return}try{await v.patch("/api/users",{...s,contactMethods:i}),await g(),h("Modifications enregistrées")}catch(m){m.response?h.error(m.response.data.message):h.error("Une erreur est survenue, veuillez contacter le support")}c(),p(!1)},q=async u=>{const{id:m,files:x}=u.target;He.includes(x[0].type)||h.error("Le format du fichier n'est pas valide");const S=new FormData;S.append(m,x[0]);try{await v.post(`/api/s3/${m}`,S,{headers:{"Content-Type":"multipart/form-data"}}),g(),h.success("Photo de profil mise à jour avec succès")}catch(I){I.response.status===413?h.error("Le fichier est trop volumineux"):(console.error(I.response.data.message),h.error("Une erreur est survenue, veuillez contacter le support"))}};return d?e.jsx(H,{className:"w-8 h-8 animate-spin flex-1"}):t?e.jsx(Pe,{errMsg:t}):e.jsxs("main",{className:"w-full max-w-screen-md mx-auto p-6 flex flex-1 flex-col gap-4",children:[e.jsx(ke,{children:e.jsxs(Se,{children:[e.jsx(_,{children:e.jsx(z,{asChild:!0,children:e.jsx(T,{to:"/",children:"Tableau de bord"})})}),e.jsx(O,{}),e.jsx(_,{children:e.jsx(z,{asChild:!0,children:e.jsx(T,{to:"/salon",children:"Salon"})})}),e.jsx(O,{}),e.jsx(_,{children:e.jsx(z,{asChild:!0,children:e.jsx(T,{to:"/salon/informations",children:"Informations"})})})]})}),e.jsx("h1",{className:"text-3xl font-semibold",children:"Mes informations"}),e.jsx(Te,{name:a.providerName,address:a.address,profilePicture:a.profilePicture,coverImage:a.coverImage,rmprofile:N,rmcover:R}),e.jsxs("div",{className:"space-y-2 md:space-y-0 md:grid grid-cols-2 md:gap-4",children:[e.jsx(j,{asChild:!0,children:e.jsx(C,{htmlFor:"profile",className:" w-full",children:"Changer ma photo de profil"})}),e.jsx(B,{className:"hidden",type:"file",id:"profile",onChange:q}),e.jsx(j,{asChild:!0,children:e.jsx(C,{htmlFor:"cover",className:" w-full",children:"Changer ma photo de couverture"})}),e.jsx(B,{className:"hidden",type:"file",id:"cover",onChange:q})]}),e.jsxs("form",{className:"space-y-2",children:[e.jsxs("div",{className:"space-y-2 md:space-y-0 md:grid grid-cols-2 md:gap-4 mb-8",children:[e.jsx(A,{id:"providerName",label:"Nom du salon",type:"text",defaultValue:a.providerName,handleChange:w}),e.jsx(A,{id:"address",label:"Adresse",type:"text",defaultValue:a.address,handleChange:w})]}),e.jsx("div",{className:"divider divider-start",children:e.jsx("p",{className:"text-muted",children:"Moyens de contact"})}),e.jsxs("div",{className:"space-y-2 md:space-y-0 md:grid grid-cols-2 md:gap-4",children:[e.jsx(A,{id:"phoneNumber",name:"contactMethod",label:"Téléphone du salon",type:"tel",defaultValue:a.contactMethods.phoneNumber,handleChange:w}),e.jsx(A,{id:"instagram",name:"contactMethod",label:"Instagram",type:"text",defaultValue:a.contactMethods.instagram,placeholder:"@weconnect_off",handleChange:w}),e.jsx(A,{id:"email",name:"contactMethod",label:"Email",type:"email",defaultValue:a.contactMethods.email,handleChange:w})]}),e.jsx("div",{className:"divider"}),e.jsxs("div",{children:[e.jsx(C,{htmlFor:"autoAccept",children:"Confirmation automatique"}),e.jsxs("div",{className:"bg-white rounded-md px-3 py-2 space-y-4",children:[e.jsxs("div",{className:"flex items-center justify-between gap-4",children:[e.jsx("p",{children:"Choisissez ou non d'accepter automatiquement les demandes de rendez-vous."}),e.jsx(F,{id:"autoAccept",checked:(s==null?void 0:s.autoAcceptAppointments)??a.autoAcceptAppointments,onCheckedChange:u=>{c({...s,autoAcceptAppointments:u})}})]}),e.jsxs("p",{className:"text-muted",children:["Si vous choisissez de ne pas accepter automatiquement les demandes de rendez-vous, elles auront le status ",e.jsx("b",{children:"En attente"})," tant que vous ne les aurez pas confirmées ou refusées."]})]})]}),e.jsxs("div",{children:[e.jsx(C,{htmlFor:"vacancyMode",className:"text-destructive",children:"Mode vacances"}),e.jsxs("div",{className:"bg-white rounded-md px-3 py-2 space-y-4",children:[e.jsxs("div",{className:"flex items-center justify-between gap-4",children:[e.jsx("p",{children:"Passez en mode vacances pour ne plus recevoir de demandes de rendez-vous."}),e.jsx(F,{id:"vacancyMode",checked:(s==null?void 0:s.isInVacancyMode)??a.isInVacancyMode,onCheckedChange:u=>{c({...s,isInVacancyMode:u})},className:"data-[state=checked]:bg-destructive"})]}),e.jsx("p",{className:"text-muted",children:"En cas de fermerture temporaire de votre salon, vous pouvez activer le mode vacances pour ne plus recevoir de demandes de rendez-vous pendant un certain temps."})]})]}),e.jsxs("div",{className:"col-span-2",children:[e.jsx(C,{htmlFor:"terms",children:"Conditions de réservation"}),e.jsx(be,{id:"bookingTerms",type:"text",defaultValue:a.bookingTerms,onChange:w,className:"text-lg whitespace-pre-line"})]}),b&&setTimeout(()=>L(null),1e4)&&e.jsx("p",{className:"text-destructive text-sm",children:b}),e.jsxs("div",{className:"flex gap-2",children:[e.jsx(j,{onClick:de,disabled:k&&!0,children:k?e.jsx(H,{className:"animate-spin"}):"Enregistrer les modifications"}),e.jsx(j,{variant:"outline",type:"reset",onClick:()=>{c(),f(a.contactMethods)},children:"Annuler"})]})]})]})}export{We as default};