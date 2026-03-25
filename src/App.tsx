import { createGlobalStyle } from 'styled-components';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Navigation from './components/Navigation';
import ParticlesBackground from './components/ParticlesBackground';
import Footer from './components/Footer';
import styled from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: #05070a;
    color: #f5f7fa;
    overflow-x: hidden;
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #05070a;
  }

  ::-webkit-scrollbar-thumb {
    background: #1d2a39;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #2f4258;
  }

  ::selection {
    background: rgba(6, 182, 212, 0.3);
    color: #f5f7fa;
  }
`;

const MainContent = styled.main`
  position: relative;
  z-index: 1;
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <ParticlesBackground />
      <MainContent>
        <Navigation />
        <Hero />
        <About />
        <Projects />
          <Footer />
      </MainContent>
    </>
  );
}

export default App;
