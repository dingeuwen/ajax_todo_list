// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/


// remaining todos: 
//  - When a todo is marked as complete or uncomplete, the database "completed" parameter should be updated true or false accordingly as well. 
//  - When a delete button is clicked, the database "removed" parameter should be updated true or false as well. 


// at this point I am stuck because I want to send a put request via ajax to update the completed and removed status but thats not working. Not sure if its because its a put request. 



$(document).ready(function() {
  $('#new_todo').on('submit', function(event){
    event.preventDefault();
    // {todo_item: {name: "milk the cow"}}
    var form = $(this);
    var task = $('#todo_task').val();
    var deadline = [$('#todo_deadline_1i').val(), $('#todo_deadline_2i').val(), $('#todo_deadline_3i').val()].join('-');
    $.ajax({
      url: form.attr('action'),
      method: form.attr('method'),
      data: {
        "todo": {
          "task": task,
          "deadline": deadline,
          "completed": false,
          "removed": false
        }
      },
      dataType: "json",
      success: function(new_entry) {
        var list = $('#outstanding_todos');
        var identification = new_entry.id;
        var new_row = $('<div class="to_dos"><input type="checkbox"></input>' + new_entry.task + ', ' + new_entry.deadline + '<button class="btn btn-danger btn-mini delete_button" type="button">Delete</button></div>');
        new_row.appendTo(list);

        $('.delete_button').on('click', function() {
          $(this).parent().remove();
          $.ajax({
            type: 'POST',
            dataType: "json",
            url: '/todos/' + identification,
            data: JSON.stringify({ "todo": {"removed": true}, _method:'put'})
            }
          );
        });

        $('input:checkbox').on('click', function() {
          var completed = $(this);
          if(completed.is(':checked')) {
            completed.parent().appendTo('#completed_todos');
            completed.parent().css("color", "red");
            completed.parent().css("text-decoration", "line-through");
          } else {
            completed.parent().appendTo('#outstanding_todos');
            completed.parent().css("color", "black");
            completed.parent().css("text-decoration", "none");
            }
          });

        // var new_entry_text = $('#new_field').val(); // what is .val? can/should it be .text?
        // var new_entry_line = $('<div class="to_dos"><input type="checkbox">' + new_entry_text + '</input><button class="btn btn-danger btn-mini delete_button" type="button">Delete</button></div>');
        // new_entry_line.appendTo('#to_do_list');
        // $('#new_field').val("");

      },
      error: function(){
        alert("Couldn't add a todo because the server was broken :(");
      }
    });





    //   $('#add_button').on('click', function(){
    //     










    //   });


    // new_entry_line.on('click', function(){
    //   var current_line = $(this);
    //   current_line.css('color', 'red');
    // });


    // var addButton = $('#add_button');

    // addButton.on("click", function(){
    //   var new_entry = $('#new_field').text;
    //   $('#new_field').wrap(function() {
    //     return '<li>' + $(this).text() + '</li>';
    //   });
    // });





  });
}); // closure of document.ready