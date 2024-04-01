import*as e from"@wordpress/interactivity";var t={d:(e,n)=>{for(var o in n)t.o(n,o)&&!t.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:n[o]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};const n=(c={getContext:()=>e.getContext,getElement:()=>e.getElement,store:()=>e.store,withScope:()=>e.withScope},i={},t.d(i,c),i),o=new CustomEvent("frame-navigates-to",{bubbles:!0}),{state:r,callbacks:s,actions:l}=(0,n.store)("design-system-frame",{state:{w:null,NF:50,rID:null,n:null,clientX:0,timer:null},actions:{_setFrame:()=>{const{ref:e}=(0,n.getElement)(),t=(0,n.getContext)();t.locked=!1;const o=e.classList.contains("wp-block-design-system-frame")?e.firstElementChild:e.parentElement;e.closest(".wp-block-design-system-frame").classList.remove("scroll-smoothing"),o.style.setProperty("--i",t.current);const{children:r}=o.firstElementChild;[...r].forEach(((e,n)=>{e.ariaCurrent=n===t.current?"step":null}))},unify:e=>e?(r.clientX=e.changedTouches?e.changedTouches[0]:e,r.clientX):r.clientX,lock:e=>{e.preventDefault();const{ref:t}=(0,n.getElement)(),o=(0,n.getContext)(),r=(0,n.withScope)((e=>{l.move(e)})),s=(0,n.withScope)((e=>{l.drag(e)}));t.onmousemove=s,t.onmouseup=r,t.onmouseleave=r,t.ontouchmove=s,t.ontouchend=r,t.ontouchcancel=r,o.x0=l.unify(e).clientX,o.locked=!0;const c=t.closest(".wp-block-design-system-frame");c.classList.add("scroll-smoothing"),c.classList.add("user-interacting")},drag:e=>{e.preventDefault();const t=(0,n.getContext)();if(!t.locked)return;const{ref:o}=(0,n.getElement)();t.tension++;const s=+((l.unify(e).clientX-t.x0)/r.w).toFixed(2),c=t.current-s;o.parentElement.style.setProperty("--i",`${c}`),(s>.8||s<-.4||t.tension>18)&&l.move(e)},move:e=>{e.preventDefault();const t=(0,n.getContext)(),{ref:o}=(0,n.getElement)();if(!t.locked)return void l._setFrame(e);t.locked=!1,t.tension=0;const s=l.unify(e).clientX-t.x0,c=Math.sign(s);let i=+(c*s/r.w).toFixed(2);const a=+(s/r.w).toFixed(2);if(t.ini=t.current-c*i,t.fin=t.current,o.onmousemove=null,o.onmouseup=null,o.onmouseleave=null,o.ontouchmove=null,o.ontouchend=null,o.ontouchcancel=null,r.n=2+Math.round(i),t.x0=null,!a)return void l._setFrame(e);let u;if(a>0)u=t.current-1,u<=0&&(u=0);else{u=t.current+1;const e=t.N-1;u>e&&(u=e)}t.current=u,l._setFrame(e)},keydown:e=>{const{keyCode:t}=e,o=(0,n.getContext)();let r,s=o.current,c=!1;switch(t){case 37:e.preventDefault(),r=o.current-1,c=r<0,s=c?0:r;break;case 39:e.preventDefault(),r=o.current+1,c=r>=o.N,s=c?o.current:r}o.current=s,o.fin=o.current,o.locked=c,l._setFrame(e)},dispatchNavigationEvent:e=>{e.preventDefault();const t=(0,n.getContext)(),{ref:r}=(0,n.getElement)();t.dot.selected=!0,t.current="index"in r.dataset?parseInt(r.dataset.index):t.current,r.dispatchEvent(o)},onNavigation:e=>{e.stopPropagation(),l._setFrame()},start:e=>{const{ref:t}=(0,n.getElement)(),o=(0,n.getContext)();o.N=t.children.length,o.ready=!0,t.parentElement.style.setProperty("--n",`${o.N}`);const{children:r}=t;[...r].forEach(((e,n)=>{e.ariaCurrent=n===o.current?"step":null,e.ariaRoleDescription="slide",e.role="tabpanel",e.id=`${t.id}-${n}`})),l.resize(e),l._setFrame()},resize:e=>{const{ref:t}=(0,n.getElement)(),o=t.closest(".wp-block-design-system-frame");o.classList.add("scroll-smoothing");const s=window.getComputedStyle(o,null);let l=o.clientWidth;l-=parseFloat(s.paddingLeft)+parseFloat(s.paddingRight),o.style.setProperty("--inner-group-max-width",`${l}px`);const{innerWidth:c}=window;r.w=c}},callbacks:{autoPlay:()=>{setInterval((0,n.withScope)((()=>{})),3e3)},size:e=>{const t=(0,n.getContext)();t.timer&&clearTimeout(t.timer),t.timer=setTimeout((0,n.withScope)((()=>{l.resize(e)})),10,e)},resetSelected:()=>{const e=(0,n.getContext)("design-system-frame");e.list.forEach((t=>t.disabled=t.index===e.current?"true":null))},bounceOut:(e,t=2.75,n=1.5)=>1-Math.pow(1-e,t)*Math.abs(Math.cos(Math.pow(e,n)*(r.n+.5)*Math.PI))}});var c,i;