$(document).ready(function(){

var getAndDisplayAllTasks = function(){
  $.ajax({
    type: 'GET',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=217',
    dataType: 'json',
    success: function(response, textStatus){
      $('#todo-list').empty();
      response.tasks.forEach(function(item){
        console.log(item.content)
        $('#todo-list').append('<p>' + item.content + '</p><button>Remove</button>');
      })
    },
    error: function(request, textStatus, errorMessage){
      console.log(errorMessage);
    }
  });
};


var addNewTask = function() {
$.ajax({
  type: 'POST',
  url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=217',
  contentType: 'application/json',
  dataType: 'json',
  data: JSON.stringify({
    task: {
      content: $('#newTask').val()
    }
  }),
  success: function (response, textStatus) {
    $('#newTask').val('');
    getAndDisplayAllTasks();
  },
  error: function (request, textStatus, errorMessage) {
    console.log(errorMessage);
  }
})
};


 $('#createTask').on('submit', function(e){
   e.preventDefault();
  addNewTask();
})


getAndDisplayAllTasks();


});
