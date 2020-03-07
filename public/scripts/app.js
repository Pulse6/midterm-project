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
    console.log(res)
    for (food of res.menu) {
      const wrapper = $("<div class='menu-item'>")
        .append($("<div class='menu-img-container'>").html(`<img src="https://peterspicksblog.files.wordpress.com/2017/03/lotr-rabbit-stew.jpg" />`))
        .append($("<div class='menu-content'>").html(`
        <h2 class="menu-title">${food.name + " - "}
          <span class="menu-price">$${food.price / 100}</span>
        </h2>
        <p class="menu-info">${food.description}</p>
        `));

      $(".menu").append(wrapper);
      // $("<h2>").text(food.name + " - ").appendTo($(".menu"));
      // $("<span>").text(" " + food.price).appendTo($(".menu"));
      // $("<p>").text(food.description).appendTo($(".menu"));
    }
  });
});
