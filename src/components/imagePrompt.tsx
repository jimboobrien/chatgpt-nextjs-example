'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  //const [cost, setCost] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
        const response = await fetch('/api/createImage', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
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
        <h2>Image Generator</h2>
        <div>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt here"
            disabled={loading}
            rows={5}
            className="textarea"
          />
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
