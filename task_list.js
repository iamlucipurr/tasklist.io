"use strict";
var $ = function(id) { return document.getElementById(id); };
var tasks = [];
var sortDirection = "ASC";
var displayTaskList = function() {
    var list = "";
    if (tasks.length === 0) {
        var storage = localStorage.getItem("tasks") || "";
        if (storage.length > 0) { tasks = storage.split("|"); }
    }
    if (tasks.length > 0) {
     
		if (sortDirection === "ASC") { tasks.sort(); }
	
        else { tasks.reverse(); }
        list = tasks.join("\n");
    }
    $("task_list").value = list;
    $("task").focus();
	
	var name = sessionStorage.name || "";
	$("name").firstChild.nodeValue = (name.length === 0)? "" : name + "'s";
};

var addToTaskList = function() {   
    var task = $("task");
    if (task.value === "") {
        alert("Please enter a task.");
    } else {  
        tasks.push(task.value);
        localStorage.tasks = tasks.join("|");

        task.value = "";
        displayTaskList();
    }
};
var clearTaskList = function() {
    tasks.length = 0;
    localStorage.tasks = "";
    $("task_list").value = "";
    $("task").focus();
};
var deleteTask = function() {
var index = parseInt(prompt("Enter the Index value of the task you want to delete starting from 0."));
	if (!isNaN(index)) {
		tasks.splice(index, 1);
		localStorage.tasks = tasks.join("|");
		displayTaskList();
	}
};
var toggleSort = function() {
	sortDirection = (sortDirection === "ASC")? "DESC": "ASC";
    displayTaskList();
};
var setName = function() {
	var name = prompt("What is your Name?");
	sessionStorage.setItem("name ", name);
	displayTaskList();
};
var filterTasks = function() {
};

window.onload = function() {
    $("add_task").onclick = addToTaskList;
    $("clear_tasks").onclick = clearTaskList;   
    $("delete_task").onclick = deleteTask;
    $("toggle_sort").onclick = toggleSort;
    $("set_name").onclick = setName;
    $("filter_tasks").onclick = filterTasks;
    displayTaskList();
};