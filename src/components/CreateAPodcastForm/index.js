import React, { useState } from 'react'
import InputComponent from "../Input";
import Button from "../Button";
import FileComponent from '../FileComponent/FileComponent';

function CreateAPodcastForm() {

   const [title, setTitle] = useState("");
   const [desc, setDesc] = useState("");
   const [displayImage, setDisplayImage] = useState();
  const [bannerImage, setBannerImage] = useState();
  const handleCreatePodcast = () => {
    console.log("createPodcast");
  }

  return (
    <div>
      
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
      <FileComponent></FileComponent>
      <Button text="Create a podcast" onClick={handleCreatePodcast}></Button>
     
    </div>
  );
}

export default CreateAPodcastForm