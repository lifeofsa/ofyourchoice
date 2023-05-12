// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import LoginScreen from "./screens/LoginScreen";
import Navbar from "./components/Navbar";
import RegisterScreen from "./screens/RegisterScreen";
import TopNewsScreen from "./screens/TopNewsScreen";
import BlogScreen from "./screens/BlogScreen";
import SingleNewsScreen from "./screens/SingleNewsScreen";
import BlogFormScreen from "./screens/BlogFormScreen";
import SingleBlogScreen from "./screens/SingleBlogScreen";
import DomesticNewsScreen from "./screens/DomesticNewsScreen";
import ViewEditDeleteBlogs from "./screens/ViewEditDeleteBlogs";
import { HelmetProvider, Helmet } from "react-helmet-async";

export const URL = process.env.REACT_APP_API_URL;
const App = () => {
  console.log(process.env.REACT_APP_API_URL);
  return (
    // <React.Fragment>

    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/topnews" element={<TopNewsScreen />} />
        <Route path="/" element={<BlogScreen />} />
        <Route path="/news/:id" element={<SingleNewsScreen />} />
        <Route path="/blogForm/:id/edit" element={<BlogFormScreen />} />
        <Route path="/blognews/:id" element={<SingleBlogScreen />} />
        <Route path="/domesticNews" element={<DomesticNewsScreen />} />
        <Route path="/bloglist" element={<ViewEditDeleteBlogs />} />
      </Routes>
    </BrowserRouter>

    // </React.Fragment>
  );
};

export default App;
