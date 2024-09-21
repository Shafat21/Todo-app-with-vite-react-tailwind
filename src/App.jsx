import React, { useState, useEffect } from 'react';
import darkBg from './images/bg-desktop-dark.jpg';
import logo from './assets/logo.png';
import './App.css';
import Todo from './components/Todo';

function App(props) {
  // Handle responsiveness for desktop view
  const [isDesktop, setDesktop] = useState(window.innerWidth > 1000);

  const updateWidth = () => {
    setDesktop(window.innerWidth > 1000);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => { window.removeEventListener("resize", updateWidth); }
  }, []);

  return (
    <div className="darkTheme">
      <img src={darkBg} alt="theme bg" />
      <div className="toDoContainer">
        <div className="title">
          <img src={logo} alt="logo" className="logo" />
          <h1>T O D O</h1>
        </div>
        <div className="toDoItems">
          <Todo isDesktop={isDesktop} />
        </div>
      </div>

      <footer className="footer">
        <img src={logo} alt="logo" className="footerLogo" />
        <p>Powered by Shafat21</p>
      </footer>
    </div>
  );
}

export default App;
