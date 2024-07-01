// Links.js
import React, { useEffect, useState } from "react";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebase";

const Links = ({ datas }) => {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const fetchUrls = async () => {
      const urlPromises = datas.map(async (link) => {
        const url = await getDownloadURL(ref(storage, link[1]));
        console.log("url downloaded", url)
        return [link[0], url];
      });
      const resolvedUrls = await Promise.all(urlPromises);
      setUrls(resolvedUrls);
    };

    fetchUrls();
  }, [datas]);


  const handleDownload = (url, name) => {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", name);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      })
      .catch((error) => console.error("Error downloading:", error));
  };

  

  return (
    <div>
      {urls.map((link, index) => (
        <li>
        <a key={index} href={link[1]} download={link[0]} target="_blank" rel="noopener noreferrer">
          {link[0]}
        </a>
        </li>
      ))}
    </div>
  );
};

export default Links;