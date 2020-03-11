/* ————————————————————————— NAVBAR INTERACTIONS ————————————————————————— */

// PREVENT THE ORDER BUTTON FROM REFRESHING THE PAGE \\
const preventOrderButtonRefresh = () => {
  $('.order-button').click(function(event){
    event.preventDefault();
  });
};

/* ————————————————————————— HELPER FUNCTIONS ————————————————————————— */

const appendOrderSummaryItem = orderSummaryItem => {
  const orderSummaryItemHTML = `
  <li class="cart-list-item">
        <div class="cart-item-img"
          style="background-image: url('${orderSummaryItem.item_img}');">
        </div>
        <div class="cart-item">
          <div class="cart-item-description">
            <span>
              <p class="cart-item-label">${orderSummaryItem.item_name}</p>
              <p class="cart-item-price">$${orderSummaryItem.item_price / 100}</p>
              <p class="cart-item-quantity">Quantity: <span class="exact-quantity">${orderSummaryItem.item_quantity}</span></p>
            </span>
          </div>
        </div>
      </li>
  `;

  $(".all-cart-items").append(orderSummaryItemHTML);
};


/* ————————————————————————— AJAX REQUESTS ————————————————————————— */

//////////////////////////////// EXAMPLES FROM INDEX.EJS \/ \/ \/ \/ WILL CHANGE THEM ///////////////////////////////
// GET MENU ITEMS FROM SQL DATABASE, SAVE TO LOCALSTORAGE, RENDER ON MAIN PAGE \\
const getAndRenderMenu = () => {
  $.ajax({
    method: "GET",
    url: "/api/menu"
  }).done((res) => {
    localStorage.setItem('food', JSON.stringify(res.menu));
    for (food of res.menu) {
      appendMenuItem(food);
    }
  });
};

// GET DRINK ITEMS FROM SQL DATABASE, SAVE TO LOCALSTORAGE, RENDER ON MAIN PAGE \\
const getAndRenderDrinks = () => {
  $.ajax({
    method: "GET",
    url: "/api/drinks"
  }).done((res) => {
    localStorage.setItem('drinks', JSON.stringify(res.drinks));
    for (drink of res.drinks) {
      appendMenuItem(drink);
    }
  });
};

// POST CART ORDER TO /api/order & REDIRECT TO /order \\
const postOrderAndRedirect = () => {
  $("body").on("click", ".button", function(event) {
    event.preventDefault();
    let order = JSON.parse(localStorage.getItem('order'));
    $.ajax({
      method: "POST",
      url: "/api/order",
      data: { order }
    }).done((res) => {
      window.location.replace('/order');
    })
  });
};


const getAndRenderOrderSummaryItems = () => {
  $.ajax({
    method: "GET",
    url: "/api/order"
  }).done((res) => {
    // console.log(res.orders)
    for (orderItem of res.orders) {
      appendOrderSummaryItem(orderItem);
    }
  });
};

/* ————————————————————————— DOCUMENT.READY ————————————————————————— */

// NOTE: Order of the functions below matters! AJAX requests first, then the rest.

$(function() {
  getAndRenderOrderSummaryItems();
  // appendOrderSummaryItem();
  preventOrderButtonRefresh();
});
