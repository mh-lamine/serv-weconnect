import{j as e,I as q,d as H,r,P as S,n as ue,h as D,a as C,g as me,u as pe,e as he,o as fe,p as xe,l as ve,m as ge,q as je,s as V,L as M,B as E,k as be}from"./index-ojleTri1.js";import{L as w}from"./label-CvqcM_Rh.js";import{g as Ne}from"./formatting-BKpwSQEA.js";import{B as ye,a as we,b as T,c as _,d as $}from"./breadcrumb-CzT-KePK.js";import{T as Ce}from"./textarea-Dwb6er_u.js";const Se=({id:s,label:n,type:a,defaultValue:o,handleChange:i})=>e.jsxs("div",{children:[e.jsx(w,{htmlFor:s,children:n}),e.jsx(q,{id:s,type:a,defaultValue:o,onChange:i,className:"text-lg"})]}),P=Se,ke=()=>e.jsxs("div",{className:"flex flex-1 flex-col items-center justify-center gap-2",children:[e.jsx("h1",{className:"text-3xl text-destructive",children:"Oops!"}),e.jsx("p",{children:"Une erreur s'est produite."})]}),Ae=ke;var F="Avatar",[Ee,Oe]=H(F),[Pe,G]=Ee(F),O=r.forwardRef((s,n)=>{const{__scopeAvatar:a,...o}=s,[i,d]=r.useState("idle");return e.jsx(Pe,{scope:a,imageLoadingStatus:i,onImageLoadingStatusChange:d,children:e.jsx(S.span,{...o,ref:n})})});O.displayName=F;var U="AvatarImage",X=r.forwardRef((s,n)=>{const{__scopeAvatar:a,src:o,onLoadingStatusChange:i=()=>{},...d}=s,t=G(U,a),c=Ie(o),u=ue(m=>{i(m),t.onImageLoadingStatusChange(m)});return D(()=>{c!=="idle"&&u(c)},[c,u]),c==="loaded"?e.jsx(S.img,{...d,ref:n,src:o}):null});X.displayName=U;var W="AvatarFallback",K=r.forwardRef((s,n)=>{const{__scopeAvatar:a,delayMs:o,...i}=s,d=G(W,a),[t,c]=r.useState(o===void 0);return r.useEffect(()=>{if(o!==void 0){const u=window.setTimeout(()=>c(!0),o);return()=>window.clearTimeout(u)}},[o]),t&&d.imageLoadingStatus!=="loaded"?e.jsx(S.span,{...i,ref:n}):null});K.displayName=W;function Ie(s){const[n,a]=r.useState("idle");return D(()=>{if(!s){a("error");return}let o=!0;const i=new window.Image,d=t=>()=>{o&&a(t)};return a("loading"),i.onload=d("loaded"),i.onerror=d("error"),i.src=s,()=>{o=!1}},[s]),n}var Y=O,J=X,Q=K;const Z=r.forwardRef(({className:s,...n},a)=>e.jsx(Y,{ref:a,className:C("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",s),...n}));Z.displayName=Y.displayName;const ee=r.forwardRef(({className:s,...n},a)=>e.jsx(J,{ref:a,className:C("aspect-square h-full w-full",s),...n}));ee.displayName=J.displayName;const se=r.forwardRef(({className:s,...n},a)=>e.jsx(Q,{ref:a,className:C("flex h-full w-full items-center justify-center rounded-full bg-muted",s),...n}));se.displayName=Q.displayName;function Le({name:s,address:n,profilePicture:a}){return e.jsxs("div",{className:"hero w-full aspect-video relative max-h-[40vh] sm:max-h-[20vh] rounded-md overflow-hidden",style:{backgroundImage:"url(https://images.unsplash.com/photo-1619607146034-5a05296c8f9a?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)"},children:[e.jsx("div",{className:"hero-overlay bg-opacity-40"}),e.jsx("div",{className:"hero-content text-neutral-content mt-auto mr-auto",children:e.jsxs("div",{className:"flex items-center space-x-4",children:[e.jsxs(Z,{className:"w-14 h-14",children:[e.jsx(ee,{src:a,className:"border-2 rounded-full border-primary-800"}),e.jsx(se,{className:"text-xl",children:s&&Ne(s)})]}),e.jsxs("div",{className:"ml-4",children:[e.jsx("h1",{className:"text-3xl font-semibold",children:s}),e.jsx("p",{children:n})]})]})})]})}var z="Switch",[Re,Ue]=H(z),[Me,Te]=Re(z),ae=r.forwardRef((s,n)=>{const{__scopeSwitch:a,name:o,checked:i,defaultChecked:d,required:t,disabled:c,value:u="on",onCheckedChange:m,...k}=s,[p,j]=r.useState(null),g=me(n,N=>j(N)),b=r.useRef(!1),h=p?!!p.closest("form"):!0,[f=!1,I]=pe({prop:i,defaultProp:d,onChange:m});return e.jsxs(Me,{scope:a,checked:f,disabled:c,children:[e.jsx(S.button,{type:"button",role:"switch","aria-checked":f,"aria-required":t,"data-state":ne(f),"data-disabled":c?"":void 0,disabled:c,value:u,...k,ref:g,onClick:he(s.onClick,N=>{I(A=>!A),h&&(b.current=N.isPropagationStopped(),b.current||N.stopPropagation())})}),h&&e.jsx(_e,{control:p,bubbles:!b.current,name:o,value:u,checked:f,required:t,disabled:c,style:{transform:"translateX(-100%)"}})]})});ae.displayName=z;var te="SwitchThumb",re=r.forwardRef((s,n)=>{const{__scopeSwitch:a,...o}=s,i=Te(te,a);return e.jsx(S.span,{"data-state":ne(i.checked),"data-disabled":i.disabled?"":void 0,...o,ref:n})});re.displayName=te;var _e=s=>{const{control:n,checked:a,bubbles:o=!0,...i}=s,d=r.useRef(null),t=fe(a),c=xe(n);return r.useEffect(()=>{const u=d.current,m=window.HTMLInputElement.prototype,p=Object.getOwnPropertyDescriptor(m,"checked").set;if(t!==a&&p){const j=new Event("click",{bubbles:o});p.call(u,a),u.dispatchEvent(j)}},[t,a,o]),e.jsx("input",{type:"checkbox","aria-hidden":!0,defaultChecked:a,...i,tabIndex:-1,ref:d,style:{...s.style,...c,position:"absolute",pointerEvents:"none",opacity:0,margin:0}})};function ne(s){return s?"checked":"unchecked"}var oe=ae,Be=re;const B=r.forwardRef(({className:s,...n},a)=>e.jsx(oe,{className:C("peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",s),...n,ref:a,children:e.jsx(Be,{className:C("pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0")})}));B.displayName=oe.displayName;const Fe=/^(?:(?:\+|00)33\s?[1-9](?:[\s.-]?\d{2}){4}|0[1-9](?:[\s.-]?\d{2}){4})$/,ze=/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,Ve=["image/jpeg","image/jpg","image/png"];function Xe(){const[s,n]=r.useState(),[a,o]=r.useState(),[i,d]=r.useState(!0),[t,c]=r.useState(),[u,m]=r.useState(""),[k,p]=r.useState(0),[j,g]=r.useState(!1),[b,h]=r.useState(!1),f=ve(),I=ge(),N=je();async function A(){var l;try{const x=await f.get("/api/users");n(x.data)}catch(x){o(x),((l=x.response)==null?void 0:l.status)===401&&I("/login",{state:{from:N},replace:!0})}d(!1)}const ie=async()=>{try{const{data:l}=await be.get(`/api/users/images/${s.id}`);m(l[0])}catch(l){console.error(l)}};r.useEffect(()=>{A()},[]),r.useEffect(()=>{s&&ie()},[k]);const y=l=>{c({...t,[l.target.id]:l.target.value})},ce=async l=>{if(l.preventDefault(),g(!0),!Object.keys(t).some(v=>t[v]!==s[v])){c(),g(!1);return}if(t.phoneNumber&&!Fe.test(t.phoneNumber)){h("Le numéro de téléphone n'est pas valide"),g(!1);return}if(t.email&&!ze.test(t.email)){h("L'adresse email n'est pas valide"),g(!1);return}try{await f.patch("/api/users",t),await A()}catch(v){v.response?h(v.response.data.message):h("Une erreur est survenue, veuillez réessayer plus tard")}c(),g(!1)},le=async l=>{const x=l.target.files[0];if(!Ve.includes(x.type))return alert("Invalid file type");const v=new FormData;v.append("profile",x);try{await f.post("/api/users/file",v,{headers:{"Content-Type":"multipart/form-data"}}),p(R=>R+1)}catch(R){console.error(R)}},L=r.useRef(null),de=()=>{L.current&&(L.current.reset(),c())};return i?e.jsx(V,{className:"w-8 h-8 animate-spin flex-1"}):a?e.jsx(Ae,{errMsg:a}):e.jsxs("main",{className:"w-full max-w-screen-md mx-auto p-6 flex flex-1 flex-col gap-4",children:[e.jsx(ye,{children:e.jsxs(we,{children:[e.jsx(T,{children:e.jsx(_,{asChild:!0,children:e.jsx(M,{to:"/",children:"Tableau de bord"})})}),e.jsx($,{}),e.jsx(T,{children:e.jsx(_,{asChild:!0,children:e.jsx(M,{to:"/salon",children:"Salon"})})}),e.jsx($,{}),e.jsx(T,{children:e.jsx(_,{asChild:!0,children:e.jsx(M,{to:"/salon/informations",children:"Informations"})})})]})}),e.jsx("h1",{className:"text-3xl font-semibold",children:"Mes informations"}),e.jsx(Le,{name:s.providerName,address:s.address,profilePicture:u&&u}),e.jsxs("div",{className:"space-y-2 md:space-y-0 md:grid grid-cols-2 md:gap-4",children:[e.jsx(E,{asChild:!0,children:e.jsx(w,{htmlFor:"profile",className:" w-full",children:"Changer ma photo de profil"})}),e.jsx(q,{className:"hidden",type:"file",id:"profile",onChange:le}),e.jsx(E,{className:"block w-full",children:"Changer mes photos de couverture"})]}),e.jsxs("form",{className:"space-y-2",ref:L,children:[e.jsxs("div",{className:"space-y-2 md:space-y-0 md:grid grid-cols-2 md:gap-4",children:[e.jsx(P,{id:"providerName",label:"Nom du salon",type:"text",defaultValue:s.providerName,handleChange:y}),e.jsx(P,{id:"phoneNumber",label:"Téléphone",type:"tel",defaultValue:s.phoneNumber,handleChange:y}),e.jsx(P,{id:"address",label:"Adresse",type:"text",defaultValue:s.address,handleChange:y}),e.jsx(P,{id:"email",label:"Email",type:"email",defaultValue:s.email,handleChange:y})]}),e.jsxs("div",{children:[e.jsx(w,{htmlFor:"autoAccept",children:"Confirmation automatique"}),e.jsxs("div",{className:"bg-white rounded-md px-3 py-2 space-y-4",children:[e.jsxs("div",{className:"flex items-center justify-between gap-4",children:[e.jsx("p",{children:"Choisissez ou non d'accepter automatiquement les demandes de rendez-vous."}),e.jsx(B,{id:"autoAccept",checked:(t==null?void 0:t.autoAcceptAppointments)??s.autoAcceptAppointments,onCheckedChange:l=>{c({...t,autoAcceptAppointments:l})}})]}),e.jsxs("p",{className:"text-muted",children:["Si vous choisissez de ne pas accepter automatiquement les demandes de rendez-vous, elles auront le status ",e.jsx("b",{children:"En attente"})," tant que vous ne les aurez pas confirmées ou refusées."]})]})]}),e.jsxs("div",{children:[e.jsx(w,{htmlFor:"vacancyMode",className:"text-destructive",children:"Mode vacances"}),e.jsxs("div",{className:"bg-white rounded-md px-3 py-2 space-y-4",children:[e.jsxs("div",{className:"flex items-center justify-between gap-4",children:[e.jsx("p",{children:"Passez en mode vacances pour ne plus recevoir de demandes de rendez-vous."}),e.jsx(B,{id:"vacancyMode",checked:(t==null?void 0:t.isInVacancyMode)??s.isInVacancyMode,onCheckedChange:l=>{c({...t,isInVacancyMode:l})},className:"data-[state=checked]:bg-destructive"})]}),e.jsx("p",{className:"text-muted",children:"En cas de fermerture temporaire de votre salon, vous pouvez activer le mode vacances pour ne plus recevoir de demandes de rendez-vous pendant un certain temps."})]})]}),e.jsxs("div",{className:"col-span-2",children:[e.jsx(w,{htmlFor:"terms",children:"Conditions de réservation"}),e.jsx(Ce,{id:"bookingTerms",type:"text",defaultValue:s.bookingTerms,onChange:y,className:"text-lg whitespace-pre-line"})]}),b&&setTimeout(()=>h(null),3e3)&&e.jsx("p",{className:"text-destructive text-sm",children:b}),t&&e.jsxs(e.Fragment,{children:[e.jsx(E,{onClick:ce,disabled:j&&!0,children:j?e.jsx(V,{className:"animate-spin"}):"Enregistrer les modifications"}),e.jsx(E,{variant:"outline",className:"block",onClick:de,children:"Annuler les modifications"})]})]})]})}export{Xe as default};