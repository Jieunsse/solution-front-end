import Footer from './components/Footer';
import Navbar from './components/Navbar';
import './styles/normalize.css';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="max-w-[500px] h-screen border m-auto">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
