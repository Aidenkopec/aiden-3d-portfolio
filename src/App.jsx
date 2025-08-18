import { BrowserRouter } from 'react-router-dom';

import {
  About,
  Contact,
  Experience,
  Feedbacks,
  Hero,
  Navbar,
  Tech,
  Projects,
  StarsCanvas,
} from './components';
import { MusicProvider } from './context/MusicContext';
import FloatingMusicBar from './components/FloatingMusicBar';

const App = () => {
  return (
    <BrowserRouter>
      <MusicProvider>
        <div className="relative z-0 bg-primary max-w-full overflow-x-hidden">
          <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
            <Navbar />
            <Hero />
          </div>
          <About />
          <Experience />
          <Tech />
          <Projects />
          <Feedbacks />
          <div className="relative z-0">
            <Contact />
            <StarsCanvas />
          </div>
          <FloatingMusicBar />
        </div>
      </MusicProvider>
    </BrowserRouter>
  );
};

export default App;
