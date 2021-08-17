$(function () {
  // Display overlay when sidebar opened
  $("#menuToggle").on("click", function () {
    $("#bodyOverlay").toggleClass("overlay");
  });

  // Remove overlay when sidebar exit
  $("#bodyOverlay").on("click", function () {
    $("#sidebar, #menuToggle").toggleClass("active");
    $("#bodyOverlay").removeClass("overlay");
  });

  // Fixed position of content when sidebar opened
  $("body").on("click", function () {
    let active = $("#sidebar").hasClass("active");
    if (active) {
      $(".page-content").toggleClass("stop");
    } else {
      $(".page-content").removeClass("stop");
    }
  });
});

// toggle class "active" when menu is clicked
$(function () {
  $("#menuToggle").on("click", function () {
    $("#bodyOverlay, #menuToggle, #sidebar").toggleClass("active");
  });
});

// remove class "active" when overlay is clicked
$(function () {
  $("#bodyOverlay").on("click", function () {
    $("#menuToggle").removeClass("active");
  });
});
