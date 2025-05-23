import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import Footer from "./Footer";
import '../Styles/AdminMedia.css'
import Base_URL from "../Config";

export default function AdminMedia() {
  const [mediaList, setMediaList] = useState([]);
  const [file, setFile] = useState(null);
  const [previewUrls, setPreviewUrls] = useState({});
  

  // Get JWT token from sessionStorage
  const getToken = () => sessionStorage.getItem("token");

  // Fetch list of media metadata
  const fetchMedia = () => {
    fetch(`${Base_URL}admin/all`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch media");
        return res.json();
      })
      .then((data) => {
        setMediaList(data);
      })
      .catch((err) => console.error("Fetch media failed", err));
  };

  // Fetch binary blobs for all media and create preview URLs
  const loadPreviews = async (mediaData) => {
    const urls = {};
    for (const media of mediaData) {
      try {
        const res = await fetch(`${Base_URL}admin/view/${media.id}`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        urls[media.id] = url;
      } catch (e) {
        console.error(`Preview fetch failed for ID ${media.id}`);
      }
    }
    setPreviewUrls(urls);
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  // After mediaList is set, load preview URLs
  useEffect(() => {
    if (mediaList.length > 0) loadPreviews(mediaList);
  }, [mediaList]);

  // Upload file with JWT
  const uploadFile = () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    fetch(`${Base_URL}admin/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      body: formData,
    })
      .then((res) => {
        if (!res.ok) throw new Error("Upload failed");
        setFile(null);
        fetchMedia();
      })
      .catch((err) => console.error("Upload error:", err));
  };

  // Delete media
  const deleteMedia = (id) => {
    fetch(`${Base_URL}admin/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Delete failed");
        fetchMedia();
      })
      .catch((err) => console.error("Delete error:", err));
  };

  return (
    <>
    <div className='AdminHeroSection'>
            <AdminNavBar />
            <div className="AdminHeroSectionText">
              <h1>Gallery <span style={{ color: "#28B896" }}>Section</span></h1>
            </div>
          </div>
    <div className="adminPanel">
      <h2>Media <span  style={{ color: "#28B896" }}>Management</span></h2>

      <div className="uploadSection">
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button onClick={uploadFile}>Upload</button>
      </div>

      <div className="mediaGallery">
        {mediaList.map((media) => (
          <div key={media.id} className="mediaItem">
            {media.type === "video" ? (
              <video
                src={previewUrls[media.id]}
                controls
                className="mediaPreview"
              />
            ) : (
              <img
                src={previewUrls[media.id]}
                alt="uploaded"
                className="ImageMediaPreview"
              />
            )}
            <button onClick={() => deleteMedia(media.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
    <Footer/>
    </>
  );
}
