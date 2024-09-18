import{c as de,j as e,I as F,d as O,r as o,P as E,n as ue,h as U,a as A,B as g,g as me,u as he,e as pe,o as fe,p as xe,l as ve,m as ge,q as je,s as H,L as T}from"./index-Dc3UHnjY.js";import{L as b}from"./label-DJMzDY3S.js";import{g as be}from"./formatting-BKpwSQEA.js";import{P as ye,a as Ne,b as we}from"./popover-C96N-1mv.js";import{B as ke,a as Ce,b as _,c as z,d as G}from"./breadcrumb-DcxVcx4h.js";import{T as Se}from"./textarea-BPLmRqeD.js";import"./index-iZcNZATG.js";/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ae=de("Trash2",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]]),Ee=({id:a,label:r,type:s,defaultValue:n,placeholder:i=null,handleChange:l})=>e.jsxs("div",{children:[e.jsx(b,{htmlFor:a,children:r}),e.jsx(F,{id:a,type:s,defaultValue:n,placeholder:i,onChange:l,className:"text-lg"})]}),S=Ee,Me=()=>e.jsxs("div",{className:"flex flex-1 flex-col items-center justify-center gap-2",children:[e.jsx("h1",{className:"text-3xl text-destructive",children:"Oops!"}),e.jsx("p",{children:"Une erreur s'est produite."})]}),Pe=Me;var V="Avatar",[Ie,Je]=O(V),[Le,D]=Ie(V),X=o.forwardRef((a,r)=>{const{__scopeAvatar:s,...n}=a,[i,l]=o.useState("idle");return e.jsx(Le,{scope:s,imageLoadingStatus:i,onImageLoadingStatusChange:l,children:e.jsx(E.span,{...n,ref:r})})});X.displayName=V;var K="AvatarImage",W=o.forwardRef((a,r)=>{const{__scopeAvatar:s,src:n,onLoadingStatusChange:i=()=>{},...l}=a,t=D(K,s),c=Re(n),u=ue(m=>{i(m),t.onImageLoadingStatusChange(m)});return U(()=>{c!=="idle"&&u(c)},[c,u]),c==="loaded"?e.jsx(E.img,{...l,ref:r,src:n}):null});W.displayName=K;var Z="AvatarFallback",J=o.forwardRef((a,r)=>{const{__scopeAvatar:s,delayMs:n,...i}=a,l=D(Z,s),[t,c]=o.useState(n===void 0);return o.useEffect(()=>{if(n!==void 0){const u=window.setTimeout(()=>c(!0),n);return()=>window.clearTimeout(u)}},[n]),t&&l.imageLoadingStatus!=="loaded"?e.jsx(E.span,{...i,ref:r}):null});J.displayName=Z;function Re(a){const[r,s]=o.useState("idle");return U(()=>{if(!a){s("error");return}let n=!0;const i=new window.Image,l=t=>()=>{n&&s(t)};return s("loading"),i.onload=l("loaded"),i.onerror=l("error"),i.src=a,()=>{n=!1}},[a]),r}var Q=X,Y=W,ee=J;const ae=o.forwardRef(({className:a,...r},s)=>e.jsx(Q,{ref:s,className:A("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",a),...r}));ae.displayName=Q.displayName;const te=o.forwardRef(({className:a,...r},s)=>e.jsx(Y,{ref:s,className:A("aspect-square h-full w-full",a),...r}));te.displayName=Y.displayName;const se=o.forwardRef(({className:a,...r},s)=>e.jsx(ee,{ref:s,className:A("flex h-full w-full items-center justify-center rounded-full bg-muted",a),...r}));se.displayName=ee.displayName;function Te({name:a,address:r,profilePicture:s,coverImage:n,rmprofile:i,rmcover:l}){const t=async c=>{try{c==="profile"&&await i(),c==="cover"&&await l()}catch(u){console.error(u)}};return e.jsxs("div",{className:"hero w-full aspect-video relative max-h-[40vh] sm:max-h-[20vh] rounded-md overflow-hidden",style:{backgroundImage:`url(${n&&n})`,backgroundSize:"cover",backgroundPosition:"center"},children:[e.jsx("div",{className:"hero-overlay bg-opacity-40"}),e.jsx("div",{className:"hero-content text-neutral-content mt-auto mr-auto",children:e.jsxs("div",{className:"flex items-center space-x-4",children:[e.jsxs(ae,{className:"w-14 h-14",children:[e.jsx(te,{src:s,className:"border-2 rounded-full border-primary-800"}),e.jsx(se,{className:"text-xl",children:a&&be(a)})]}),e.jsxs("div",{className:"ml-4",children:[e.jsx("h1",{className:"text-3xl font-semibold",children:a}),e.jsx("p",{children:r})]})]})}),e.jsx("div",{className:"absolute top-3 right-3",children:e.jsxs(ye,{children:[e.jsx(Ne,{asChild:!0,children:e.jsx(g,{variant:"destructive",children:e.jsx(Ae,{})})}),e.jsxs(we,{align:"end",className:"w-fit flex flex-col gap-2",children:[e.jsx(g,{variant:"outline",onClick:()=>t("profile"),children:"Supprimer la photo de profil"}),e.jsx(g,{variant:"outline",onClick:()=>t("cover"),children:"Supprimer la photo de couverture"})]})]})})]})}var $="Switch",[_e,Qe]=O($),[ze,Fe]=_e($),re=o.forwardRef((a,r)=>{const{__scopeSwitch:s,name:n,checked:i,defaultChecked:l,required:t,disabled:c,value:u="on",onCheckedChange:m,...y}=a,[h,f]=o.useState(null),P=me(r,p=>f(p)),N=o.useRef(!1),x=h?!!h.closest("form"):!0,[j=!1,I]=he({prop:i,defaultProp:l,onChange:m});return e.jsxs(ze,{scope:s,checked:j,disabled:c,children:[e.jsx(E.button,{type:"button",role:"switch","aria-checked":j,"aria-required":t,"data-state":ce(j),"data-disabled":c?"":void 0,disabled:c,value:u,...y,ref:P,onClick:pe(a.onClick,p=>{I(L=>!L),x&&(N.current=p.isPropagationStopped(),N.current||p.stopPropagation())})}),x&&e.jsx(Be,{control:h,bubbles:!N.current,name:n,value:u,checked:j,required:t,disabled:c,style:{transform:"translateX(-100%)"}})]})});re.displayName=$;var ne="SwitchThumb",oe=o.forwardRef((a,r)=>{const{__scopeSwitch:s,...n}=a,i=Fe(ne,s);return e.jsx(E.span,{"data-state":ce(i.checked),"data-disabled":i.disabled?"":void 0,...n,ref:r})});oe.displayName=ne;var Be=a=>{const{control:r,checked:s,bubbles:n=!0,...i}=a,l=o.useRef(null),t=fe(s),c=xe(r);return o.useEffect(()=>{const u=l.current,m=window.HTMLInputElement.prototype,h=Object.getOwnPropertyDescriptor(m,"checked").set;if(t!==s&&h){const f=new Event("click",{bubbles:n});h.call(u,s),u.dispatchEvent(f)}},[t,s,n]),e.jsx("input",{type:"checkbox","aria-hidden":!0,defaultChecked:s,...i,tabIndex:-1,ref:l,style:{...a.style,...c,position:"absolute",pointerEvents:"none",opacity:0,margin:0}})};function ce(a){return a?"checked":"unchecked"}var ie=re,Ve=oe;const B=o.forwardRef(({className:a,...r},s)=>e.jsx(ie,{className:A("peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",a),...r,ref:s,children:e.jsx(Ve,{className:A("pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0")})}));B.displayName=ie.displayName;const $e=/^(?:(?:\+|00)33\s?[1-9](?:[\s.-]?\d{2}){4}|0[1-9](?:[\s.-]?\d{2}){4})$/,qe=/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,He=/^(http(s)?:\/\/)?(www\.)?instagram.com\/[a-zA-Z0-9_.]+$/,Ge=["image/jpeg","image/jpg","image/png"];function Ye(){const[a,r]=o.useState(),[s,n]=o.useState(),[i,l]=o.useState(!0),[t,c]=o.useState(),[u,m]=o.useState(!1),[y,h]=o.useState(!1),f=ve(),P=ge(),N=je();async function x(){var d;try{const v=await f.get("/api/users");r(v.data)}catch(v){n(v),((d=v.response)==null?void 0:d.status)===401&&P("/login",{state:{from:N},replace:!0})}l(!1)}const j=async()=>{try{await f.delete("/api/users/profile",{profilePicture:null}),await x()}catch(d){console.log(d)}},I=async()=>{try{await f.delete("/api/users/cover",{coverImage:null}),await x()}catch(d){console.log(d)}};o.useEffect(()=>{x()},[]);const p=d=>{c({...t,[d.target.id]:d.target.value})},L=async d=>{var w,k,M;if(d.preventDefault(),m(!0),!Object.keys(t).some(C=>t[C]!==a[C])){c(),m(!1);return}if((w=t==null?void 0:t.contactMethods)!=null&&w.phoneNumber&&!$e.test(t.contactMethods.phoneNumber)){h("Le numéro de téléphone n'est pas valide"),m(!1);return}if((k=t==null?void 0:t.contactMethods)!=null&&k.instagram&&!He.test(t.contactMethods.instagram)){h("Le lien Instagram n'est pas valide"),m(!1);return}if((M=t==null?void 0:t.contactMethods)!=null&&M.email&&!qe.test(t.contactMethods.email)){h("L'adresse email n'est pas valide"),m(!1);return}try{await f.patch("/api/users",t),await x()}catch(C){C.response?h(C.response.data.message):h("Une erreur est survenue, veuillez réessayer plus tard")}c(),m(!1)},q=async d=>{const{id:v,files:w}=d.target;if(!Ge.includes(w[0].type))return alert("Invalid file type");const k=new FormData;k.append(v,w[0]);try{await f.post(`/api/users/${v}`,k,{headers:{"Content-Type":"multipart/form-data"}}),x()}catch(M){console.error(M)}},R=o.useRef(null),le=()=>{R.current&&(R.current.reset(),c())};return i?e.jsx(H,{className:"w-8 h-8 animate-spin flex-1"}):s?e.jsx(Pe,{errMsg:s}):e.jsxs("main",{className:"w-full max-w-screen-md mx-auto p-6 flex flex-1 flex-col gap-4",children:[e.jsx(ke,{children:e.jsxs(Ce,{children:[e.jsx(_,{children:e.jsx(z,{asChild:!0,children:e.jsx(T,{to:"/",children:"Tableau de bord"})})}),e.jsx(G,{}),e.jsx(_,{children:e.jsx(z,{asChild:!0,children:e.jsx(T,{to:"/salon",children:"Salon"})})}),e.jsx(G,{}),e.jsx(_,{children:e.jsx(z,{asChild:!0,children:e.jsx(T,{to:"/salon/informations",children:"Informations"})})})]})}),e.jsx("h1",{className:"text-3xl font-semibold",children:"Mes informations"}),e.jsx(Te,{name:a.providerName,address:a.address,profilePicture:a.profilePicture,coverImage:a.coverImage,rmprofile:j,rmcover:I}),e.jsxs("div",{className:"space-y-2 md:space-y-0 md:grid grid-cols-2 md:gap-4",children:[e.jsx(g,{asChild:!0,children:e.jsx(b,{htmlFor:"profile",className:" w-full",children:"Changer ma photo de profil"})}),e.jsx(F,{className:"hidden",type:"file",id:"profile",onChange:q}),e.jsx(g,{asChild:!0,children:e.jsx(b,{htmlFor:"cover",className:" w-full",children:"Changer ma photo de couverture"})}),e.jsx(F,{className:"hidden",type:"file",id:"cover",onChange:q})]}),e.jsxs("form",{className:"space-y-2",ref:R,children:[e.jsxs("div",{className:"space-y-2 md:space-y-0 md:grid grid-cols-2 md:gap-4 mb-8",children:[e.jsx(S,{id:"providerName",label:"Nom du salon",type:"text",defaultValue:a.providerName,handleChange:p}),e.jsx(S,{id:"address",label:"Adresse",type:"text",defaultValue:a.address,handleChange:p})]}),e.jsx("div",{className:"divider divider-start text-muted",children:"Par quels moyens vos clients peuvent vous contacter ?"}),e.jsxs("div",{className:"space-y-2 md:space-y-0 md:grid grid-cols-2 md:gap-4",children:[e.jsx(S,{id:"contactMethods.phoneNumber",label:"Téléphone du salon",type:"tel",defaultValue:a.contactMethods.phoneNumber,handleChange:p}),e.jsx(S,{id:"contactMethods.instagram",label:"Instagram",type:"text",defaultValue:a.contactMethods.instagram,placeholder:"copiez le lien de votre profil Instagram",handleChange:p}),e.jsx(S,{id:"contactMethods.email",label:"Email",type:"email",defaultValue:a.contactMethods.email,handleChange:p})]}),e.jsx("div",{className:"divider"}),e.jsxs("div",{children:[e.jsx(b,{htmlFor:"autoAccept",children:"Confirmation automatique"}),e.jsxs("div",{className:"bg-white rounded-md px-3 py-2 space-y-4",children:[e.jsxs("div",{className:"flex items-center justify-between gap-4",children:[e.jsx("p",{children:"Choisissez ou non d'accepter automatiquement les demandes de rendez-vous."}),e.jsx(B,{id:"autoAccept",checked:(t==null?void 0:t.autoAcceptAppointments)??a.autoAcceptAppointments,onCheckedChange:d=>{c({...t,autoAcceptAppointments:d})}})]}),e.jsxs("p",{className:"text-muted",children:["Si vous choisissez de ne pas accepter automatiquement les demandes de rendez-vous, elles auront le status ",e.jsx("b",{children:"En attente"})," tant que vous ne les aurez pas confirmées ou refusées."]})]})]}),e.jsxs("div",{children:[e.jsx(b,{htmlFor:"vacancyMode",className:"text-destructive",children:"Mode vacances"}),e.jsxs("div",{className:"bg-white rounded-md px-3 py-2 space-y-4",children:[e.jsxs("div",{className:"flex items-center justify-between gap-4",children:[e.jsx("p",{children:"Passez en mode vacances pour ne plus recevoir de demandes de rendez-vous."}),e.jsx(B,{id:"vacancyMode",checked:(t==null?void 0:t.isInVacancyMode)??a.isInVacancyMode,onCheckedChange:d=>{c({...t,isInVacancyMode:d})},className:"data-[state=checked]:bg-destructive"})]}),e.jsx("p",{className:"text-muted",children:"En cas de fermerture temporaire de votre salon, vous pouvez activer le mode vacances pour ne plus recevoir de demandes de rendez-vous pendant un certain temps."})]})]}),e.jsxs("div",{className:"col-span-2",children:[e.jsx(b,{htmlFor:"terms",children:"Conditions de réservation"}),e.jsx(Se,{id:"bookingTerms",type:"text",defaultValue:a.bookingTerms,onChange:p,className:"text-lg whitespace-pre-line"})]}),y&&setTimeout(()=>h(null),3e3)&&e.jsx("p",{className:"text-destructive text-sm",children:y}),t&&e.jsxs(e.Fragment,{children:[e.jsx(g,{onClick:L,disabled:u&&!0,children:u?e.jsx(H,{className:"animate-spin"}):"Enregistrer les modifications"}),e.jsx(g,{variant:"outline",className:"block",onClick:le,children:"Annuler les modifications"})]})]})]})}export{Ye as default};