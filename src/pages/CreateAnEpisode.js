import React, { useState } from 'react'
import Header from '../components/Header'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Button from '../components/Button';
import InputComponent from "../components/Input";
import FileInput from "../components/FileComponent/FileComponent";

function CreateAnEpisode() {
     const { id } = useParams();
     const [title, setTitle] = useState("");
     const [desc, setDesc] = useState("");
     const [audioFile, setAudioFile] = useState();

     const [loading, setLoading] = useState(false);

     const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const audioFileHandle = (file) => {
    setAudioFile(file);
  };

  const handleSubmit = {

  }
  return (
    <div>
      <Header />
      <div className="input-wrapper">
        <h1> Create An Episode</h1>
        <InputComponent
          state={title}
          setState={setTitle}
          placeholder="Title"
          type="text"
          required={true}
        />
        <InputComponent
          state={desc}
          setState={setDesc}
          placeholder="Description"
          type="text"
          required={true}
        />
        <FileInput
          accept={"audio/*"}
          id="audio-file-input"
          fileHandleFnc={audioFileHandle}
          text={"Upload Audio File"}
        />
        <Button
          text={loading ? "Loading..." : "Create Episode"}
          disabled={loading}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
}

export default CreateAnEpisode