# Building HTML Pages: HTML Syntax

___

## What is HTML?

The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser. It defines the meaning and structure of web content. It is often assisted by technologies such as CSS and scripting languages such as JS.

```html
<!-- This is a comment -->
<!DOCTYPE html>
<html>
<head>
    <link href="style.css" rel="stylesheet">
</head>
<body>

<h1>My First Heading</h1>
<p>My first paragraph.</p>

<a href="https://google.com">my link</a>

<h2>Lists</h2>
<ol>
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
</ol>

<ul>
    <li>Item</li>
    <li>Item</li>
    <li>Item</li>
</ul>

<img src="https://zavaar.net/z.png" width=50 height=50>
<p style="color: green">This is an image<p>
</body>
</html>
```

## What is CSS?

Like HTML, CSS is not a programming language. It's not a markup language either. CSS is a style sheet language. CSS is what you use to selectively style HTML elements.

In your `<head>` tag, link your css file to your html file:

```html
<link href="style.css" rel="stylesheet" />
```

![css](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/CSS_basics/css-declaration-small.png)

To change text color of all `<p>` tags, do:

```css
p {
    color: green;
}
```

You can replace `p` with multiple selectors, class names, or id names.

```diff
- p {
+ p, h1, .className, #idName {
    color: green;
}
```

There are many more [properties](https://www.w3schools.com/cssref/index.php) to mess around with!

> [!NOTE]
> The following has been recycled from the [JS DOM workshop](../dom_mar3/README.md)

# Building Interactive Web Pages: JavaScript DOM Essentials

JavaScript DOM scripting is an essential skill for front-end developers who want to create dynamic and interactive web pages. The Document Object Model (DOM) is a programming interface that represents the structure of an HTML or XML document as a tree-like structure of nodes and objects. With JavaScript, developers can access and manipulate the content and structure of the DOM to create dynamic user interfaces, handle events, and perform various other tasks. In this workshop, we will cover the fundamentals of JavaScript DOM scripting, including how to access, manipulate, and traverse the DOM using JavaScript.

___

## What is the DOM tree

The DOM tree is made up of nodes, which are the elements, attributes, and text content that make up the document. The root node of the tree is the `document` object, which represents the entire web page. The `document` object has child nodes, which represent the HTML elements in the document.

___

## Accessing the DOM

To access any element in an HTML file in JavaScript, we can use:

`document.getElementById(id)` - Returns the element with the specified ID.

`document.getElementsByClassName(className)` - Returns a collection of elements with the specified class name.

`document.getElementsByTagName(tagName)` - Returns a collection of elements with the specified tag name.

`document.getElementsByName(name)` - Returns a collection of elements with the specified name attribute.

`document.querySelector(selector)` - Returns the first element that matches the specified CSS selector.

`document.querySelectorAll(selector)` - Returns a collection of elements that match the specified CSS selector.

`element.getElementsByTagName(tagName)` - Returns a collection of elements with the specified tag name, within the specified element.

`element.getElementsByClassName(className)` - Returns a collection of elements with the specified class name, within the specified element.

`element.querySelector(selector)` - Returns the first element that matches the specified CSS selector, within the specified element.

`element.querySelectorAll(selector)` - Returns a collection of elements that match the specified CSS selector, within the specified element.

## Manipulating the DOM

```html
<p id="test">This is the default content</p>
<img id="image"/>
<ol id="groceries"></ol>
<script>
    document.body.style.backgroundColor = "gray"
    // set background to gray
    const element = document.getElementById("test")
    element.style = "color: black;"
    // set element's text color to black

    element.textContent = "Hello from the DOM"
    // set the element's text value

    element.innerHTML = "<b>I am bold.</b>"
    // set the element's inner HTML value (this will overwrite the previous text content changes)

    const image = document.getElementById("image")
    image.setAttribute("src", "https://images.unsplash.com/photo-1677690740070-ec6f41e346a8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80")
    // set the image's url source attribute to another image


    // create & append elements 
    const groceriesListElement = document.querySelector("#groceries")
    const groceries = ["🍊 Oranges", "🍎 Apples", "🍇 Grapes"]
    for (let item of groceries) {
        const listItem = document.createElement("li")
        // create list items to append in the parent element
        listItem.textContent = item
        // set the content of the list item to the item in the array
        listItem.style.fontSize = "larger"
        // make the font size of the list item larger
        groceriesListElement.appendChild(listItem)
        // finally append the items into the parent element
    }
</script>

```

## Form Validation (Accessing DOM)

```html
<h1>Form validation</h1>
<form name="myForm">
    <input placeholder="First name" name="fname">
    <input placeholder="Last name" name="lname">
    <input placeholder="Age" name="age" type="number">
    <input type="submit" value="Go!">
</form>

<script>
    const myForm = document.forms.myForm
    // access the entire form
    function validateForm(e) {
        e.preventDefault() // this cancels the submit event - i.e it doesn't refresh the page on submission
        const lname = myForm.lname.value 
        const fname = myForm.fname.value
        const age = myForm.age.value
        // get all our input values from the form
        try {
            if (!fname) throw "Please enter your first name!"
            if (!lname) throw "Please enter your last name!"
            if (!age) throw "Please enter your age!"
            if (age < 18) throw "You are not old enough"
            // ^ form validation logic
            alert("Welcome to the site")
            // if no errors, then proceed.
        } catch (err) {
            alert(err)
            // show any errors (if thrown) to the client
        }
    }
    myForm.addEventListener("submit", validateForm)
    // listen to the submit event and bind it to the validateForm function
</script>
```

## The final project `TODO App`

```html
<h1>Manage TODOs</h1>
<ul id="todos"></ul>
<input type="text" id="todoInput">
<button onclick="createTodo()">Create</button>
<!-- You can either do an onclick attribute, or add an event listener to this button-->
<script>
    document.body.style.backgroundColor = "black"
    document.body.style.color = "white"
    // set background black, and text color to white


    const todosList = document.querySelector("#todos")

    const createTodo = () => {
        const inputValue = document.querySelector("#todoInput").value
        if (!inputValue) return alert("Please enter something TODO")
        const todoItem = document.createElement("li")
            // create list items to append in the parent element
            todoItem.textContent = inputValue
            // set the content of the list item to the item in the array

            todoItem.style.cursor = "pointer" // make the cursor turn into pointer mode when being hovered
            todoItem.onmouseover = function () {this.style.textDecoration = "line-through"}
            // when the mouse is over the element, make the text strike through
            todoItem.onmouseout = function () {this.style.textDecoration = "none"}
            // when the mouse is NOT over the element, make the text normal
            
            todoItem.addEventListener("click", ()=>{
                todoItem.remove()
            })
            // if the todo gets clicked, remove it from the set and the DOM
            todosList.appendChild(todoItem)
            // finally append the items into the parent element
    }
</script>
```
