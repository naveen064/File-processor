import { useState, useEffect } from "react";
import Login from "./Login";
import axios from "axios";
import "./App.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState("");
  const [search,setSearch] = useState("");
  const [progress, setProgress] = useState(0);
  const role = localStorage.getItem("role");

  const allowedType = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation"
  ];
   const fetchFiles = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/files");
    setFiles(response.data);
  } catch (err) {
    console.log(err);
  }
};
useEffect(() => {
  fetchFiles();
}, []);
if (!loggedIn) {
    return <Login onLogin={() => setLoggedIn(true)} />;
  }
  const handleLogout = () => {
    setLoggedIn(false);
    setFiles([]);
    setMessage("");
    setSearch("");
};

  const handleUpload = async () => {
    if (files.length === 0) {
      setMessage("Please select file(s).");
      return;
    }

    const valid = files.every((f) => allowedType.includes(f.type));

    if (!valid) {
      setMessage("Only PDF, DOCX and PPTX files are allowed!");
      return;
    }

    try {
    for (const file of files) {

        const formData = new FormData();
        formData.append("file", file);

        await axios.post(
            "http://localhost:8080/api/files/upload",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                onUploadProgress: (progressEvent) => {
                    const percent = Math.round(
                        (progressEvent.loaded * 100) /
                        progressEvent.total
                    );

                    setProgress(percent);
                },
            }
        );
    }


    await fetchFiles();
    setMessage("Files uploaded successfully!");

    setProgress(100);

    setTimeout(() => {
        setProgress(0);
    }, 1500);

} catch (err) {
    console.log(err);
    setMessage("Upload failed!");
}
  };

  const handleView = (file) => {
  window.open(
    `http://localhost:8080/api/files/view/${file.filename}`,
    "_blank"
  );
};
  const handleDownload = (file) => {
  window.open(
    `http://localhost:8080/api/files/download/${file.filename}`,
    "_blank"
  );
};


  const handleDelete = async (id) => {
    try {
        await axios.delete(`http://localhost:8080/api/files/delete/${id}`);
        fetchFiles();
        setMessage("File deleted successfully!");
    } catch (err) {
        console.log(err);
        setMessage("Delete failed!");
    }
};

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setFiles(Array.from(e.dataTransfer.files));
  };
 const handleSearch = async () => {
  try {
    const response = await axios.get(
  `http://localhost:8080/api/files/search?filename=${search}`
);

    setFiles(response.data);
  } catch (err) {
    console.log(err);
    setMessage("Search failed!");
  }
};
  return (
    <div className="dashboard">
      <div className="sidebar">
        <h2>📁 File Processor</h2>
      </div>

      <div className="main-container">

        <div
          className="drop-zone"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >

          <div className="upload-icon">☁️</div>

          <h3>Drag & Drop your file here</h3>

          <p>or</p>

          <input
            id="fileInput"
            type="file"
            multiple
            hidden
            onChange={(e) => setFiles(Array.from(e.target.files))}
          />

          <label htmlFor="fileInput" className="choose-btn">
            Choose Files
          </label>

          {files.length > 0 && (
            <div className="selected-file">
              <strong>{files.length} file(s) selected</strong>
            </div>
          )}
        </div>

        <br />

        <button className="upload-btn" onClick={handleUpload}>
    Upload File
</button>
{progress > 0 && (
  <div className="progress-container">
    <div
      className="progress-bar"
      style={{ width: `${progress}%`}}
    >
      {progress}%
    </div>
  </div>
)}
<button className="logout-btn" onClick={handleLogout}>
    Logout
</button>

<br /><br />

<input
  type="text"
  placeholder="Search file..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>

<button onClick={handleSearch}>
  Search
</button>

<p>{message}</p>

        <h2>📁 Uploaded Files</h2>

        <table>
          <thead>
  <tr>
    <th>S.No</th>
    <th>File Name</th>
    <th>File Size</th>
    <th>Upload Date & Time</th>
    <th>Status</th>
    <th>Action</th>
  </tr>
</thead>

          <tbody>
            {files.map((file, index) => (
              <tr key={index}>
  <td>{index + 1}</td>

  <td>{file.filename}</td>

  <td>
  {file.filesize ? (file.filesize / 1024).toFixed(2) + " KB" : "-"}
</td>

 <td>
  {file.uploadTime ? new Date(file.uploadTime).toLocaleString() : "-"}
</td>

  <td>Uploaded</td>

  <td>
    <button onClick={() => handleView(file)}>View</button>

    <button onClick={() => handleDownload(file)}>
      Download
    </button>
    {role === "ADMIN" && (
    <button onClick={() => handleDelete(file.id)}>
        Delete
    </button>
)}
    
  </td>
</tr>
            ))}
          </tbody>

        </table>

      </div>
    </div>
  );
}

export default App;