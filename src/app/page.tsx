
export default function Home() {
  return (
    <>
      <div className="main_wrapper">
        <h1>ChatGPT Examples</h1>
        <p>
          This is a collection of examples using OpenAI&apos;s ChatGPT model. The model is a large-scale transformer-based language model that can generate human-like text.
        </p>
        <div className="mb-3">
          <h2>Text Prompt</h2>
          <p>
            This allows you to generate text based on the prompt you enter.
          </p>
          <ul className="ul-list">
            <li>Text Prompt - regular prompt with text input and text output</li>
            <li>Image Prompt - select an image and use a prompt as input to output text from the image or describe the image to you.</li>
            <li>JSON Prompt - submit a text input and a JSON structure input, and receive an output of JSON</li>
          </ul>
        </div>
        <div className="mb-3">
          <h2>Image Prompt</h2>
          <p>
            This allows you to generate an image based on the prompt you enter.
          </p>
        </div>
        <div className="mb-3">
          <h2>DND Map</h2>
          <p>
            This allows you to generate an image for a DND map based on your input.
          </p>
          <ul className="ul-list">
            <li>MapType - the type of map. (regional, city map, battle map, dungeon map)</li>
            <li>MapGeo - the type of geography. (mountains, rivers, seas) </li>
            <li>MapStyle - the style of the map. (hand-drawn, realistic, fantasy)</li>
            <li>Prompt - enter in any additional details for the map. (climate, locations, any additional details)</li>
          </ul>
        </div>
      </div>
    </>
  );
}
