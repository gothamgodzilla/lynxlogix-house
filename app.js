const ACCESS_KEY = "house-access-v1";
function header(active) {
  const links = [["index.html","House"],["lynxlogix.html","LynxLogix"],["mangasm.html","Mangasm"],["coexist.html","Coexist"],["ganesh.html","Ganesh"],["desk.html","Desk"],["pay.html","Pay"],["contact.html","Contact"]];
  return `<div class="topbar"><div class="wrap topbar-inner"><a class="brand" href="index.html"><span class="mark"></span> LynxLogix House</a><nav>${links.map(([href,label])=>`<a class="${href===active?"active":""}" href="${href}">${label}</a>`).join("")}</nav></div></div>`;
}
function footer(){return `<footer><div class="wrap">© ${new Date().getFullYear()} Mangasm Enterprises · LynxLogix · Coexist · Ganesh.Guru · Not investment advice · No withdrawal keys on bots · Human gate required</div></footer>`;}
function mountChrome(active){const top=document.getElementById("chrome-top");const bottom=document.getElementById("chrome-bottom");if(top)top.outerHTML=header(active);if(bottom)bottom.outerHTML=footer();}
function hasAccess(){return localStorage.getItem(ACCESS_KEY)==="granted";}
function grantAccess(){localStorage.setItem(ACCESS_KEY,"granted");}
function applyLocks(){document.querySelectorAll("[data-lock]").forEach(el=>{if(!hasAccess())el.classList.add("blocked");else el.classList.remove("blocked");});}
function bindPaywall(){const form=document.getElementById("pay-form");if(!form)return;form.addEventListener("submit",e=>{e.preventDefault();const code=(form.code.value||"").trim().toUpperCase();const tier=form.tier.value;if(code==="HOUSE-KEY"||code==="FOUNDER"||tier==="preview"){grantAccess();applyLocks();document.getElementById("pay-status").textContent="Desk unlocked on this browser. Wire Stripe payment links before taking live money.";return;}document.getElementById("pay-status").textContent="Use preview code HOUSE-KEY until Stripe live links are attached.";});}
function bindContact(){const form=document.getElementById("contact-form");if(!form)return;form.addEventListener("submit",e=>{e.preventDefault();const subject=encodeURIComponent(`[House] ${form.intent.value} — ${form.name.value}`);const body=encodeURIComponent(`${form.message.value}\n\nEmail: ${form.email.value}\nIntent: ${form.intent.value}`);window.location.href=`mailto:hello@lynxlogix.net?subject=${subject}&body=${body}`;});}
document.addEventListener("DOMContentLoaded",()=>{mountChrome(document.body.dataset.page||"index.html");applyLocks();bindPaywall();bindContact();});
