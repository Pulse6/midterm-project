/* ———————————————————— NAVBAR ———————————————————— */
$(() => {
  const indicator = document.querySelector('.nav-indicator');
  const items = document.querySelectorAll('.nav-item');

  function handleIndicator(el) {
    items.forEach(item => {
      item.classList.remove('is-active');
      item.removeAttribute('style');
    });

    indicator.style.width = `${el.offsetWidth}px`;
    indicator.style.left = `${el.offsetLeft}px`;
    indicator.style.backgroundColor = el.getAttribute('active-color');

    el.classList.add('is-active');
    el.style.color = el.getAttribute('active-color');
  }


  items.forEach((item, index) => {
    item.addEventListener('click', (e) => { handleIndicator(e.target) });
    item.classList.contains('is-active') && handleIndicator(item);
  });
});

/* ———————————————————— GET USERS FROM SQL ———————————————————— */
$(() => {
  // console.log("it works")
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for (user of users.users) {
      $("<div>").text(user.name).appendTo($(""));
    }
  });

  /* ———————————————————— GET MENU FROM SQL ———————————————————— */
  $.ajax({
    method: "GET",
    url: "/api/menu"
  }).done((res) => {
    // console.log(res)
    for (food of res.menu) {
      addFoodItem(food);
    }
    addItemHandlers();
    removeItemFromCart();
    // addCartHandlers();
  })
});

const addItemHandlers = () => {
    $(".add-to-cart").click(function (event) {
    const item = $(event.target);
    const id = item.attr('data-food-id');
    const food = item.parent().parent()
    const name = food.find(".menu-name").text()
    const price = food.find(".menu-price").text()
    // const amount = item.parent().parent().parent().parent()
    // console.log(amount)
    // if()
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

  });
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

const addFoodItem = (food) => {
  const wrapper = $("<div class='menu-item'>")
    .append($("<div class='menu-img-container'>").html(`<img src="https://peterspicksblog.files.wordpress.com/2017/03/lotr-rabbit-stew.jpg" />`))
    .append($("<div class='menu-content'>").html(`
    <h2 class="menu-title">
      <span class="menu-name">${food.name}</span>
      <span> - $</span>
      <span class="menu-price">${food.price / 100}</span>
    </h2>
    <p class="menu-info">${food.description}</p>
    `))
    .append($("<div class='count-item-content'>").html(`
      <button class="add-to-cart" data-food-id="${food.id}">
        Add
      </button>
    `))

  $(".menu").append(wrapper);
}

// <ul class="modified" data-food-id="${food.id}">
// <li class="look-of-modified plus-item">+</li>
// <li class="count-for-item">0</li>
// <li class="look-of-modified subtract-item">-</li>
// </ul>
