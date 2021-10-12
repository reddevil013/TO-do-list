# [TO-do](https://grbegur.github.io/TO-do/)
> A to-do list web-app

## Description

This project implements a To-do list application, where users can jot down list of actions that they want to prioritize and complete in future. These actions once completed can be marked as done and even deleted from the list. A Drag and drop functionality is introduced where priority of actions can be changed my moving them around. It also provides option to save multiple lists and access them back when needed through folders section.

## Tech Stack:

* HTML
* CSS 
* Bootstrap
* JavaScript
	
## On the technical part of project

* Html: Consists of header and body section. Header includes title and buttons to save and navigate to folders section. Body includes input box , add to list and delete button. List is generated dynamically through JS and append to body beneath the input section. 

* CSS: Consists of some animation for button click and delete action. On the aesthetic part overall look is kept to mimic an old age application. In the body section flex is used to structure new todo actions that are appended through JS and in folder's section grid is used to structure, the saved lists. Where ever possible box shadow is provided to create depth to elements. Scroll-bar styling is also included to provide a thin bar with only scroll-thumb made visible.

* JavaScript : Consists of rendering new todo actions, check button, delete button, drag an drop functionality, save functionality, on the main page. Where as on the folders page it is used to render saved lists, delete saved lists and create new ones.