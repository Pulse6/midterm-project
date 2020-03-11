const e = require("express");

/* ————————————————————————— CART INTERACTIONS ————————————————————————— */

// REMOVE CART ON LOAD \\
const removeCartButtonOnLoad = () => {
  $('.order-page-cart').hide();
};

const preventOrderButtonRefresh = () => {
  $('.order-button').click(function(event){
    event.preventDefault();
  });
};

/* ————————————————————————— AJAX REQUESTS ————————————————————————— */

//////////////////////////////// EXAMPLES FROM INDEX.EJS \/ \/ \/ \/ WILL CHANGE THEM ///////////////////////////////
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

/* ————————————————————————— DOCUMENT.READY ————————————————————————— */

// NOTE: Order of the functions below matters! AJAX requests first, then the rest.

$(function() {
  removeCartButtonOnLoad();
  preventOrderButtonRefresh();
});
