import React, { useState } from "react";
import Message from "./Message";
import ProgressBar from "./ProgressBar";
import axios from "axios";

const FileUpload = () => {
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("Choose file");
  // as a response from server we get back an object{} with fileName and filePath => thats why we pass {} in useState to show it in the updated state
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    // The Content-Type header is used to indicate the media type of the resource. The media type is a string sent along with the file indicating the format of the file. For example, for image file its media type will be like image/png
    try {
      const res = await axios.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (ProgressEvent) => {
          setUploadPercentage(
            file
              ? parseInt(
                  Math.round((ProgressEvent.loaded * 100) / ProgressEvent.total)
                )
              : null
          );

          // Clear progressBar after upload => Reset to Initial State with React Hooks
          setTimeout(() => setUploadPercentage(0), 3000);
          // Clear input field after upload => Reset to Initial State with React Hooks
          setTimeout(() => setFileName("Choose file"), 3000);
        },
      });

      // pull fileName and filePath from response res.data
      const { fileName, filePath } = res.data;

      setUploadedFile({ fileName, filePath });
      setMessage("File uploaded");
    } catch (err) {
      if (err.response.status === 500) {
        setMessage("Problem with the server");
      } else {
        setMessage(err.response.data.msg);
      }
    }
  };

  return (
    <>
      {message ? <Message msg={message} /> : null}
      <form onSubmit={onSubmit}>
        <div className="custom-file mb-4">
          <input
            type="file"
            className="custom-file-input"
            id="customFile"
            onChange={onChange}
          />
          <label className="custom-file-label" htmlFor="customFile">
            {fileName}
          </label>
        </div>
        <ProgressBar percentage={uploadPercentage} />
        <input
          type="submit"
          value="Upload"
          className="btn btn-success btn-block mt-4"
        />
      </form>
      {uploadedFile ? (
        <div className="row mt-5 ">
          <div className="col-md-6 m-auto">
            <h3 className="text-center">{uploadedFile.fileName}</h3>
            <img style={{ width: "100%" }} src={uploadedFile.filePath} alt="" />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default FileUpload;
