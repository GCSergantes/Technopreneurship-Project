const ADMIN_PRODUCTS=[
["Classic Banana Turon",25],["Langka Turon",30],["Ube Cheese Turon",35],["Choco Banana Turon",35],["Turon Trio",70],["Turon Party Box",220]
];
const moneyAdmin=n=>new Intl.NumberFormat("en-PH",{style:"currency",currency:"PHP"}).format(n);
function getOrders(){try{return JSON.parse(localStorage.getItem("turonOrders"))||[]}catch{return[]}}
function saveOrders(orders){localStorage.setItem("turonOrders",JSON.stringify(orders))}
function renderDashboard(){
 const orders=getOrders();
 document.getElementById("totalOrders").textContent=orders.length;
 document.getElementById("totalSales").textContent=moneyAdmin(orders.reduce((s,o)=>s+Number(o.total||0),0));
 document.getElementById("pendingOrders").textContent=orders.filter(o=>o.status==="Pending").length;
 const body=document.getElementById("ordersTable");
 document.getElementById("emptyOrders").style.display=orders.length?"none":"block";
 body.innerHTML=orders.map(o=>`<tr><td><strong>${escapeHTML(o.id)}</strong><br><small>${new Date(o.createdAt).toLocaleString()}</small></td><td>${escapeHTML(o.customerName)}<br><small>${escapeHTML(o.phone)}</small><br><small>${escapeHTML(o.address)}</small></td><td>${o.items.map(i=>`${escapeHTML(i.name)} × ${i.quantity}`).join("<br>")}</td><td><strong>${moneyAdmin(o.total)}</strong></td><td><select class="status-select" data-status="${escapeHTML(o.id)}">${["Pending","Preparing","Ready","Completed","Cancelled"].map(s=>`<option ${o.status===s?"selected":""}>${s}</option>`).join("")}</select></td><td><button class="delete-button" data-delete="${escapeHTML(o.id)}">Delete</button></td></tr>`).join("");
 body.querySelectorAll("[data-status]").forEach(el=>el.addEventListener("change",()=>{const list=getOrders();const order=list.find(o=>o.id===el.dataset.status);if(order){order.status=el.value;saveOrders(list);renderDashboard();}}));
 body.querySelectorAll("[data-delete]").forEach(el=>el.addEventListener("click",()=>{if(confirm("Delete this order?")){saveOrders(getOrders().filter(o=>o.id!==el.dataset.delete));renderDashboard();}}));
}
function escapeHTML(value){return String(value??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
document.getElementById("adminProducts").innerHTML=ADMIN_PRODUCTS.map(p=>`<div class="admin-product"><div><strong>${p[0]}</strong><span>Menu item</span></div><strong>${moneyAdmin(p[1])}</strong></div>`).join("");
document.getElementById("refreshOrders").addEventListener("click",renderDashboard);
renderDashboard();
