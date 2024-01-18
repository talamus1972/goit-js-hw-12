import{S as g,a as m,i as h}from"./assets/vendor-89feecc5.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function r(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerpolicy&&(s.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?s.credentials="include":t.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(t){if(t.ep)return;t.ep=!0;const s=r(t);fetch(t.href,s)}})();const b=document.querySelector(".form"),n=document.querySelector(".gallery"),w=document.querySelector(".loader"),d=document.querySelector(".load-more"),L="https://pixabay.com/api/?",p="41564235-b9b3b0b401bd21d391a887255",v={key:p,q:"",image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:20};let i=1,l="";const $=new g(".gallery a",{captionsData:"alt",captionDelay:250,close:!0,enableKeyboard:!0,docClose:!0}),y=e=>{w.style.display=e?"block":"none"},u=e=>{d.style.display=e?"block":"none"},x=e=>{const o=e.map(r=>`
      <li class="gallery-item">
        <a href=${r.largeImageURL}> 
          <img class="gallery-img" src=${r.webformatURL} alt=${r.tags}/>
        </a>
        <div class="gallery-text-box">
          <p>Likes: <span class="text-value">${r.likes}</span></p>
          <p>Views: <span class="text-value">${r.views}</span></p>
          <p>Comments: <span class="text-value">${r.comments}</span></p>
          <p>Downloads: <span class="text-value">${r.downloads}</span></p>
        </div>
      </li>
    `);n.innerHTML+=o.join(""),$.refresh()};b.addEventListener("submit",async e=>{if(e.preventDefault(),y(!0),l=encodeURIComponent(e.target.elements.search.value.trim()),l===""){console.error("Please enter a valid search query.");return}i=1,await f(l,i),e.currentTarget.reset()});d.addEventListener("click",async()=>{u(!1),i++,await f(l,i)});const S=()=>{const e=document.querySelector(".gallery-item");return e?e.getBoundingClientRect().height:0},q=()=>{const e=S();e>0&&window.scrollBy({top:e*2,behavior:"smooth"})},f=async(e,o)=>{try{const r=await m.get(`${L}q=${e}&page=${o}&per_page=${v.per_page}&key=${p}`),{hits:a,totalHits:t}=r.data;a.length===0&&o===1?(h.error({position:"topRight",messageColor:"#FFFFFF",backgroundColor:"#EF4040",titleSize:"8px",closeOnEscape:!0,message:"Sorry, there are no images matching your search query. Please try again!"}),n.innerHTML=""):a.length===0&&o>1?showEndOfResultsMessage():(o===1&&(n.innerHTML=""),x(a),t&&n.childElementCount>=t?(u(!1),showEndOfResultsMessage()):(u(!0),q()))}catch(r){console.error(r.message)}finally{y(!1)}};
//# sourceMappingURL=commonHelpers.js.map