

//The current day is displayed at the top of the calendar
var today = moment();
$("#currentDay").text(today.format("dddd, MMMM Do"));

var tasks = {
    "9": [],
    "10": [],
    "11": [],
    "12": [],
    "13": [],
    "14": [],
    "15": [],
    "16": [],
    "17": []
};
// add tasks to local storage
var setTasks = function() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

//get the information from the local storage 
var getTasks = function() {

    var storage = JSON.parse(localStorage.getItem("tasks"));
    if (storage) {
        tasks = storage

        
        $(this).each(tasks, function(hour, task) {
            var time = $("#" + hour);
            createTask(task, time);
        })
    }

    
    auditTasks()
}

var createTask = function(taskText, time) {
  

    var taskArea = time.find(".task");
    var taskP = $("<p>")
        .addClass("description")
        .text(taskText)
    taskArea.html(taskP);
}

var auditTasks = function() {
    

    var currentHour = moment().hour();
    $(".task-info").each( function() {
        var elementHour = parseInt($(this).attr("id"));

        if ( elementHour < currentHour ) {
            $(this).removeClass(["present", "future"]).addClass("past");
        }
        else if ( elementHour === currentHour ) {
            $(this).removeClass(["past", "future"]).addClass("present");
        }
        else {
            $(this).removeClass(["past", "present"]).addClass("future");
        }
    })
};

var replaceTextarea = function(textareaElement) {
   
    var taskInfo = textareaElement.closest(".task-info");
    var textArea = taskInfo.find("textarea");

    var time = taskInfo.attr("id");
    var text = textArea.val().trim();

    tasks[time] = [text];  
    setTasks();


    createTask(text, taskInfo);
}

$(".task").click(function() {

   
    $("textarea").each(function() {
        replaceTextarea($(this));
    })

    var time = $(this).closest(".task-info").attr("id");
    if (parseInt(time) >= moment().hour()) {

        
        var text = $(this).text();
        var textInput = $("<textarea>")
            .addClass("form-control")
            .val(text);

        $(this).html(textInput);
        textInput.trigger("focus");
    }
})

$(".saveBtn").click(function() {
    replaceTextarea($(this));
})

timeToHour = 3600000 - today.milliseconds();  
setTimeout(function() {
    setInterval(auditTasks, 3600000)
}, timeToHour);


getTasks();