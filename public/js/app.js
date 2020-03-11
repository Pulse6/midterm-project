/* ————————————————————————— LOCAL STORAGE FUNCTIONS ————————————————————————— */

// CHECK IF ORDER IN CART ALREADY EXISTS (HELPER FUNCTION) \\
const getOrder = () => {
  let order = JSON.parse(localStorage.getItem('order'));

  if (!order) {
    order = [];
  }

  return order;
};

// SAVE ORDER TO LOCAL STORAGE (HELPER FUNCTION) \\
const setLocalStorage = item => {
  const order = getOrder();
  console.log(order);
  let orderIsUnique = true;
  let price = item.price

  for (let i = 0; i < order.length; i++) {
    if (item.name === order[i].name) {
      order[i].quantity++;
      const trimmedPrice = (order[i].price + price).toFixed(2);
      let finalPrice = Number(trimmedPrice);
      order[i].price = finalPrice;
      orderIsUnique = false;
    }
  }

  if (orderIsUnique) {
    order.push(item);
  }

  localStorage.setItem('order', JSON.stringify(order));
};

// REMOVE ORDER FROM LOCAL STORAGE (HELPER FUNCTION) \\
const removeLocalStorage = name => {
  const userOrder = getOrder();

  let newOrder = userOrder.filter(function(e) {
    return e.name !== name;
  });

  localStorage.setItem('order', JSON.stringify(newOrder));
};

/* ————————————————————————— CART INTERACTIONS ————————————————————————— */

// HIDE CART ON LOAD \\
const hideCartOnLoad = () => {
  $('.shopping-cart').hide();
};

// SHOW CART ON 'CART-BUTTON' CLICK \\
const showCartOnClick = () => {
  $('#cart').click(function(event) {
    event.preventDefault();
    $(".shopping-cart").fadeToggle("fast");
  });
};

// ADD MENU ITEMS TO CART \\
const addMenuItemsToCart = () => {
  $("body").on("click", ".add-to-order-top-container", function(event) {
    const item = $(event.target);
    const food = item.parent().parent().parent().parent();
    const name = food.find(".gallery-title").text();
    const price = parseInt(food.find(".add-to-order-price").text().slice(1) * 100) / 100;
    const quantity = $(".shopping-cart-items li:contains(" + name + ")").find(".item-count").text();
    const item_count = $(".shopping-cart-items li:contains(" + name + ")");
    const pic = food.find(".img-fluid").attr('src');

    const userOrder = {
      name,
      price,
      quantity: +quantity + 1
    };

    setLocalStorage(userOrder);

    if (item_count.length != 0) {
      const el = parseInt($(".shopping-cart-items li:contains(" + name + ")").find(".item-quantity").find(".item-count").text());
      $(".shopping-cart-items li:contains(" + name + ")").find(".item-quantity").find(".item-count").text(el + 1);
    } else {
      $(".shopping-cart-items").append(`
        <li class="clearfix">
          <img src="${pic}" alt="item1" />
          <span class="item-name">${name}</span>
          <span class="item-price">${"$" + price}</span>
          <span class="item-quantity">Quantity: <span class="item-count">1</span></span>
          <span class="item-remove">X</span>
        </li>
      `);
    }
  });
};

// UPDATE CART BADGE VALUES \\
const updateCartBadgeValues = () => {
  $("body").on("click", ".add-to-order-top-container", function() {
    $(".shopping-cart").fadeIn("fast");
    let totalOrders = parseInt($('.badge-outer').text());
    totalOrders += 1;
    $('.badge-outer').html(totalOrders);
    $('.badge-inner').html(totalOrders);
  });
};

// UPDATE CART TOTAL PRICE \\
const updateCartTotalPrice = () => {
  $("body").on("click", ".add-to-order-top-container", function(event) {
    const item = $(event.target);
    const food = item.parent().parent().parent().parent();
    const price = parseInt(food.find(".add-to-order-price").text().slice(1) * 100);
    let orderTotal = (($(".main-color-text").text().slice(1) * 100) + price);
    orderTotal = Math.round(orderTotal) / 100;

    $(".main-color-text").text("$" + orderTotal);
  });
};

// REMOVE CART ITEM BUTTON \\
const removeCartItem = () => {
  $("body").on("click", ".item-remove", function() {
    // const item = $(event.target)
    const target = $(this).parent();
    const name = target.find(".item-name").text();
    removeLocalStorage(name);
    const price = parseInt(target.find(".item-price").text().slice(1) * 100);
    const amount = parseInt(target.find(".item-quantity").find(".item-count").text());
    const currentTot = parseInt($(".main-color-text").text().slice(1) * 100);
    let newtot = (currentTot - (amount * price)) / 100;
    if (newtot <= 0) {
      newtot = 0;
      $('.shopping-cart').hide();
    }
    $(".main-color-text").text("$" + newtot);
    let totalOrders = parseInt($('.badge-outer').text());
    totalOrders -= amount;

    $('.badge-outer').html(totalOrders);
    $('.badge-inner').html(totalOrders);

    $(this).parent().remove();
  });
};


/* ————————————————————————— MENU INTERACTIONS ————————————————————————— */

// APPEND MENU ITEM (HELPER FUNCTION) \\
const appendMenuItem = menuItem => {
  const menuItemHTML = `
  <div class="gallery-page-${menuItem.food_category} gallery-page">
  <article class="gallery-item">
    <figure class="menu-item-position">
      <img src="${menuItem.item_img}" alt="Image" class="img-fluid gallery-img" />
      <figcaption>
        <h4 class="gallery-title">${menuItem.name}</h4>
        <p class="gallery-description">${menuItem.description}</p>
      </figcaption>
      <!-- Add to Order Button -->
      <button class="add-to-order-top-container">
        <div class="add-to-order-container">
          <div class="wrap">
            <div class="add-to-order-button">Add to Order</div>
            <div class="add-to-order-price">${"$" + menuItem.price / 100}</div>
          </div>
        </div>
      </button>
      <!-- /Add to Order Button -->
    </figure>
  </article>
</div>
  `;

  $(".gallery").append(menuItemHTML);
};

// FILTER MENU ITEMS \\
const filterMenuItems = () => {
  $("body").on("click", ".paging-link", function(event) {
    event.preventDefault();
    const page = $(this).text().toLowerCase();

    $('.gallery-page').addClass('hidden');
    $('.gallery-page-' + page).removeClass('hidden').fadeTo("slow");
    $('.paging-link').removeClass('active');
    $(this).addClass("active");
  });
};

// SHOW ALL ITEMS \\
const showAllMenuItems = () => {
  $("body").on("click", ".menu", function(event) {
    event.preventDefault();
    $('.gallery-page').removeClass('hidden').fadeTo("slow");
    $(this).addClass("active");
  });
};


/* ————————————————————————— AJAX REQUESTS ————————————————————————— */

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

const wtf = () => {
  $("body").on("click", ".this-shit", function(event) {
    $("#clear").removeClass('hide-clear');
    $(".img-fluid").addClass('spin');
    $(".gifs-dog").removeClass('hide-clear');
    $(".gifs-sim").removeClass('hide-clear');
    $(".gifs-dance").removeClass('hide-clear');
    $(".gifs-girl").removeClass('hide-clear');
    $(".gifs-thatguy").removeClass('hide-clear');
    $(".gifs-banana").removeClass('hide-clear');
    $(".gifs-eye").removeClass('hide-clear');
    $(".gifs-potin").removeClass('hide-clear');
    $(".gifs-realdog").removeClass('hide-clear');
    $(".gifs-hobbits").removeClass('hide-clear');
    $(".gifs-batman").removeClass('hide-clear');
  });
};

const nowtf = () => {
  $("body").on("click", "#clear", function(event) {
    $("#clear").addClass('hide-clear');
    $(".img-fluid").removeClass('spin');
    $(".gifs-dog").addClass('hide-clear');
    $(".gifs-sim").addClass('hide-clear');
    $(".gifs-dance").addClass('hide-clear');
    $(".gifs-girl").addClass('hide-clear');
    $(".gifs-thatguy").addClass('hide-clear');
    $(".gifs-banana").addClass('hide-clear');
    $(".gifs-eye").addClass('hide-clear');
    $(".gifs-potin").addClass('hide-clear');
    $(".gifs-realdog").addClass('hide-clear');
    $(".gifs-hobbits").addClass('hide-clear');
    $(".gifs-batman").addClass('hide-clear');
  });
};

/* ————————————————————————— DOCUMENT.READY ————————————————————————— */

// NOTE: Order of the functions below matters! AJAX requests first, then the rest.

$(function() {
  getAndRenderMenu();
  getAndRenderDrinks();
  postOrderAndRedirect();
  filterMenuItems();
  showAllMenuItems();
  hideCartOnLoad();
  addMenuItemsToCart();
  showCartOnClick();
  updateCartBadgeValues();
  updateCartTotalPrice();
  removeCartItem();

  wtf()
  nowtf()
});

// scroll top buton

$(window).scroll(function() {
  if ($(this).scrollTop() > 700) {
    $("#topBtn").fadeIn();

  } else {
    $("#topBtn").fadeOut();

  }
});

$("#topBtn").click(function() {
  $('html ,body').animate({scrollTop : 0}, 800);

});

window.onunload = () => {
  // Clear the local storage
  localStorage.removeItem('order');
}
