# Ajs
a **declarative DOM builder**—essentially a way to write HTML in JavaScript without the bulk of a heavy framework like React. It’s a very "functional" approach!

focuses on **method chaining** (like `._append()`) and **composition**
readable UI structure becomes.
---

Ajs is lightweight, functional JavaScript library for building UI components using chainable syntax.
Stop writing messy HTML strings like React and start composing your DOM // yosin onli js .

## Features

* **Declarative Syntax:** Build complex layouts with readable, nested functions.
* **Method Chaining:** Use `._append()` to stack elements effortlessly.
* **Zero Dependencies:** Keep your frontend lean and fast.
* **Functional Components:** Easily create reusable pieces like spinners, buttons, and inputs.

---

## 📦 Installation

Just include the script in your project:

```javascript
import { div, flex, spinner, textinp, button } from './your-lib-path.js';

```

---

## 🛠 Usage

The core philosophy is simple: **Everything is a function, and everything can be chained.**

### Basic Example

Create a container with a flexible layout, some loaders, and input fields:

```javascript
document.body.append(
  div("main-container")._append(
    // A flex wrapper with three different sized spinners
    flex()._append(
        spinner(), 
        spinner(50), 
        spinner(60)
    ),

    // A section for user input
    div()._append(
        textinp({ placeholder: "Enter name" }), 
        input("password")
    ),

    // Action buttons
    div()._append(
        button("Submit"), 
        coint() // Custom component
    )
  )
);

```

---

## 📖 API Reference

### `tag(name)`

The core engine that creates a DOM element.

### `div(id)`

Creates a `<div>`. If an `id` is provided, it is automatically assigned.

```javascript
div("header"); // <div id="header"></div>

```

### `._append(...children)`

A custom method added to elements to allow for easy nesting. It accepts multiple elements at once.

### `flex()`

A helper that returns a `div` with `display: flex` already applied.

---

## 🏗 Component Structure

You can define your own components by wrapping the library's functions:

```javascript
const myCard = (title) => {
  return div("card")._append(
    h1()._text(title),
    button("Click Me")
  );
};

```

---

## 🤝 Contributing

Feel free to fork this project, open issues, or submit pull requests to make JS DOM manipulation even smoother!

