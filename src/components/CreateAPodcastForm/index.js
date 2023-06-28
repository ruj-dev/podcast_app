import React, { useState } from 'react'
import InputComponent from "../Input";
import Button from "../Button";
import FileComponent from '../FileComponent/FileComponent';
import { toast } from "react-toastify";
function CreateAPodcastForm() {

   const [title, setTitle] = useState("");
   const [desc, setDesc] = useState("");
   const [displayImage, setDisplayImage] = useState();
  const [bannerImage, setBannerImage] = useState();
  const bannerHandleFnc = (file) => {
    setBannerImage(file);
    
  }
  const displayHandleFnc = (file) => {
    setDisplayImage(file);
  };
  const handleCreatePodcast = () => {
    if (title && desc && bannerImage && displayImage) {
      
      
    } else {
      toast.error("Please fill all the values");
    }
   
  }

  return (
    <>
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
      <FileComponent
        accept={"image/*"}
        id="banner-image-input"
        filehandlefn={bannerHandleFnc}
      ></FileComponent>
      <FileComponent
        accept={"image/*"}
        id="display-image-input"
        filehandlefn={displayHandleFnc}
      ></FileComponent>
      <Button text="Create a podcast" onClick={handleCreatePodcast}></Button>
    </>
  );
}

export default CreateAPodcastForm