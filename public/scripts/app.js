// const addItemHandlers = () => {
//   $(".add-to-order-top-container").click(function (event) {
//     const item = $(event.target);
//     const food = item.parent().parent().parent().parent()
//     const name = food.find(".gallery-title").text()
//     const price = parseInt(food.find(".add-to-order-price").text().slice(1) * 100) / 100
//     const quantity = $(".shopping-cart-items li:contains(" + name + ")").find(".item-count").text()
//     const item_count = $(".shopping-cart-items li:contains(" + name + ")")
//     const pic = food.find(".img-fluid").attr('src')

//     if (item_count.length != 0) {
//       const el = parseInt($(".shopping-cart-items li:contains(" + name + ")").find(".item-quantity").find(".item-count").text());
//       $(".shopping-cart-items li:contains(" + name + ")").find(".item-quantity").find(".item-count").text(el + 1);
//     }
//     else {
//       $(".shopping-cart-items").append(`
//       <li class="clearfix">
//         <img src="${pic}" alt="item1" />
//         <span class="item-name">${name}</span>
//         <span class="item-price">${"$" + price}</span>
//         <span class="item-quantity">Quantity: <span class="item-count">1</span></span>
//         <span class="item-remove">X</span>
//       </li>
//     `);
//       // removeItemFromCart()
//     }
//   });
// }

// const addEntree = (entree) => {
//   const wrapper = `
//   <div class="gallery-page-${entree.food_category} gallery-page">
//   <article class="col-lg-3 col-md-4 col-sm-6 col-12 gallery-item">
//     <figure>
//       <img src="${entree.item_img}" alt="Image" class="img-fluid gallery-img" />
//       <figcaption>
//         <h4 class="gallery-title">${entree.name}</h4>
//         <p class="gallery-description">${entree.description}</p>
//       </figcaption>
//       <!-- Add to Order Button -->
//       <button class="add-to-order-top-container">
//         <div class="add-to-order-container">
//           <div class="wrap">
//             <div class="add-to-order-button">Add to Order</div>
//             <div class="add-to-order-price">${"$" + entree.price / 100}</div>
//           </div>
//         </div>
//       </button>
//       <!-- /Add to Order Button -->
//     </figure>
//   </article>
// </div>
//   `;

//   $(".gallery").append(wrapper);
// }

// const addToTotalOrders = () => {
//   $('.add-to-order-top-container').click(function () {
//     $(".shopping-cart").fadeIn("fast");
//     // const fullList = $(".shopping-cart-items")
//     let totalOrders = parseInt($('.badge-outer').text());
//     totalOrders += 1;
//     $('.badge-outer').html(totalOrders);
//     $('.badge-inner').html(totalOrders);
//   })
// }

// const addToOrderTotal = () => {
//   $('.add-to-order-top-container').click(function (event) {
//     const item = $(event.target);
//     const food = item.parent().parent().parent().parent()
//     const price = parseInt(food.find(".add-to-order-price").text().slice(1) * 100)
//     let orderTotal = (($(".main-color-text").text().slice(1) * 100) + price) / 100
//     $(".main-color-text").text("$" + orderTotal)
//   })
// }

// $("body").on("click", ".item-remove", function (event) {
//   const item = $(event.target)
//   const target = $(this).parent()
//   const price = parseInt(target.find(".item-price").text().slice(1) * 100)
//   const amount = parseInt(target.find(".item-quantity").find(".item-count").text())
//   const currentTot = parseInt($(".main-color-text").text().slice(1) * 100)
//   const newtot = (currentTot - (amount * price)) / 100

//   $(".main-color-text").text("$" + newtot)
//   let totalOrders = parseInt($('.badge-outer').text());
//   totalOrders -= amount;
//   $('.badge-outer').html(totalOrders);
//   $('.badge-inner').html(totalOrders);

//   $(this).parent().remove()
// })
