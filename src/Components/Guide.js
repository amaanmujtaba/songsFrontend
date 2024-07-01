import React from 'react';

export default function Guide() {
    return (
        <div className="flex flex-col align-middle justify-center items-center p-4 rounded shadow-md my-4">
            <h2 className="text-2xl text-yellow-400 mb-2">How to Copy a Spotify Playlist Link</h2>
            <ol className="list-decimal list-inside text-left text-yellow-600">
                <li>Create the playlist you want to download</li>
                <li>Open Spotify and navigate to the playlist you want to copy.</li>
                <li>Click the three dots (•••) next to the playlist title.</li>
                <li>Select "Share" from the dropdown menu.</li>
                <li>Click on "Copy Link" to copy the playlist URL to your clipboard.</li>
                <li>Paste the link in the input field above.</li>
            </ol>
        </div>
    );
}