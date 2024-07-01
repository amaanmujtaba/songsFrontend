import React, { useState } from 'react';

export default function Form({ onSubmit }) {
    const [playlistLink, setPlaylistLink] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
        onSubmit(playlistLink);  // Call the onSubmit function passed as a prop with the playlist link
    };

    return (
        <div className="flex flex-col align-middle justify-center items-center">
            <p className="text-xl text-yellow-400">Paste the Spotify playlist here</p>
            <p className="text-l text-yellow-400"> (Ideally less than 20 songs)</p>
            <form onSubmit={handleSubmit} className="flex flex-col align-middle justify-center items-center">
                <input
                    className="w-screen p-2 text-blue-900 my-1"
                    name="playlist"
                    placeholder="Playlist here"
                    value={playlistLink}
                    onChange={(e) => setPlaylistLink(e.target.value)} // Update the state with the input value
                />
                <button type="submit" className="bg-yellow-400 p-2 w-fit my-2">Download</button>
            </form>
        </div>
    );
}
