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
<p id="test">This is real time online HTML Editor</p>
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