
let quantity = document.querySelector('.quantity');
let foodList = {
    foods: [
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

         {img: "images/spicy-chicken.jpg",
         name: "Spicy Chicken",
         price: 695,
         id: 9 },

         {img: "images/homemade-french-fries-5.jpg",
         name: "French Fries",
         price: 98.00,
         id: 10 },

         {img: "images/spaghetti.jpg",
         name: "Spaghetti Bolognese",
         price: 189,
         id: 11 },

         {img: "/images/Caesar-Salad.jpg",
         name: "Chicken Cesar Salad",
         price: 295,
         id: 12 }
    ],

    orderList: [],

    priceList: [],

    delBtn:[],

    showCard(){
        let itemList = document.getElementById("itemList");
        let foods = "";
        this.foods.forEach(
            function(foodinList){
                foods += `<div class="card d-inline-flex m-1 p-2 border-1" style="width: 15rem;box-shadow: 0px 5px 11px 1px rgba(120,104,104,0.54);
                -webkit-box-shadow: 0px 5px 11px 1px rgba(120,104,104,0.54) border-color:black;
                -moz-box-shadow: 0px 5px 11px 1px rgba(120,104,104,0.54);">
                <img src="${foodinList.img}" class="card-img-top" alt="..." style": height: 100%">
                <div class="card-body">
                  <h5 class="card-title fs-6" id="name${foodinList.id}">${foodinList.name}</h5>
                  ₱ <p class="card-text" id="price${foodinList.id}"> ${foodinList.price}.00</p>
                  <a href="#" class="btn btn-danger" onclick="addToCart(${foodinList.id});">Add to Cart</a>
                </div>
              </div>
              `;
            });
            itemList.innerHTML = foods;
    },

//    showList(){
//          let cartList = document.getElementById("cartList");
//          let orderList = "";
//        this.orderList.forEach(
//            function(foodinList){
//            orderList += `<li style="list-style: none; margin-bottom: 8px; "> ${foodinList.name} </li>`;
//             });
//            cartList.innerHTML = orderList;
//            orderList.quantity = 1;

//   },

   showPriceList(){
      let amount = document.getElementById("priceList");
        let priceList = "";
       let totalCost = 0;
     this.priceList.forEach(
         function(foodinList){
             priceList += `<li style="list-style: none; margin-bottom: 8px;">${formatCurrency(foodinList.price, "PHP")}</li>`;
          totalCost += Number(foodinList.price);
          });
      output = formatCurrency(totalCost, "PHP");
       amount.innerHTML = priceList;
            document.getElementById("totalPrice").innerText = `Total:   ${output}`;

    },

     showDelButton(){
     let del = document.getElementById("delete_btn");
       let delBtn = "";
       this.delBtn.forEach(
           function(foodinList){
           delBtn += `<li style="list-style: none; margin-bottom: 15px;"><button style="width: 25px; border-style:none;"i
                class="fa-solid fa-trash me-2"></i> onclick="del();">-</button></li>`;
                
          }
       );
      delBtn.innerHTML = delBtn;

     }
}
 function changeQuantity(key, quantity){
    if(quantity == 0){
        delete  foodList[key];
        }else{
      foodList[key].quantity = quantity;
       foodList[key].price = quantity * foodList[key].price;
   }
 }

function formatCurrency(value, currency){
    const userLanguage = window.navigator.language;
        return new Intl.NumberFormat(userLanguage,{
            style: "currency",
            currency: currency,
        }).format(value);
};

foodList.showCard();
foodList.showList();
foodList.showPriceList();
foodList.showDelButton();


function showList(){
    let cartList = document.getElementById("cartList");
    let orderList = "";
    let totalCost = 0;
    let quantity = 0;
    let delBtn = "";
    let new_list = JSON.parse(localStorage.getItem("new"))
    if (new_list == null || new_list == ""){
        cartList.innerHTML = `<div class="text-center col-12">No items yet! </div>`
        quantity.innerHTML = 0;
    }else{
        new_list.forEach(
            function(foodinList){
                orderList += `
                    <h5><div class="text-center col-12">${foodinList.name}
                    ${formatCurrency(foodinList.price, "php")}
                    <small><button class="bg-danger p-2" onclick="del();" style:""">-</button></small></div><h5>`;
        
                    totalCost += Number(foodinList.price);
                    quantity += 1;
            });
            output = formatCurrency(totalCost, "PHP");
            cartList.innerHTML = orderList;
            document.getElementById("totalPrice").innerText = `Total Price: ${output}`;
            document.getElementById("quantity").innerText = quantity;
            

    }    
}



function addToCart(id){
    let array = JSON.parse(localStorage.getItem("new"))
    let quantity = 0;
    if (array == null){
        quantity.innerHTML = 0;
        foodList.orderList = [];
        let new_order = document.getElementById("name"+id).innerHTML;
        let new_price = document.getElementById("price"+id).innerHTML;
        foodList.orderList.push({name:new_order, price:new_price});
        localStorage.setItem("new", JSON.stringify(foodList.orderList));
        quantity += 1;
        showList();

    }else{
        foodList.orderList = JSON.parse(localStorage.getItem("new"));
        let new_order = document.getElementById("name"+id).innerHTML;
        let new_price = document.getElementById("price"+id).innerHTML;
        foodList.orderList.push({name:new_order, price:new_price});
        localStorage.setItem("new", JSON.stringify(foodList.orderList));
        
        showList();
 

    }
}
function del(){
    let new_list = JSON.parse(localStorage.getItem("new"));
    new_list.pop();
    localStorage.setItem("new", JSON.stringify(new_list));
    showList();
    foodList.showPriceList();
    quantity.cartList();
    foodList.showDelButton();
    
    


}

let mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
// RANDOMIZING TICKET NUMBER
function generateRandom4DigitNumber() {
    const randomDecimal = Math.random();
    const randomBetween0And10000 = randomDecimal * 10000;
    const random4DigitNumber = Math.floor(randomBetween0And10000);
    return random4DigitNumber;
  }

  function generateAndDisplayRandomNumber() {
    const random4DigitNumber = generateRandom4DigitNumber();
    const ticketNumberElement = document.getElementById("ticketNumber");
    ticketNumberElement.textContent = random4DigitNumber;
  }

  generateAndDisplayRandomNumber();

  // Generating Ticket Modal
  document.getElementById("openModalBtn").addEventListener("click", function () {
    const dataContainer = document.getElementById("dataContainer");
    const dataToTransfer = dataContainer.innerHTML;

    const modalData = document.getElementById("modalData1");
    modalData.innerHTML = dataToTransfer;

    const modal = document.getElementById("myModal");
    modal.style.display = "block";
  });

  

  