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

const appendOrderSummaryItemTotal = orderSummaryItem => {
  const orderSummaryItemTotalHTML = `
  <li class="cart-list-item">
        <div class="cart-item">
          <div class="cart-item-description">
            <span>
              <p class="cart-item-label">Sub-Total:
                <span class="cart-item-price">$${(orderSummaryItem / 100)}<span>
              </p>
              <p class="cart-item-label">Total:
                <span class="cart-item-price">$${Math.round(orderSummaryItem / 100) * 1.13}<span>
              </p>
            </span>
          </div>
        </div>
      </li>
  `;

  $(".all-cart-items").append(orderSummaryItemTotalHTML);
};

/* ————————————————————————— AJAX REQUESTS ————————————————————————— */

const getAndRenderOrderSummaryItems = () => {
  $.ajax({
    method: "GET",
    url: "/api/order"
  }).done((res) => {
    for (orderItem of res.orders) {
      appendOrderSummaryItem(orderItem);
    }

    let totalPrice = 0;
    for (orderItem of res.orders) {
      totalPrice += orderItem.item_price;
    }
    appendOrderSummaryItemTotal(totalPrice)
  });
};

/* ————————————————————————— DOCUMENT.READY ————————————————————————— */

// NOTE: Order of the functions below matters! AJAX requests first, then the rest.

$(function() {
  getAndRenderOrderSummaryItems();
  preventOrderButtonRefresh();
});
