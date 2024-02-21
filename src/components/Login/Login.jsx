import styles from './Login.module.css';
import { auth } from '../../Firebase/firebase.js';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useAtom } from 'jotai';
import { userDataAtom } from '../Atoms/Atoms.js';
import Logo from '../../../public/logo.svg';
import { useState } from 'react';
import Modal from '../Modal.jsx';
import GoogleLogo from '../../../public/assets/Google/button.svg';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [userData, setUserData] = useAtom(userDataAtom);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      setUserData(userCredential.user);
      setMessage('Login success');
      setShowModal(true);
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error(error);
      setMessage('Login failed');
      setShowModal(true);
    }
  };

  const handleSignIn = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((data) => {
        setUserData(data.user);
        setMessage('Login success');
        setShowModal(true);
        setTimeout(() => {
          navigate('/');
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        setMessage('Login failed');
        setShowModal(true);
      });
  };

  return (
    <div className={styles.page}>
      <div className={styles.titleWrap}>
        <img src={Logo} alt="LOGO" className="w-[240px]" />
      </div>

      <div className={styles.contentWrap}>
        <div className={styles.inputIdTitle}>ID</div>
        <div className={styles.inputWrap}>
          <input
            className={styles.input}
            placeholder="test@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={styles.inputPwdTitle}>Password</div>
        <div className={styles.inputWrap}>
          <input
            className={styles.input}
            placeholder="PassWord"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col gap-10 justify-center items-center pt-14">
        <div className="flex gap-10">
          <button
            className="border-2 w-[189px] bg-blue-400 h-[40px] text-white rounded-md"
            onClick={handleLogin}
          >
            Sign In
          </button>
          <button
            onClick={() => navigate('./signup')}
            className="border-2 w-[189px] bg-blue-400 h-[40px] text-white rounded-md"
          >
            Sign Up
          </button>
        </div>
        <button onClick={handleSignIn}>
          <img src={GoogleLogo} alt="GooGle Login Button" />
        </button>
      </div>

      <div></div>

      {showModal && (
        <Modal
          title={message.toLowerCase().includes('failed') ? 'Fail' : 'Complete'}
          message={message}
          onClose={() => setShowModal(!showModal)}
        ></Modal>
      )}
    </div>
  );
};

export default Login;
