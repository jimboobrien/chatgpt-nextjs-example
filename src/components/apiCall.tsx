/*
'use client'
import { useState, useEffect } from 'react'

export default function MyComponent() {
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/createPrompt') // Replace with your API endpoint 
      const data = await res.json()
      setData(data)
    }
    fetchData()
  }, [])

  if (!data) return <div>Loading...</div>

  return (
    <div>
      {/* Display the fetched data }
      {data.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  )
}
*/

'use client';

import { useState } from 'react';

export default function SendMessage() {
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);

  const sendMessage = async () => {
    try {
      const res = await fetch('/api/createPrompt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [{ role: 'user', content: 'Hello!' }],
        }),
      });

      const data = await res.json();
      setResponseData(data);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div>
      <button onClick={sendMessage}>Send Message</button>
      {responseData && <pre>{JSON.stringify(responseData, null, 2)}</pre>}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
}


