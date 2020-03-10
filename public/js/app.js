// for adding item in cart
$("body").on("click", ".add-to-order-top-container", function (event) {
  const item = $(event.target);
  const food = item.parent().parent().parent().parent()
  const name = food.find(".gallery-title").text()
  const price = parseInt(food.find(".add-to-order-price").text().slice(1) * 100) / 100
  const quantity = $(".shopping-cart-items li:contains(" + name + ")").find(".item-count").text()
  const item_count = $(".shopping-cart-items li:contains(" + name + ")")
  const pic = food.find(".img-fluid").attr('src')

  if (item_count.length != 0) {
    const el = parseInt($(".shopping-cart-items li:contains(" + name + ")").find(".item-quantity").find(".item-count").text());
    $(".shopping-cart-items li:contains(" + name + ")").find(".item-quantity").find(".item-count").text(el + 1);
  }
  else {
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

// for adding all menu item
const addEntree = (entree) => {
  const wrapper = `
  <div class="gallery-page-${entree.food_category} gallery-page">
  <article class="col-lg-3 col-md-4 col-sm-6 col-12 gallery-item">
    <figure>
      <img src="${entree.item_img}" alt="Image" class="img-fluid gallery-img" />
      <figcaption>
        <h4 class="gallery-title">${entree.name}</h4>
        <p class="gallery-description">${entree.description}</p>
      </figcaption>
      <!-- Add to Order Button -->
      <button class="add-to-order-top-container">
        <div class="add-to-order-container">
          <div class="wrap">
            <div class="add-to-order-button">Add to Order</div>
            <div class="add-to-order-price">${"$" + entree.price / 100}</div>
          </div>
        </div>
      </button>
      <!-- /Add to Order Button -->
    </figure>
  </article>
</div>
  `;

  $(".gallery").append(wrapper);
}

// for updating counter for number of orders
$("body").on("click", ".add-to-order-top-container", function () {
  $(".shopping-cart").fadeIn("fast");
  // const fullList = $(".shopping-cart-items")
  let totalOrders = parseInt($('.badge-outer').text());
  totalOrders += 1;
  $('.badge-outer').html(totalOrders);
  $('.badge-inner').html(totalOrders);
})

// for update total price in cart
$("body").on("click", ".add-to-order-top-container", function (event) {
  const item = $(event.target);
  const food = item.parent().parent().parent().parent()
  const price = parseInt(food.find(".add-to-order-price").text().slice(1) * 100)
  let orderTotal = (($(".main-color-text").text().slice(1) * 100) + price)
  orderTotal = Math.round(orderTotal) / 100

  $(".main-color-text").text("$" + orderTotal)
})

// for when user click on remove button in cart
$("body").on("click", ".item-remove", function () {
  // const item = $(event.target)
  const target = $(this).parent()
  const price = parseInt(target.find(".item-price").text().slice(1) * 100)
  const amount = parseInt(target.find(".item-quantity").find(".item-count").text())
  const currentTot = parseInt($(".main-color-text").text().slice(1) * 100)
  const newtot = (currentTot - (amount * price)) / 100

  $(".main-color-text").text("$" + newtot)
  let totalOrders = parseInt($('.badge-outer').text());
  totalOrders -= amount;
  $('.badge-outer').html(totalOrders);
  $('.badge-inner').html(totalOrders);

  $(this).parent().remove()
})

// for filter Categories
$("body").on("click", ".paging-link", function (event) {
  event.preventDefault();
  const page = $(this).text().toLowerCase();

  $('.gallery-page').addClass('hidden');
  $('.gallery-page-' + page).removeClass('hidden').fadeTo("slow");
  $('.paging-link').removeClass('active');
  $(this).addClass("active");
});

// for adding all item back to menu
$("body").on("click", ".menu", function (event) {
  event.preventDefault();
  $('.gallery-page').removeClass('hidden').fadeTo("slow");
  $(this).addClass("active");
});
////////////////////////////////////////////////////////////////////////

// for hidding cart at first
function defaultHideCart() {
  $('.shopping-cart').hide();
}

// for showing cart when user add in item
function showCartOnToggle() {
  $('#cart').click(function (event) {
    event.preventDefault();
    $(".shopping-cart").fadeToggle("fast");
  })
}

/* function showAddToOrderButtonOnHover() {
  Handle add to order on hover
  $('.add-to-order-container').addClass('hidden');
  $('.gallery-item').hover(
    function() {
      $('.add-to-order-container').removeClass('hidden');
    },
    function() {
      $('add-to-order-container').addClass('hidden');
    }
  );
} */

function getMenu() {
  $.ajax({
    method: "GET",
    url: "/api/menu"
  }).done((res) => {
    localStorage.setItem('food', JSON.stringify(res.menu));
    for (food of res.menu) {
      addEntree(food);
    }
  });
}

function getDrinks() {
  $.ajax({
    method: "GET",
    url: "/api/drinks"
  }).done((res) => {
    localStorage.setItem('drinks', JSON.stringify(res.drinks))
    for (drink of res.drinks) {
      addEntree(drink);
    }
  });
}

$(function () {
  getMenu();
  getDrinks();
  $.ajax({
    method: "GET",
    url: "/api/menu"
  }).done((res) => {
    for (food of res.menu) {
      addEntree(food);
    }
  });
  defaultHideCart();
  showCartOnToggle();
});
