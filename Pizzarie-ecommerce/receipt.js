let customer = {
    foodlist: [],
    foods: [
      {
        {img: "images/Pizza-capricciosa.jpg",
         name: "Super Capricciosa Pizza",
         price: 995,
         id: 1 },

        {img: "images/Spinach-Pizza.png",
         name: "Creamy Spinach Pizza",
         price: 689,
         id: 2 },

        {img: "images/All-Meat.png",
         name: "All Meat Pizza",
         price: 789,
         id: 3 },

        {img: "images/Pepperoni-pizza-.jpg",
         name: "Pepperoni Pizza",
         price: 795,
         id: 4 },

         {img: "images/Supreme_pizza.jpg",
         name: "Supreme Pizza",
         price: 795,
         id: 5 },

         {img: "images/hawaiin-pizza.jpg",
         name: "Hawaiian Pizza",
         price: 595,
         id: 6 },

         {img: "images/vegan-pizza.webp",
         name: "Vegan Pizza",
         price: 695,
         id: 7 },

         {img: "images/cheese.jpg",
         name: "Four Cheese Pizza",
         price: 595,
         id: 8 },

         {img: "images/air-jordan-1-mid-se.webp",
         name: "Air Jordan 1 Mid SE",
         price: 7595,
         id: 9 },

         {img: "images/air-jordan-1-retro-high-og.webp",
         name: "Air Jordan 1 Retro High OG",
         price: 9895,
         id: 10 },

         {img: "images/ajko-1.webp",
         name: "AJKO 1",
         price: 7895,
         id: 11 },

         {img: "images/air-jordan-1-mid-se-craft-2.webp",
         name: "Air Jordan 1 Mid SE Craft",
         price: 7595,
         id: 12 }
      }
    ],
    orderList: [],

    priceList: [],

    delBtn:[],
    showCard() {
      let itemList = document.getElementById("itemList");
      let foods = "";
      this.foods.forEach(function (foodinList) {
        foods  += `
          <div class="col-md-3 col-12">
            <div class="card mb-3">
                <p id="ids${foodinList.id}" hidden>${foodinList.id}</p>
                <img id="image${foodinList.id}" src="${foodinList.image}" class="card-img-top">
    
                <div class="card-body">
                    <h5 class="card-title" id="menu${foodinList.id}">${foodinList.mealName}</h5>
                    <div class="row">
                    <div class="col-md-6 col-12 fw-bold price" id="price${foodinList.id}">₱${foodinList.price}.00</div>
                        <div class="col-md-6 col-12 text-end">
                        <button class="btn btn-sm btn-warning" onclick="addOrder(${foodinList.id})">+</button>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            `;
      });
      itemList.innerHTML = foods;
    },
  };
  
  orderlist = localStorage.getItem("new");
  
  function calculateSubtotal() {
    let orderlist = JSON.parse(localStorage.getItem("new")) || [];
    let subtotal = 0;
  
    orderlist.forEach(function (data) {
      subtotal += data.totalPrice;
    });
  
    return subtotal.toFixed(2);
  }
  
  function updateTotal() {
    let subtotal = parseFloat(calculateSubtotal());
    let deliveryFee = 49;
    let total = subtotal + deliveryFee;
  
    let subtotalElement = document.getElementById("subtotal");
    subtotalElement.innerText = "₱" + subtotal.toFixed(2);
  
    let totalElement = document.getElementById("total");
    totalElement.innerText = "₱" + total.toFixed(2);
  }
  
  function addOrder(id) {
    let orderlist = JSON.parse(localStorage.getItem("new")) || [];
  
    const existingItemIndex = orderlist.findIndex((item) => item.id === id);
  
    if (existingItemIndex !== -1) {
      alert("This item is already in your order."); //not working :<
    } else {
      let new_id = document.getElementById("ids" + id).innerText;
      let new_order = document.getElementById("menu" + id).innerText;
      let new_price = parseFloat(
        document
          .getElementById("price" + id)
          .innerText.replace("₱", "")
          .replace(".00", "")
      );
  
      orderlist.push({
        id: new_id,
        mealName: new_order,
        price: new_price,
        quantity: 1,
        totalPrice: new_price,
      });
  
      localStorage.setItem("new", JSON.stringify(orderlist));
      showorder();
  
      document.querySelector(`button[data-id="${id}"]`).disabled = true;
    }
    updateTotal();
  }
  
  function calculateTotal() {
    let orderedlist = JSON.parse(localStorage.getItem("new")) || [];
    let total = 0;
  
    orderedlist.forEach(function (data) {
      total += data.totalPrice;
    });
  
    return total.toFixed(2);
  }
  
  function showorder() {
    let placedOrder = document.getElementById("placedOrder");
    let orderlist = "";
  
    let orderedlist = JSON.parse(localStorage.getItem("new"));
  
    if (!orderlist) {
      placedOrder.innerHTML =
        "<div class='text-center'><small>No orders yet. Add something from the menu.</small></div>";
    } else {
      orderlist.forEach(function (data, index) {
        orderlist += `
        <div class="row">
          <div class="col-md-8 col-12 text-start">
              <li><b>${data.quantity}  ${data.mealName}</b>
              <ul>
              <li class="suborder">${data.quantity} x ₱${data.price}.00</li>
              </ul>
              </li>
          </div>
  
          <div class="col-md-4 col-12 text-end">
              <li><b>₱${data.totalPrice.toFixed(2)}</b></li>
          </div>
        </div>
        `;
      });
      placedOrder.innerHTML = orderlist;
    }
    updateTotal();
  }
  
  showorder();
  updateTotal();
  
  function deleteThisOrder(index) {
    let orderedlist = JSON.parse(localStorage.getItem("new"));
  
    if (index !== -1) {
      orderedlist.splice(index, 1);
  
      if (orderedlist.length === 0) {
        localStorage.removeItem("new");
      } else {
        localStorage.setItem("new", JSON.stringify(orderlist));
      }
  
      showorder();
    }
    updateTotal();
  }
  
  function addQty(index) {
    let orderedlist = JSON.parse(localStorage.getItem("new"));
  
    if (orderlist && index >= 0 && index < orderlist.length) {
      orderlist[index].quantity++;
      orderlist[index].totalPrice =
        orderlist[index].quantity * orderlist[index].price;
      localStorage.setItem("new", JSON.stringify(orderedlist));
      showorder();
    }
    updateTotal();
  }
  
  function minusQty(index) {
    let orderlist = JSON.parse(localStorage.getItem("new"));
  
    if (orderlist && index >= 0 && index < orderdlist.length) {
      if (orderlist[index].quantity > 1) {
        orderlist[index].quantity--;
        orderlist[index].totalPrice =
          orderlist[index].quantity * ordereist[index].price;
        localStorage.setItem("new", JSON.stringify(orderlist));
        showorder();
      }
    }
    updateTotal();
  }
  
  showorder();
  
  function updateItemCount() {
    let orderlist = JSON.parse(localStorage.getItem("new")) || [];
    let itemCount = orderlist.length;
    let itemCountElement = document.getElementById("orderCount");
  
    if (itemCount === 0) {
      itemCountElement.innerText = `${itemCount} ITEM/S`;
    } else {
      itemCountElement.innerText = `${itemCount} ITEM/S`;
    }
  }
  
  updateItemCount();
  console.log(updateItemCount());
  
  function orderReceived() {
    localStorage.removeItem("new");
    location.reload();
    showorder();
  }
  