const PRODUCTS = [
  {id:1,name:"Classic Banana Turon",description:"Sweet saba banana wrapped in a crispy golden shell.",price:25,tag:"BEST SELLER",image:"https://praewcooks.com/wp-content/uploads/2025/09/turon.webp"},
  {id:2,name:"Langka Turon",description:"Classic banana turon with a sweet jackfruit twist.",price:30,tag:"CUSTOMER FAVORITE",image:"https://res.cloudinary.com/perkchops/image/upload/v1742932556/product/2025225/vv1mteweyewmgjxi8v6t.png"},
  {id:3,name:"Ube Cheese Turon",description:"A turon-inspired twist with ube and cheese filling.",price:35,tag:"MUST TRY",image:"https://www.greenqueen.com.hk/wp-content/uploads/2020/02/turon-the-maya-kitchen.jpg"},
  {id:4,name:"Choco Banana Turon",description:"A sweet banana turon with a chocolate-inspired twist.",price:35,tag:"SWEET PICK",image:"https://i0.wp.com/www.Iankewks.com/wp-content/uploads/2022/08/IMG_4955.jpg?resize=800%2C1056&ssl=1"},
  {id:5,name:"Turon Trio",description:"Three pieces of our classic banana turon.",price:70,tag:"BUDGET FRIENDLY",image:"https://snapcalorie-webflow-website.s3.us-east-2.amazonaws.com/media/food_pics_v2/medium/turon.jpg"},
  {id:6,name:"Turon Party Box",description:"A sharing-sized serving of golden banana turon.",price:220,tag:"FOR SHARING",image:"https://mypinoyrecipes.com/wp-content/uploads/2025/10/classic-filipino-turon-recipe-banana-spring-rolls-2025-10-06-114451.webp"}
];
const money = amount => new Intl.NumberFormat("en-PH",{style:"currency",currency:"PHP"}).format(amount);
const read = key => { try{return JSON.parse(localStorage.getItem(key)) || [];}catch{return [];} };
const save = (key,value) => localStorage.setItem(key,JSON.stringify(value));
let cart = read("turonCart");

function renderProducts(){
  const grid=document.getElementById("productGrid");
  grid.innerHTML=PRODUCTS.map(p=>`<article class="product-card"><div class="product-image"><img src="${p.image}" alt="${p.name} - Filipino turon banana spring roll" loading="lazy" onerror="this.src='https://praewcooks.com/wp-content/uploads/2025/09/turon.webp'"><span class="product-tag">${p.tag}</span></div><div class="product-info"><h3>${p.name}</h3><p>${p.description}</p><div class="product-bottom"><span class="price">${money(p.price)}</span><button class="add-button" data-add="${p.id}">+ Add to cart</button></div></div></article>`).join("");
  grid.querySelectorAll("[data-add]").forEach(btn=>btn.addEventListener("click",()=>addToCart(Number(btn.dataset.add))));
}
function addToCart(id){
  const product=PRODUCTS.find(p=>p.id===id);const existing=cart.find(i=>i.id===id);
  if(existing)existing.quantity++;else cart.push({...product,quantity:1});
  save("turonCart",cart);renderCart();showToast(`${product.name} added to cart!`);
}
function changeQuantity(id,amount){
  const item=cart.find(i=>i.id===id);if(!item)return;item.quantity+=amount;
  cart=cart.filter(i=>i.quantity>0);save("turonCart",cart);renderCart();
}
function renderCart(){
  const count=cart.reduce((sum,i)=>sum+i.quantity,0);
  const total=cart.reduce((sum,i)=>sum+i.price*i.quantity,0);
  document.getElementById("cartCount").textContent=count;
  document.getElementById("cartTotal").textContent=money(total);
  document.getElementById("checkoutTotal").textContent=money(total);
  const container=document.getElementById("cartItems");
  if(!cart.length){container.innerHTML='<div class="empty-cart">Your cart is empty.<br><br>Add a freshly made treat from our menu!</div>';}
  else container.innerHTML=cart.map(i=>`<div class="cart-item"><div><h4>${i.name}</h4><small>${money(i.price)} each</small><div class="quantity-controls"><button data-change="${i.id}" data-amount="-1" aria-label="Decrease quantity">−</button><span>${i.quantity}</span><button data-change="${i.id}" data-amount="1" aria-label="Increase quantity">+</button></div></div><div class="cart-item-price">${money(i.price*i.quantity)}</div></div>`).join("");
  container.querySelectorAll("[data-change]").forEach(b=>b.addEventListener("click",()=>changeQuantity(Number(b.dataset.change),Number(b.dataset.amount))));
}
function openCart(){document.getElementById("cartDrawer").classList.add("open");document.getElementById("cartOverlay").classList.add("show");}
function closeCart(){document.getElementById("cartDrawer").classList.remove("open");document.getElementById("cartOverlay").classList.remove("show");}
function showToast(message){const toast=document.getElementById("toast");toast.textContent=message;toast.classList.add("show");setTimeout(()=>toast.classList.remove("show"),2300);}
document.getElementById("openCart").addEventListener("click",openCart);
document.getElementById("closeCart").addEventListener("click",closeCart);
document.getElementById("cartOverlay").addEventListener("click",closeCart);
document.getElementById("checkoutButton").addEventListener("click",()=>{
  if(!cart.length){showToast("Your cart is empty.");return;}
  closeCart();document.getElementById("checkoutModal").classList.add("show");
});
document.getElementById("closeCheckout").addEventListener("click",()=>document.getElementById("checkoutModal").classList.remove("show"));
document.getElementById("checkoutModal").addEventListener("click",e=>{if(e.target.id==="checkoutModal")e.currentTarget.classList.remove("show");});
document.getElementById("checkoutForm").addEventListener("submit",e=>{
  e.preventDefault();if(!cart.length)return;
  const form=new FormData(e.currentTarget);
  const order={id:"TC-"+Date.now().toString().slice(-7),customerName:form.get("customerName").trim(),phone:form.get("phone").trim(),address:form.get("address").trim(),notes:form.get("notes").trim(),items:cart.map(i=>({id:i.id,name:i.name,price:i.price,quantity:i.quantity})),total:cart.reduce((s,i)=>s+i.price*i.quantity,0),status:"Pending",createdAt:new Date().toISOString()};
  const orders=read("turonOrders");orders.unshift(order);save("turonOrders",orders);
  cart=[];save("turonCart",cart);renderCart();e.currentTarget.reset();document.getElementById("checkoutModal").classList.remove("show");
  showToast(`Order ${order.id} placed successfully!`);
  alert(`Thank you for ordering from Turon Corner!\\nYour order number is ${order.id}.\\nTotal: ${money(order.total)}\\n\\nThis is a demo order. No payment was collected.`);
});
renderProducts();renderCart();
