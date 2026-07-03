import{useState} from"react";
import Login from "./Login";
import axios from "axios";
import "./App.css";
function App() {
  const [loggedIn, setLoggedIn] = useState(false);   

  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleUpload = () => {
    if(!file){
      setMessage("Please select a file first.");
      return;
    }
    const allowedType = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation"
];
    if(!allowedType.includes(file.type)){
      setMessage("Only PDF,DOCX and PPTX files are allowed!");
      return;
    }
    axios.post("http://localhost:8080/api/files", {
    filename: file.name,
    filetype: file.type,
    filesize: file.size
})
.then(() => {
    setMessage("File uploaded successfully!");
}).catch((error) => {
    console.log(error);
    console.log(error.response);
    setMessage("Upload failed!");
});
  }
  const handleView =()=>{
    const fileURL = URL.createObjectURL(file);
    window.open(fileURL,"_blank");
  };
  const handleDownload=()=>{
    const fileURL=URL.createObjectURL(file);
    const link=document.createElement("a");
    link.href=fileURL;
    link.download=file.name;
    link.click();
  };
  const handleDelete = () => {
    setFile(null);
    setMessage("File deleted successfully!");
};
if(!loggedIn){
  return<Login onLogin={()=>
    setLoggedIn(true)}/>
  }
  return(
  <div className="dashboard">
    <div className="sidebar">
    <h2>📁 File Processor</h2>
    <ul>
      <li>🏠 Dashboard</li>
      <li>📤 Upload Document</li>
      <li>📂 My Files</li>
      <li>🕒 Recent Files</li>
      <li>⭐ Favorites</li>
      <li>🗑️ Trash</li>
      <li>⚙️ Settings</li>
    </ul>
    </div>
<div className="main-container">
 <div className="upload-card">
  <div className="drop-zone" >
  
<h3>Drag & Drop your file here</h3>
<p>or</p>

      <input
      id="fileInput"
        type="file"
        hidden
        onChange={(e) =>
           setFile(e.target.files[0])}
      />
      <label htmlFor="fileInput"
      className="choose-btn">
        choose File
      </label>

      <br /><br />

    </div>

    <br />

    <button className="upload-btn" onClick={handleUpload}>
      Upload File
    </button>
    <p>{message}</p>
    <br /><br />
 <h2>📁 Uploaded Files</h2>
 <input
 type="text"
 placeholder="Search files..."
 className="search-box"
 />
    <table>
      <thead>
        <tr>
          <th>File Name</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {file && (
          <tr>
            <td>{file.name}</td>
            <td>Uploaded</td>

            <td>
              <button className="view-btn" onClick={handleView}>
                View
              </button>

              <button className="download-btn" onClick={handleDownload}>
                Download
              </button>

              <button className="delete-btn" onClick={handleDelete}>
                Delete
              </button>
            </td>
          </tr>
        )}
      </tbody>
    </table>
    </div>
    </div>
    </div>
  );
}
export default App;