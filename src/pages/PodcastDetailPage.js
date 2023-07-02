import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import { setPodcast } from '../slices/podcastSlice';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import Button from '../components/Button';

function PodcastDetailPage() {
    const { id } = useParams();
     const navigate = useNavigate();
     const [podcast, setPodcast] = useState({});
     const [episodes, setEpisodes] = useState([]);
     const [playingFile, setPlayingFile] = useState("");
    console.log("id ", id);


     useEffect(() => {
       if (id) {
         getData();
       }
     }, [id]);
    
    
      const getData = async () => {
        try {
          const docRef = doc(db, "podcasts", id);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
              console.log("Document data:", docSnap.data());
              toast.success("podcasts successfully");
            setPodcast({ id: id, ...docSnap.data() });
          } else {
            // docSnap.data() will be undefined in this case
            console.log("No such Podcast!");
            toast.error("No such Podcast!");
            Navigate("/podcasts");
          }
        } catch (e) {
          toast.error(e.message);
        }
      };

  return (
    <div>
      <Header />
      <div className="input-wrapper" style={{ marginTop: "0rem" }}>
        {podcast.id && (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <h1 className="podcast-title">{podcast.title}</h1>
              {podcast.createdBy == auth.currentUser.uid && (
                <Button
                  text={"Create Episode"}
                  onClick={() => {
                    navigate(`/podcast/${id}/create-episode`);
                  }}
                  width={"200px"}
                ></Button>
              )}
            </div>
            <div className="banner-wrapper">
              <img alt="Banner " src={podcast.bannerImage} />
            </div>
            <p className="podcast-description">{podcast.description}</p>
            <h1 className="podcast-title-heading">Episodes</h1>
          </>
        )}
      </div>
    </div>
  );
}

export default PodcastDetailPage