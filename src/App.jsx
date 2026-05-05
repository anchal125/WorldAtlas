import './App.css';
import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import { Navbar } from './Components/Navbar';
import { Footer } from './Components/Footer';
import { Loader } from './Components/Loader';
import { Canvas } from './Components/Canvas';
import { Sidebar } from './Components/Sidebar';
import { imgData } from './data';
import { useAppLogic } from './hooks/useAppLogic';

const Home = lazy(() => import('./Pages/Home').then(module => ({ default: module.Home })));
const Country = lazy(() => import('./Pages/Country').then(module => ({ default: module.Country })));
const Contact = lazy(() => import('./Pages/Contact').then(module => ({ default: module.Contact })));
const Error = lazy(() => import('./Pages/Error').then(module => ({ default: module.Error })));
const About = lazy(() => import('./Pages/About').then(module => ({ default: module.About })));
const CountryPg = lazy(() => import('./Pages/CountryPg').then(module => ({ default: module.CountryPg })));

function App() {
  const {
    theme,
    setTheme,
    expand,
    setExpand,
    showCanvas,
    visible,
    toggleCanvas,
    overlayRef,
    midstyle
  } = useAppLogic();

  return (
    <div data-theme={theme} className="app">
      {showCanvas && imgData.map((details, index) => (
        <Canvas key={index} details={details} />
      ))}

      <div className="cursor"></div>
      <Navbar setExpand={setExpand} setTheme={setTheme} theme={theme} />
      {expand && <Sidebar expand={setExpand} setTheme={setTheme} theme={theme} />}

      <span
        ref={overlayRef}
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'rgb(232, 7, 7,.5)',
          width: '0',
          height: '0',
          opacity: 0,
          zIndex: 0,
          pointerEvents:'none'
        }}
      />

      <b
        className="toggleCanvas"
        onClick={toggleCanvas}
        style={{
          marginTop: '47.3px',
          cursor: 'pointer',
          fontSize: '1.2rem',
          userSelect: 'none',
          alignSelf: 'start'
        }}
      >
        Click on me
      </b>

      <div className="middle" style={midstyle}>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/About" element={<About />} />
            <Route path="/Country" element={<Country />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/Country/:name" element={<CountryPg />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </Suspense>
      </div>

      {visible && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll to top"
          className="scrollUp"
        >
          <FaArrowUp className="arrowup" size="15" />
        </button>
      )}

      <Footer />
    </div>
  );
}

export default App;
