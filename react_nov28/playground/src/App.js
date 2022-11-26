import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function Home() { // home page 
  return <p>Welcome to my site.</p>;
}

function About() { // about page
  return <p>Hey! my name's Zavaar Shah. I'm a CS student
    at <a href="https://wayne.edu">Wayne State</a> University.</p>;
}

function Contact() { // contact page
  return <p>Contact me at https://github.com/thatziv</p>
}

function NotFound() { // 404 page
  return <h1>404 - Not Found</h1>
}

function App() {
  return (
    <div>
      <BrowserRouter>
        <div className="nav"> {/* Nav bar */}
          <Link to="/">Home</Link>
          |{/* <- pipe for style */}
          <Link to="/about">About</Link>
          |
          <Link to="/contact">Contact</Link>
        </div>
        <hr />
        <Routes> {/* Declared routes */}
          <Route element={<Home />} path="/" />
          <Route element={<About />} path="/about" />
          <Route element={<Contact />} path="/contact" />
          <Route element={<NotFound/>} path="*" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
