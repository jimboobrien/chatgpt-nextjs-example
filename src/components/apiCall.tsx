'use client'; // Required for client-side components

import { useState } from 'react';

export default function OpenAIPrompt() {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const submitPrompt = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/createPrompt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      if (response.ok) {
        setResult(data.result);
      } else {
        console.error('Error:', data.error);
      }
    } catch (error) {
      console.error('Request failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <textarea 
        value={prompt} 
        onChange={(e) => setPrompt(e.target.value)} 
        placeholder="Enter your prompt here" 
      />
      <button onClick={submitPrompt} disabled={loading}>
        {loading ? 'Loading...' : 'Submit'}
      </button>
      {result && <p>Result: {result}</p>}
    </div>
  );
}
