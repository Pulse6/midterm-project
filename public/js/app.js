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
//     // console.log()
//     const food = item.parent().parent()
//     const name = food.find(".menu-name").text()
//     const price = food.find(".menu-price").text()
//     // const amount = item.parent().parent().parent().parent()
//     // console.log(amount)
//     // const cart = $(".item-template")
//     // console.log(cart)
//     // for (let item of cart) {
//     //   console.log(item.attr('data-id'))
//     // }
//     // console.log(cart)
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
//     // for (item of cart) {
//     //   const foodID = item.attr('data-id')
//     //   if (foodID === id) {
//     //     $(".item-count").val() + 1
//     //   }
//     // }
//     // for ($(.item-template))
//   });
//   // $(".plus-item").click(function (event) {
//   //   const item = $(event.target);
//   //   const id = item.parent().attr('data-food-id');

//   //   console.log(`add count to id: ${id}`)
//   //   const count = $(`[data-food-id="${id}"] .count-for-item`)
//   //   let getNowVal = count.val() + 1
//   //   count.val(getNowVal)
//   //   count.text(getNowVal)
//   // });

//   // $(".subtract-item").click(function () {
//   //   const item = $(event.target);
//   //   const id = item.parent().attr('data-food-id');

//   //   // console.log(`add count to id: ${id}`)
//   //   const count = $(`[data-food-id="${id}"] .count-for-item`)
//   //   let getNowVal = count.val() - 1
//   //   count.val(getNowVal)
//   //   count.text(getNowVal)
//   //   if (getNowVal <= 0) {
//   //     count.val(0)
//   //     count.text(0)
//   //   }
//   // });
// }

const addItemHandlers = () => {
  $(".wrap").click(function (event) {
    const item = $(event.target);
    const food = item.parent().parent().parent().parent()
    const name = food.find(".gallery-title").text()
    const price = parseInt(food.find(".add-to-order-price").text().slice(1) * 100) / 100
    const quantity = $(".shopping-cart-items li:contains(" + name + ")").find(".item-count").text()
    // console.log(quantity)

    const item_count = $(".shopping-cart-items li:contains(" + name + ")")
    // console.log(item_count)
    // if (item_count.length <= 0) {
    //   $(".item-template div:contains("+ name +")").find(".item-count").find(".item-count").val("1");
    // }
    if (item_count.length != 0) {
      const el = parseInt($(".shopping-cart-items li:contains(" + name + ")").find(".item-quantity").find(".item-count").text());
      // console.log(el)
      $(".shopping-cart-items li:contains(" + name + ")").find(".item-quantity").find(".item-count").text(el + 1);
    }
    else {
      $(".shopping-cart-items").append(`
      <li class="clearfix">
        <img src="/assets/gallery/01.jpg" alt="item1" />
        <span class="item-name">${name}</span>
        <span class="item-price">${"$" + price}</span>
        <span class="item-quantity">Quantity: <span class="item-count">1</span></span>
      </li>
  `)
    }
  });
}

const removeItemFromCart = () => {
  $(".remove-item").click(function () {
    const item = $(event.target);
    console.log("hi")
  })
}

// const addCartHandlers = () => {
//   $(".plus-item").click(function (event) {
//     const item = $(event.target);
//     const getitem = item.parent().parent().parent()
//     const name = getitem.find(".menu-name").text()
//     const price = getitem.find(".menu-price").text()
//     const amount = getitem.find(".count-for-item").text()
//     console.log(name)

//     const id = item.parent().attr('data-food-id');
//     const count = $(`[data-food-id="${id}"] .count-for-item`)

//     $(".item-template").append("<div>").html(`
//       <li class="item-name">${name}</li>
//       <li class="item-price">${price}</li>
//       <li class="item-count">${amount}</li>
//     `)
//   });

//   $(".subtract-item").click(function () {
//     const item = $(event.target);
//     const getitem = item.parent().parent().parent()
//     const name = getitem.find(".menu-name").text()
//     const price = getitem.find(".menu-price").text()
//     const amount = getitem.find(".count-for-item").text()
//     console.log(name)

//     const id = item.parent().attr('data-food-id');
//     const count = $(`[data-food-id="${id}"] .count-for-item`)

//     $(".item-template").append("<div>").html(`
//       <li class="item-name">${name}</li>
//       <li class="item-price">${price}</li>
//       <li class="item-count">${amount}</li>
//     `)
//   });
// }


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

  /* ———————————————————— GET MENU FROM SQL ———————————————————— */

}

// <ul class="modified" data-food-id="${food.id}">
// <li class="look-of-modified plus-item">+</li>
// <li class="count-for-item">0</li>
// <li class="look-of-modified subtract-item">-</li>
// </ul>


// // CREATE FUNCTIONS UP TOP, CALL THEM INSIDE THE DOLLAR FUNCTION BELOW
// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/menu"
//   }).done((res) => {
//     console.log(res)
//     for (food of res.menu) {
//       addEntree(food);
//     }
//     addItemHandlers();
//     removeItemFromCart();
//     // addCartHandlers();
//   });

// })
