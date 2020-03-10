/* ———————————————————— GET USERS FROM SQL ———————————————————— */
// $(() => {
//   // console.log("it works")
//   $.ajax({
//     method: "GET",
//     url: "/api/users"
//   }).done((users) => {
//     for (user of users.users) {
//       $("<div>").text(user.name).appendTo($(""));
//     }
//   });

// const addItemHandlers = () => {
//   $(".add-to-cart").click(function (event) {
//     const item = $(event.target);
//     const id = item.attr('data-food-id');
// console.log()
//     const food = item.parent().parent()
//     const name = food.find(".menu-name").text()
//     const price = food.find(".menu-price").text()
// const amount = item.parent().parent().parent().parent()
// console.log(amount)
// const cart = $(".item-template")
// console.log(cart)
// for (let item of cart) {
//   console.log(item.attr('data-id'))
// }
// console.log(cart)
//     if ($(".item-template").find(".item-name").text() === name) {
//       console.log("already there")

//     } else {
//       $(".item-template").append(`
//       <div data-id="${id}">
//       <li class="item-name" >${name}</li>
//       <li class="item-price">${price}</li>
//       <li class="item-count">
//       <input class="item-count" type="number" value="1">
//       <button class="remove-item">REMOVE</button>
//       </li>
//       </div>
//       `)
//     }
// for (item of cart) {
//   const foodID = item.attr('data-id')
//   if (foodID === id) {
//     $(".item-count").val() + 1
//   }
// }
// for ($(.item-template))
// });
// $(".plus-item").click(function (event) {
//   const item = $(event.target);
//   const id = item.parent().attr('data-food-id');

//   console.log(`add count to id: ${id}`)
//   const count = $(`[data-food-id="${id}"] .count-for-item`)
//   let getNowVal = count.val() + 1
//   count.val(getNowVal)
//   count.text(getNowVal)
// });

// $(".subtract-item").click(function () {
//   const item = $(event.target);
//   const id = item.parent().attr('data-food-id');

//   // console.log(`add count to id: ${id}`)
//   const count = $(`[data-food-id="${id}"] .count-for-item`)
//   let getNowVal = count.val() - 1
//   count.val(getNowVal)
//   count.text(getNowVal)
//   if (getNowVal <= 0) {
//     count.val(0)
//     count.text(0)
//   }
// });
// }
const addItemHandlers = () => {
  $(".add-to-order-top-container").click(function (event) {
    const item = $(event.target);
    const food = item.parent().parent().parent().parent()
    const name = food.find(".gallery-title").text()
    const price = parseInt(food.find(".add-to-order-price").text().slice(1) * 100) / 100
    const quantity = $(".shopping-cart-items li:contains(" + name + ")").find(".item-count").text()
    const item_count = $(".shopping-cart-items li:contains(" + name + ")")
    const pic = food.find(".img-fluid").attr('src')

    if (item_count.length != 0) {
      const el = parseInt($(".shopping-cart-items li:contains(" + name + ")").find(".item-quantity").find(".item-count").text());
      // console.log(el)
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
    // removeItemFromCart()

  }
  });
}

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

const addToTotalOrders = () => {
  $('.add-to-order-top-container').click(function () {
    $(".shopping-cart").fadeIn("fast");
    const fullList = $(".shopping-cart-items")
    // console.log(fullList)
    let totalOrders = parseInt($('.badge-outer').text());
    // console.log(totalOrders)
    totalOrders += 1;
    $('.badge-outer').html(totalOrders);
    $('.badge-inner').html(totalOrders);
  })
}

const addToOrderTotal = () => {
  $('.add-to-order-top-container').click(function (event) {
    const item = $(event.target);
    const food = item.parent().parent().parent().parent()
    // const name = food.find(".gallery-title").text()
    const price = parseInt(food.find(".add-to-order-price").text().slice(1) * 100)
    // console.log(price)
    let orderTotal = (($(".main-color-text").text().slice(1) * 100) + price) / 100
    // console.log(orderTotal)
    $(".main-color-text").text("$" + orderTotal)
  })
}
// $(function () {
  // console.log("it works!!")
// const removeItemFromCart = () => {
  $("body").on("click", ".item-remove", function (event) {
    const item = $(event.target)
    // console.log(target.length)
    const target = $(this).parent()
    // const dammmm = target.attr('data-name')
    // console.log(dammmm)
    // const id = item.attr('data-food-id')
    // console.log($(this).parent())
    const price = parseInt(target.find(".item-price").text().slice(1) * 100)
    // console.log("price " + price)
    const amount = parseInt(target.find(".item-quantity").find(".item-count").text())
    // console.log("amount "+amount)
    const currentTot = parseInt($(".main-color-text").text().slice(1) * 100)
    // console.log("current tot "+currentTot)
    const newtot = (currentTot - (amount * price)) / 100
    // console.log("newtot  "+newtot)
    $(".main-color-text").text("$" + newtot)

    let totalOrders = parseInt($('.badge-outer').text());
    // console.log(totalOrders)
    totalOrders -= amount;
    $('.badge-outer').html(totalOrders);
    $('.badge-inner').html(totalOrders);

    $(this).parent().remove()
  })
// }
// });

