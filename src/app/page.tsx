
import RegularPrompt from '../components/regularPrompt';
import ImagePrompt from '../components/imagePrompt';
import DNDPrompt from '../components/dndPrompt';

export default function Home() {
  return (
      <div className="main_wrapper">
        { /* <RegularPrompt />
        <ImagePrompt /> */ }
        <DNDPrompt />
      </div>
  );
}
