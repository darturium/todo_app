$(document).ready(function() {

  var task = "";
  var count = 0;

  // execute whenever a new item is entered
  $("#input").submit(function(event) {
    task = $("#new_todo").val().trim();
    $("#list ul").append("<li><span class='label'>" + task + "</span><span class='edit'>Edit</span><span class='remove'>Remove</span></li>");
    refreshCount();

    // this code will clear input field and prevent form from refreshing the screen
    $("#new_todo").val("");
    event.preventDefault();
  });

  // execute when "Clear List" is clicked
  $("#clear_list").click(function() {
    $("li").remove();
    refreshCount();
  });

  // execute when "Clear Completed" is clicked
  $("#clear_comp").click(function() {
    $(".completed").remove();
  });

  // execute when a list item is clicked
  $("#list").on("click", "li", function() {
    if ($(this).hasClass("edit-mode")) {
			return;
		}

    $(this).toggleClass("completed");
    refreshCount();
  });

  // execute when "Edit" is clicked
  $("#list").on("click", "span.edit", function(event) {
    event.stopPropagation();
    $(this).parent().addClass("edit-mode");
    $(this).parent().html('<form class="item-edit-form"><input autofocus type="text" value="' + $(this).parent().find('.label').text() + '"></form>')
  });

  $("#list").on("submit", "form", function(event) {
    event.preventDefault();
    var value = $(this).find("input").val();
    $(this).parent().removeClass("edit-mode");
    $(this).parent().html("<span class='label'>" + value + "</span><span class='edit'>Edit</span><span class='remove'>Remove</span>");
  });

  // execute when "Remove" is clicked
  $("#list").on("click", "span.remove", function(event) {
    $(this).parent().remove();
    refreshCount();
  })

  function refreshCount() {
    count = ( $("li").length - $(".completed").length );
    $("#tot_items").text(count);
  }

});
