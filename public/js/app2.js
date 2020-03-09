$(function () {
  console.log('here')
$(".wrap").click(function (event) {
  const item = $(event.target);
  const food = item.parent().parent().parent().parent()
  const name = food.find(".gallery-title").text()
  const price = parseInt(food.find(".add-to-order-price").text().slice(1) * 100) / 100
  const quantity = $(".shopping-cart-items li:contains(" + name + ")").find(".item-count").text()
  const item_count = $(".shopping-cart-items li:contains(" + name + ")")

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
      <span class="item-remove">X</span>
    </li>
  `);
  // removeItemFromCart()

}
});

addEntree = (entree) => {

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

$(".item-remove").on("click", function (event) {
  console.log('here')
    const item = $(event.target)
    // console.log(target.length)
    const target = $(this).parent()
    // const dammmm = target.attr('data-name')
    // console.log(dammmm)
    // const id = item.attr('data-food-id')
    // console.log($(this).parent())
    const price = parseInt(target.find(".item-price").text().slice(1) * 100)
    console.log("price " + price)
    const amount = parseInt(target.find(".item-quantity").find(".item-count").text())
    console.log("amount "+amount)
    const currentTot = parseInt($(".main-color-text").text().slice(1) * 100)
    console.log("current tot "+currentTot)
    const newtot = (currentTot - (amount * price)) / 100
    console.log("newtot  "+newtot)
    $(".main-color-text").text("$" + newtot)

    let totalOrders = parseInt($('.badge-outer').text());
    // console.log(totalOrders)
    totalOrders -= amount;
    $('.badge-outer').html(totalOrders);
    $('.badge-inner').html(totalOrders);

    $(this).parent().remove()
})

})
