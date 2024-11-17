"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});class a{constructor(t,h,e){this.container=t,this.data=h,this.options=e;const n={x:20,y:10,color:"green",cellSpacing:2,tipMonth:{value:!0,format:l=>l},tooltip:{value:!0,format:l=>`${l[1].toFixed(2)} on ${l[0]}`}};this.options={...n,...e}}getColor(t,h){switch(h){case"green":const e=[{threshold:0,color:"#ebedf0"},{threshold:1,color:"#d4f5d0"},{threshold:10,color:"#9be9a8"},{threshold:15,color:"#6dd785"},{threshold:20,color:"#40c463"},{threshold:25,color:"#30a14e"},{threshold:35,color:"#216e39"},{threshold:50,color:"#154823"}];for(let o=e.length-1;o>=0;o--)if(t>=e[o].threshold)return e[o].color;case"purple":const n=[{threshold:0,color:"#f5eef8"},{threshold:1,color:"#ebd7f1"},{threshold:10,color:"#d7bde2"},{threshold:15,color:"#b887cd"},{threshold:20,color:"#a569bd"},{threshold:25,color:"#8e44ad"},{threshold:35,color:"#6b3582"},{threshold:50,color:"#5b2c6f"}];for(let o=n.length-1;o>=0;o--)if(t>=n[o].threshold)return n[o].color;case"blue":const l=[{threshold:0,color:"#ebedf0"},{threshold:1,color:"#d0e7f9"},{threshold:10,color:"#c6e0f5"},{threshold:15,color:"#9bccf2"},{threshold:20,color:"#73b3e7"},{threshold:25,color:"#3b82f6"},{threshold:35,color:"#215bb7"},{threshold:50,color:"#174ea6"}];for(let o=l.length-1;o>=0;o--)if(t>=l[o].threshold)return l[o].color;case"orange":const i=[{threshold:0,color:"#fef5e7"},{threshold:1,color:"#fdebd0"},{threshold:10,color:"#fdd0a6"},{threshold:15,color:"#f5b041"},{threshold:20,color:"#f39c12"},{threshold:25,color:"#dc7633"},{threshold:35,color:"#b24d00"},{threshold:50,color:"#a04000"}];for(let o=i.length-1;o>=0;o--)if(t>=i[o].threshold)return i[o].color;default:return`rgb(${t*255}, ${t*255}, ${t*255})`}}paint(){const t=document.createElement("div");t.style.position="absolute",t.style.backgroundColor="rgba(0, 0, 0, 0.9)",t.style.color="white",t.style.padding="6px",t.style.borderRadius="5px",t.style.opacity="0",t.style.fontSize="smaller",t.style.transition="opacity 0.5s",t.style.pointerEvents="none",document.body.appendChild(t);const h=this.container.width.baseVal.value,e=this.container.height.baseVal.value,n=h*.01,l=e*.01;this.data.forEach((i,o)=>{let r=document.createElementNS("http://www.w3.org/2000/svg","rect");if(r.setAttribute("x",Math.floor(o/this.options.y)*(h/this.options.x)),r.setAttribute("y",o%this.options.y*(e/this.options.y)),r.setAttribute("width",h/this.options.x-this.options.cellSpacing),r.setAttribute("height",e/this.options.y-this.options.cellSpacing),r.setAttribute("fill",this.getColor(i[1],this.options.color)),r.setAttribute("rx",n),r.setAttribute("ry",l),this.container.appendChild(r),this.options.tipMonth.value){const d=i[0].split("-")[2],c=i[0].split("-")[1];if(d=="01"){const s=document.createElement("div");s.textContent=this.options.tipMonth.format(parseInt(c,10)),s.style.position="absolute",s.style.top=`${e+14}px`,s.style.left=`${Math.floor(o/this.options.y)*(h/this.options.x)+10}px`,s.style.fontSize="14px",s.style.color="rgb(174, 174, 174)",s.style.textAlign="center",s.style.pointerEvents="none",document.body.appendChild(s)}}this.options.tooltip.value&&(r.addEventListener("mouseover",d=>{t.style.opacity="1",t.textContent=this.options.tooltip.format(i);const c=r.getBoundingClientRect(),s=c.left+c.width/2-t.offsetWidth/2;t.style.left=`${s}px`,t.style.top=`${c.top-c.height*2}px`}),r.addEventListener("mouseout",()=>{t.style.opacity="0"}))})}}exports.Heatmap=a;
//# sourceMappingURL=heatmap.cjs.js.map
