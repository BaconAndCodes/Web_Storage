async function getData(url) {
  try {
    const res = await fetch(url)
    const data = await res.json()
    return data
  } catch (error) {
    console.log("error", error);
    return []
  }
}

async function createHtml() {
  const data = await getData('https://orders-testing-api.herokuapp.com/api/v1/orders')
  const container = document.getElementById('container')
  let html = "";
  
  for(let i = 0; i < data.length; i++) {
    html += `<div class='item-container'>`
    switch (data[i].status){
      case 0:
        html += `<p class='statusDots' style="color: rgb(256,172,4)">●</p>`
        break;
      case 1:
        html += `<p  class='statusDots' style="color: rgb(80,212,140">●</p>`
        break;
      case 2:
        html += `<p class='statusDots' style="color: rgb(8,148,252)">●</p>`
        break;
      case 3:
        html += `<p class='statusDots' style="color: rgb(256,76,76)">●</p>`
        break;
    };
    html += `<h4>ID ${data[i].orderid}</h4>`
    html += `<p>Number of items</p><h4>${data[i].products.length}</h4>`
    html += `<p>Customer name</p><h4>${data[i].customer}</h4>`
    html += `<p>Delivery Location</p><h4>${data[i].delivaddr}</h4>`
    html += `<hr><div class='bottom'><div class='smallBottom1'><p>Delivery Date</p><h4>${data[i].deliverydate}</h4></div>`
    html += `<div class='smallBottom2'><p>Total Amount</p><h4 class='totalPrice'>${data[i].totalprice} €</h4></div></div>`
    switch (data[i].status){
      case 0:
        html += `<div class='buttons'><input class='button1'type='button' value='Accept' onclick='accept()'>`
        html += `<input class='button3'type='button' value='Detail' onclick='getProduct(${data[i].orderid})'><input class='button2'type='button' value='Cancel' onclick='cancel()'></div>`
        break;
      case 1:
        html +=`<div class='buttons'><input class='button4'type='button' value='Pick Up' onclick='picked()'>`
        html += `<input class='button3'type='button' value='Detail' onclick='getProduct(${data[i].orderid})'><input class='button2'type='button' value='Cancel' onclick='cancel()'></div>`
        break;
      case 2:
        html +=`<div class='buttons'>`
        html += `<input class='button3'type='button' value='Detail' onclick='getProduct(${data[i].orderid})'><input class='button2'type='button' value='Cancel' onclick='cancel()'></div>`
        break;
      case 3:
        html +=`<div class='buttons'>`
        html += `<input class='button3'type='button' value='Detail' onclick='getProduct(${data[i].orderid})'></div>`
        break;
    };
    html += `</div>`
  };
  container.innerHTML = html
}
async function getProduct(orderid) {
  const data = await getData('https://orders-testing-api.herokuapp.com/api/v1/orders')
  const order = data.find(x => x.orderid == orderid)
  const products = order.products
  const productsContainer = document.getElementById('products')
  const container = document.getElementById('container')
  container.style.display = "none"
  let html = "";
  html += `<div class="item-product">`
  
  html +=`<div class="productHeader">`
  html +=`<input type="button" value='Back' class='backButton'onclick='backToMain()'`
  html +=`<h2>Order ID: ${orderid}</h2>`
  html +='</div>'
  html += `<hr>`
  switch (order.status){
    case 0:
      html += `<p class='statusDots' style="color: rgb(256,172,4)">●</p>`
      html +=`<h3>Order Status: Pending </h3>`
      break;
    case 1:
      html += `<p  class='statusDots' style="color: rgb(80,212,140">●</p>`
      html +=`<h3>Order Status: Ready </h3>`
      break;
    case 2:
      html += `<p class='statusDots' style="color: rgb(8,148,252)">●</p>`
      html +=`<h3>Order Status: Picked </h3>`
      break;
    case 3:
      html += `<p class='statusDots' style="color: rgb(256,76,76)">●</p>`
      html +=`<h2>Order Status: Cancelled </h2>`
      break;
  };
  html +=`<hr><h3>Customer Information</h3>`
  html +=`<div class='customerInfo'>`
  html +=`<p>Name: ${order.customer}`
  
  html +=`<p>Delivery Address: ${order.delivaddr}`
  html +=`<p>Invoice Address: ${order.customer}`
  html +=`<p>ID: ${order.customerid}`
  html +=`<p>Customer Notes: ${order.comment}</p><br/>`
  html +=`</div>`
  html +=`<hr>`
  html +=`<h3>Orders</h3>`
  for ( let i=0; i< products.length; i++ ){
    html +=`<div class='card'>`
    html +=`<h4>${products[i].product}</h4>`
    html +=`<p class='description'>${products[i].description}</p>`
    html +=`<p>Code: ${products[i].code} | Shelf Pos: ${products[i].shelf_pos} | Supplier Code: ${products[i].suppliercode} </p>`
    html +=`<p>Unit Price: ${products[i].unit_price}</p>`
    html +=`<p class='qtyStyle'>x ${products[i].qty}</p>`
    html += `</div>`
  }
  html +=`<h3 class='totalPriceProduct'>Total Price : ${order.totalprice}€ `
  html +=`<hr>`
  html += `</div>`
  productsContainer.innerHTML = html
}
function backToMain() {
  const container = document.getElementById('container')
  container.style.display = "grid"
  createHtml()
}

createHtml()
