var script=function(){"use strict";function l(t){return t==null||typeof t=="function"?{main:t}:t}const u=l(()=>{(function(){const t=window.location.href,i=/^https:\/\/dev\.to\/([^\/]+)\/([^\/]+)$/,c=t.match(i);if(c){const m=c[1],h=c[2],p=`https://dev.to/api/articles/${m}/${h}`;async function g(e){try{const n=await fetch("https://api.gptzero.me/v2/predict/text",{method:"POST",headers:{"Content-Type":"application/json","User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:130.0) Gecko/20100101 Firefox/130.0"},body:JSON.stringify({document:e,source:"landing",writing_stats_required:!0,sampleTextSubmitted:!1,multilingual:!0,interpretability_required:!1,checkPlagiarism:!1})});if(!n.ok)return-1;const r=(await n.json()).documents[0].completely_generated_prob||-1;return r>=0?(r*100).toFixed(2):-1}catch{return-1}}fetch(p).then(e=>e.ok?e.json():Promise.reject("Failed to fetch article data")).then(e=>{e&&e.body_markdown&&g(e.body_markdown).then(n=>{const s=`
              <button id="reaction-butt-ai_accuracy" aria-label="View ai accuracy" aria-pressed="false" class="crayons-reaction crayons-reaction--comment crayons-tooltip__activator relative" data-category="ai_accuracy">
                <span class="crayons-reaction__icon crayons-reaction__icon--borderless crayons-reaction__icon--inactive">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" color="currentColor">
                      <path d="M4 12c0-3.771 0-5.657 1.172-6.828S8.229 4 12 4s5.657 0 6.828 1.172S20 8.229 20 12s0 5.657-1.172 6.828S15.771 20 12 20s-5.657 0-6.828-1.172S4 15.771 4 12"/>
                      <path d="m7.5 15l1.842-5.526a.694.694 0 0 1 1.316 0L12.5 15m-4-2h3m4-4v6M8 2v2m8-2v2m-4-2v2M8 20v2m4-2v2m4-2v2m6-6h-2M4 8H2m2 8H2m2-4H2m20-4h-2m2 4h-2"/>
                    </g>
                  </svg>
                </span>
                <span class="crayons-reaction__icon crayons-reaction__icon--borderless crayons-reaction__icon--active">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" color="currentColor">
                      <path d="M4 12c0-3.771 0-5.657 1.172-6.828S8.229 4 12 4s5.657 0 6.828 1.172S20 8.229 20 12s0 5.657-1.172 6.828S15.771 20 12 20s-5.657 0-6.828-1.172S4 15.771 4 12"/>
                      <path d="m7.5 15l1.842-5.526a.694.694 0 0 1 1.316 0L12.5 15m-4-2h3m4-4v6M8 2v2m8-2v2m-4-2v2M8 20v2m4-2v2m4-2v2m6-6h-2M4 8H2m2 8H2m2-4H2m20-4h-2m2 4h-2"/>
                    </g>
                  </svg>
                </span>
                <span class="crayons-reaction__count" id="reaction-number-readinglist">${n}%</span>
                <span data-testid="tooltip" class="crayons-tooltip__content">
                  This much percentage written by AI
                </span>
              </button>
            `,r=document.querySelector(".crayons-article-actions__inner");if(r){const a=r.querySelector("button");a&&a.insertAdjacentHTML("afterend",s)}})}).catch(()=>{})}})()});function v(){}function o(t,...i){}const d={debug:(...t)=>o(console.debug,...t),log:(...t)=>o(console.log,...t),warn:(...t)=>o(console.warn,...t),error:(...t)=>o(console.error,...t)};return(async()=>{try{return await u.main()}catch(t){throw d.error('The unlisted script "script" crashed on startup!',t),t}})()}();
script;
