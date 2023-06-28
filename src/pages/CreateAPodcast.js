import React, { useState } from 'react'
import Header from '../components/Header'
import CreateAPodcastForm from "../components/CreateAPodcastForm";
function CreateAPodcast() {
   

  return (
    <div>
      <Header />
      <div className="input-wrapper">
        <CreateAPodcastForm />
      </div>
    </div>
  );
}

export default CreateAPodcast