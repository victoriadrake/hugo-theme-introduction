// Nav burger animation
document.addEventListener('DOMContentLoaded', function () {
  // Get all "navbar-burger" elements
  var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0)
  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {
    // Add a click event on each of them
    $navbarBurgers.forEach(function ($el) {
      $el.addEventListener('click', function () {
        // Get the target from the "data-target" attribute
        var target = $el.dataset.target
        var $target = document.getElementById(target)
        // Toggle the class on both the "navbar-burger" and the "navbar-menu"
        $el.classList.toggle('is-active')
        $target.classList.toggle('is-active')
      })
    })
  }
})

// Modal closer
$('.card').click(function () {
  $($(this).attr('data-target')).addClass('is-active')
  $('html').addClass('modal-open')
})
$('.modal-close').click(function () {
  $($(this).attr('data-target')).removeClass('is-active')
  $('html').removeClass('modal-open')
})
$(document).keypress(function (e) {
  if (e.which === 0) {
    $('.modal.is-active').removeClass('is-active')
    $('html').removeClass('modal-open')
  }
})