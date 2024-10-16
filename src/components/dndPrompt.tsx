'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  //const [cost, setCost] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [mapType, setMapType] = useState('');
  const [mapGeo, setMapGeo] = useState('');
  const [mapStyle, setMapStyle] = useState('');


  const generateImage = async (e: React.FormEvent) => {
     //prevent default submit behavior
     e.preventDefault();

     // Reset error state
    setError('');

    // Check if the prompt is empty
    if (!prompt.trim()) {
        setError('Prompt cannot be empty.');
        return;
    }

    setLoading(true);
    try {
        const response = await fetch('/api/createDndMap', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ mapType, mapGeo, mapStyle, prompt }),
        });

        const data = await response.json();

        console.log( "data: ", data );

        if ( data ) {
            setImageUrl(data.result);
            //setCost(data.cost);
        } else {
            setError(data.error || 'An error occurred while fetching the result.');
        }
    } catch (error) {
        setError('Failed to fetch data. Please try again later.');
    } finally {
        setLoading(false);
    }
  };

  const resetForm = () => {
    setPrompt('');
    setImageUrl(null);
    setError('');
    //setCost('');
  };

  return (
    <div>
      <form onSubmit={generateImage} className="openai-prompt-form">
        <h2>DND Map Generator</h2>

        <div>
            <label htmlFor="mapType">MapType:</label>
            <input
                type="text"
                name="mapType"
                id="mapType"
                value={mapType}
                onChange={(e) => setMapType(e.target.value)}
                placeholder="Enter your map type here"
                disabled={loading}
                className=""
            />
            <p>This field should be the type of style, examples are below:</p>
            <ul>
                <li>Overworld/World Map</li>
                <li>Regional Map</li>
                <li>City or Town Map</li>
                <li>Dungeon or Building Floorplan</li>
                <li>Battle Map</li>
                <li>Hex Map</li>
            </ul>

        </div>

        <div>
            <select
                name="mapGeo"
                id="mapGeo"
                value={mapGeo}
                onChange={(e) => setMapGeo(e.target.value)}
            >
                <option value="Mountains">Mountains</option>
                <option value="Rivers">Rivers</option>
                <option value="Forests">Forests</option>
                <option value="Deserts">Deserts</option>
                <option value="Seas">Seas</option>
            </select>
        </div>

        <div>
            <select
                name="mapStyle"
                id="mapStyle"
                value={mapStyle}
                onChange={(e) => setMapStyle(e.target.value)}
            >
                <option value="Hand-drawn">Hand-drawn</option>
                <option value="Realistic">Realistic</option>
                <option value="Minimalistic">Minimalistic</option>
                <option value="Fantasy">Fantasy</option>
            </select>
        </div>

        <div>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt here"
            disabled={loading}
            rows={5}
            className="textarea"
          />
          <p>This is the prompt for anything else you would like to add to the map. Examples below:</p>
          <ul>
            <li>Key Locations: Towns, cities, villages, fortresses, ruins, dungeons, and notable landmarks.</li>
            <li>Climate Zones: Different areas with unique weather patterns (arctic, temperate, tropical, etc.).</li>
          </ul>
          {error && <p className="error-message">{error}</p>}
        </div>

        <div className="form-buttons">
          <button type="submit" disabled={loading} className="submit-button">
            {loading ? 'Loading...' : 'Submit'}
          </button>
          <button type="button" onClick={resetForm} disabled={loading} className="reset-button">
            Reset
          </button>
        </div>

      </form>
      {imageUrl && (
        <div className="result-container">
          <h3>Image Result:</h3>
          <div className="image-container">
            <Image src={imageUrl} alt="Generated Image"  fill={true} />
          </div>
          <pre>{imageUrl}</pre>
        </div>
      )}
    </div>
  );
}
