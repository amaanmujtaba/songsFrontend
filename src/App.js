import logo from './logo.svg';
// import './App.css';
import { useEffect, useState } from 'react';
import React from 'react';
import Form from "./Components/Form";
import Guide from "./Components/Guide";
import Links from "./Components/Links";


function App() {
  const [playlist, setPlaylist] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [showLinks, setShowLinks] = useState(false);
  
  
  
  const [datas, setDatas] = useState([]);
  // useEffect(() => {
  //   // Simulating data fetch from backend
  //   const mockData = {
  //       links: [
  //           ["Mr. Saxobeat", "https://storage.googleapis.com/songs-6d89c.appspot.com/Mr.%20Saxobeat%20-%20Alexandra%20Stan.mp3?X-Goog-Algorithm=..."],
  //           ["Toxic", "https://storage.googleapis.com/songs-6d89c.appspot.com/Toxic%20-%20Britney%20Spears.mp3?X-Goog-Algorithm=..."],
  //           ["Candy Shop", "https://storage.googleapis.com/songs-6d89c.appspot.com/Candy%20Shop%20-%2050%20Cent.mp3?X-Goog-Algorithm=..."]
  //       ],
  //       message: "Download links generated"
  //   };

  //   setDatas(mockData);
  // }, []);



  const [data, setData] = useState(
    {
      string: ""
    }
  );
  function showGuideClicked(){
    setShowGuide(!showGuide)
  }

  function showLinksClicked(){
    setShowLinks(!showLinks);
  }

  const handleFormSubmit = async (playlistLink) => {
    setPlaylist(playlistLink);
    try {
      const response = await fetch('http://localhost:5000/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ link: playlistLink }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      setDatas(data.links);
      showLinksClicked();
      console.log(data);
    } catch (error) {
      console.log("Error:", error);
    }
  
    // You can now process the playlistLink, such as calling your backend API
    console.log("Playlist Link: BOOOO", playlistLink);
  };


useEffect(function(){
  fetch("/data").then(function(res){
    res.json().then(function(data){
      setData({
        string:data.string,
      })
    })
  })

}, [])



  return (
    
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white font-sans">
      <p>String: {data.string}</p>
      <header className="flex items-center justify-center text-3xl bg-gray-800 w-full p-4">
        <h1 className="text-3xl font-bold text-yellow-400">Download Music for Free</h1>
      </header>
      <main className="flex flex-col items-center justify-center container mx-auto mt-8">
        <Form onSubmit={handleFormSubmit}/>
        {!showLinks && showGuide ?<button className= "underline text-yellow-600" onClick={showGuideClicked}> 
          (Hide guide) </button>
          
           : <button className= "underline text-yellow-600" onClick={showGuideClicked}> 
          (Not sure? click here for help) </button>} 
        {showGuide && <Guide />} 
      </main>
      <div>
        <h1>Playlist Links</h1>
        {datas.length === 0 ? (
          <p>Something went wrong. Please try again.</p>
        ) : (
          <Links datas={datas} />
        )}
      </div>
  </div>
  );
}

export default App;
