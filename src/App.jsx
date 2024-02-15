import Footer from './components/Footer';
import Navbar from './components/Navbar';
import './styles/normalize.css';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="max-w-md h-screen border">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
