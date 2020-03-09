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
  $(".add-to-cart").click(function (event) {
  const item = $(event.target);
  const id = item.attr('data-food-id');
  const food = item.parent().parent()
  const name = food.find(".menu-name").text()
  const price = food.find(".menu-price").text()
  // const amount = item.parent().parent().parent().parent()
  // console.log(amount)
  var item_count = $(".item-template div:contains("+ name +")")
  // if (item_count.length <= 0) {
  //   $(".item-template div:contains("+ name +")").find(".item-count").find(".item-count").val("1");
  // }
  if (item_count.length != 0){
    //$('div:contains(name)').find($('li.item-count'))
    var el = parseInt($(".item-template div:contains("+ name +")").find(".item-count").find(".item-count").val());
    $(".item-template div:contains("+ name +")").find(".item-count").find(".item-count").val(el+1);
  }
  else{
    $(".item-template").append(`
  <div>
  <li class="item-name">${name}</li>
  <li class="item-price">${price}</li>
  <li class="item-count">
  <input class="item-count" type="number" value="1">
  <button class="remove-item">REMOVE</button>
  </li>
  </div>
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
  <article class="col-lg-3 col-md-4 col-sm-6 col-12 gallery-item">
    <figure>
      <img src="/assets/gallery/01.jpg" alt="Image" class="img-fluid gallery-img" />
      <figcaption>
        <h4 class="gallery-title">${entree.name}</h4>
        <p class="gallery-description">${entree.description}</p>
      </figcaption>
      <!-- Add to Order Button -->
      <button class="add-to-order-top-container" data-entree-id="${entree.id}>
                <div class="add-to-order-container">
                  <div class="wrap">
                    <div class="add-to-order-button">Add to Order</div>
                    <div class="add-to-order-price">${entree.price / 100}</div>
                  </div>
                </div>
              </button>
      <!-- /Add to Order Button -->
    </figure>
  </article>
  `;

  $("#gallery-page-pizza").append(wrapper);

/* ———————————————————— GET MENU FROM SQL ———————————————————— */

}

// <ul class="modified" data-food-id="${food.id}">
// <li class="look-of-modified plus-item">+</li>
// <li class="count-for-item">0</li>
// <li class="look-of-modified subtract-item">-</li>
// </ul>


// // CREATE FUNCTIONS UP TOP, CALL THEM INSIDE THE DOLLAR FUNCTION BELOW
$(() => {
  $.ajax({
    method: "GET",
    url: "/api/menu"
  }).done((res) => {
    // console.log(res)
    for (food of res.menu) {
      addEntree(entree);
    }
    addItemHandlers();
    removeItemFromCart();
    // addCartHandlers();
  });

})
