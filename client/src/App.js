import React from "react";
import "./App.css";
import FileUpload from "./components/FileUpload";

const App = () => (
  <div className="container m-4">
    <h4 className="display-4 text-center mb-4" style={{ color: "#3f2873" }}>
      <i style={{ color: "#3f2873" }} className="fas fa-file-upload mr-4 "></i>
      React File Upload
    </h4>
    <FileUpload />
  </div>
);

export default App;
