import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import { setPodcast } from '../slices/podcastSlice';
import { collection, doc, getDoc, onSnapshot, query } from 'firebase/firestore';
import { auth, db } from '../firebase';
import Button from '../components/Button';
import AudioPlayer from '../components/AudioPlayer';
import Episodedetail from '../components/EpisodeDetail';

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
      
useEffect(() => {
  const unsubscribe = onSnapshot(
    query(collection(db, "podcasts", id, "episodes")),
    (querySnapshot) => {
      const episodesData = [];
      querySnapshot.forEach((doc) => {
        episodesData.push({ id: doc.id, ...doc.data() });
      });
      setEpisodes(episodesData);
    },
    (error) => {
      console.error("Error fetching episodes:", error);
    }
  );

  return () => {
    unsubscribe();
  };
}, [id]);
  const remove = () => { 
    setPlayingFile("");
  }
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
                margin: "1rem",
              }}
            >
              <h1 className="podcast-title-heading">{podcast.title}</h1>
              {podcast.createdBy == auth.currentUser.uid && (
                <Button
                  width={"200px"}
                  text={"Create Episode"}
                  onClick={() => {
                    navigate(`/podcast/${id}/create-episode`);
                  }}
                />
              )}
            </div>

            <div className="banner-wrapper">
              <img alt="Banner" src={podcast.bannerImage} />
            </div>
            <p className="podcast-description">{podcast.description}</p>
            <h1 className="podcast-title-heading ">Episodes</h1>
            {episodes.length > 0 ? (
              <>
                {episodes.map((episode, index) => {
                  return (
                    <Episodedetail
                      key={index}
                      index={index + 1}
                      title={episode.title}
                      description={episode.description}
                      audioFile={episode.audioFile}
                      onClick={(file) => setPlayingFile(file)}
                    />
                  );
                })}
              </>
            ) : (
              <p>No Episodes</p>
            )}
          </>
        )}
      </div>
      {playingFile && (
        <AudioPlayer audioSrc={playingFile} image={podcast.displayImage} remove={remove } />
      )}
    </div>
  );
}

export default PodcastDetailPage