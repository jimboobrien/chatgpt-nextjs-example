'use client'; // Required for client-side components

import { useState } from 'react';

interface OpenAIPromptProps {
  onSubmit: (prompt: string) => void;
  onReset: () => void;
}

export default function OpenAIPrompt({ onSubmit, onReset }: OpenAIPromptProps) {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [cost, setCost] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submitPrompt = async (e: React.FormEvent) => {
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
        setCost(data.cost);
      } else {
        setError(data.error || 'An error occurred while fetching the result.');
      }
    } catch (error) {
      setError('Failed to fetch data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  // Function to reset the form
  const resetForm = () => {
    setPrompt('');
    setResult('');
    setError('');
    setCost('');
  };

  return (
    <div>
      <form onSubmit={submitPrompt} className="openai-prompt-form">
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
      {result && (
        <div className="result-container">
          <h3>Result:</h3>
          <pre>{result}</pre>
        </div>
      )}
      {cost && (
        <div className="result-container">
          <h3>API Cost:</h3>
          <pre>{cost}</pre>
        </div>
      )}
    </div>
  );
}
