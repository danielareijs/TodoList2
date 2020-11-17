$(document).ready(function(){


var getAndDisplayAllTasks = function(){
  $.ajax({
    type: 'GET',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=217',
    dataType: 'json',
    success: function(response, textStatus){
      $('#todo-list').empty();
      response.tasks.forEach(function(item){
        if(item.completed){
        $('#todo-list').append('<div class="row taskRow completed"><input type="checkbox" class="col-xs-1 markComplete" data-id="' + item.id + '"' + (item.completed ? 'checked' : '') + '><p class="col-xs-8 listItem">' + item.content + '</p><button class="removeBtn" data-id="' + item.id + '">x</button></div>');
      } else {
        $('#todo-list').append('<div class="row taskRow active"><input type="checkbox" class="col-xs-1 markComplete" data-id="' + item.id + '"' + (item.completed ? 'checked' : '') + '><p class="col-xs-8 listItem">' + item.content + '</p><button class="removeBtn" data-id="' + item.id + '">x</button></div>');
      }
      });
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

 var deleteTask = function(id){
  $.ajax({
    type: 'DELETE',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '?api_key=217',
    success: function(response, textStatus){
      getAndDisplayAllTasks();
    },
    error: function(request, textStatus, errorMessage){
      console.log(errorMessage);
    }
  })
};

$(document).on('click', '.removeBtn', function(){
  deleteTask($(this).data('id'))
});


var markTaskAsComplete = function(id){
  $.ajax({
    type: 'PUT',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '/mark_complete?api_key=217',
    dataType: 'json',
    success: function(response, textStatus){
      getAndDisplayAllTasks();
    },
    error: function(request, textStatus, errorMessage){
      console.log(errorMessage);
    }
  })
};


var markTaskAsActive = function(id){
  $.ajax({
    type: 'PUT',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '/mark_active?api_key=217',
    dataType: 'json',
    success: function(response, textStatus){
      getAndDisplayAllTasks();
    },
    error: function(request, textStatus, errorMessage){
      console.log(errorMessage);
    }
  })
};


$(document).on('change', '.markComplete', function(){
  if(this.checked){
    markTaskAsComplete($(this).data('id'));
  } else {
    markTaskAsActive($(this).data('id'));
  }

});

$('#btnActive').on('click', function(){
  $('.active').show();
  $('.completed').hide();
})

$('#btnCompleted').on('click', function(){
  $('.completed').show();
  $('.active').hide();
})

$('#btnAll').on('click', function(){
  $('.completed, .active').show();
})


getAndDisplayAllTasks();

});
