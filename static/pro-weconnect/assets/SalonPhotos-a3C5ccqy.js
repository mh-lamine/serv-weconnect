import{i as p,r as i,j as s,B as u,I as f,k as h,A as m}from"./index-ojleTri1.js";import{L as x}from"./label-CvqcM_Rh.js";const g=()=>{const{auth:n}=p(),[a,l]=i.useState(null),c=async()=>{try{const{data:e}=await h.get(`/api/users/images/${n.id}`);l(e)}catch(e){console.error(e)}};i.useEffect(()=>{c()},[]);const d=async e=>{const r=e.target.files[0];if(!validFileTypes.includes(r.type))return alert("Invalid file type");const o=new FormData;o.append("profile",r);try{const t=await m.post("/api/users/file",o,{headers:{"Content-Type":"multipart/form-data"}});console.log(t.data)}catch(t){console.error(t)}};return s.jsxs("div",{children:[s.jsx(u,{asChild:!0,children:s.jsx(x,{htmlFor:"profile",children:"Upload"})}),s.jsx(f,{className:"hidden",type:"file",id:"profile",onChange:d}),s.jsx("div",{children:a==null?void 0:a.map(e=>s.jsx("img",{src:e,className:"w-10 aspect-square rounded-full"},e))})]})};export{g as default};