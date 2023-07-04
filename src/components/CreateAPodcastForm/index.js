import React, { useState } from "react";
import InputComponent from "../Input";
import Button from "../Button";
import FileComponent from "../FileComponent/FileComponent";
import { toast } from "react-toastify";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { auth,db} from "../../firebase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";


function CreateAPodcastForm() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [displayImage, setDisplayImage] = useState();
  const [bannerImage, setBannerImage] = useState();
  const bannerHandleFnc = (file) => {
    setBannerImage(file);
  };
  const displayHandleFnc = (file) => {
    setDisplayImage(file);
  };
  const handleCreatePodcast = async () => {
    try {
      if (title && desc && bannerImage && displayImage) {
        const storage = getStorage();
        const storageRef = ref(
          storage,
          `podcasts/${auth.currentUser.uid}/${Date.now()}`
        );
        const upload = await uploadBytes(storageRef, bannerImage);

        const storageRefDref = ref(
          storage,
          `podcasts/${auth.currentUser.uid}/${Date.now()}`
        );
        const uploadsec = await uploadBytes(storageRefDref, displayImage);
        console.log(upload);

        const bannerImageUrl = await getDownloadURL(storageRef);
        const displayImageUrl = await getDownloadURL(storageRefDref);

        const podcastData = {
          title: title,
          description: desc,
          bannerImage: bannerImageUrl,
          displayImage: displayImageUrl,
          createdBy: auth.currentUser.uid,
          
        };
        const docRef = await addDoc(collection(db, "podcasts"), podcastData);
        setTitle("");
        setDesc("");
        setBannerImage(null);
        setDisplayImage(null);
        toast.success("podcasts created successfully");

        console.log(
          "bannerImageURL >>>",
          bannerImageUrl,
          "displayImageURL >>>",
          displayImageUrl
        );
        toast.success("File uploaded successfully");
      } else {
        toast.error("Please fill all the values");
      }
    } catch (error) {
      console.log(error);
    }
  };

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
        filehandlefnc={bannerHandleFnc}
      ></FileComponent>
      <FileComponent
        accept={"image/*"}
        id="display-image-input"
        filehandlefnc={displayHandleFnc}
      ></FileComponent>
      <Button text="Create a podcast" onClick={handleCreatePodcast}></Button>
    </>
  );
}

export default CreateAPodcastForm;
