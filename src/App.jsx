import { useState, useEffect } from 'react';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Logo from '../public/logo.svg';
import './styles/normalize.css';
import { Outlet } from 'react-router-dom';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return isLoading ? (
    <div className="max-w-[500px] h-screen border m-auto bg-black">
      <img src={Logo} className="w-[287px] flex m-auto h-screen" />
    </div>
  ) : (
    <div
      className="max-w-[500px] h-screen border m-auto"
      style={{
        maxHeight: `calc(100vh - 60px )`,
        paddingTop: '86px',
      }}
    >
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
