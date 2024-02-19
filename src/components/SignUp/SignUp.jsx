import styles from './SignUp.module.css';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../Firebase/firebase.js';
import { useAtom } from 'jotai';
import Logo from '../../../public/logo.svg';
import { emailAtom, passwordAtom, errorAtom } from '../Atoms/Atoms.js';
import { useState } from 'react';
import Modal from '../Modal';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useAtom(emailAtom);
  const [password, setPassword] = useAtom(passwordAtom);
  const [error, setError] = useAtom(errorAtom);
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;
    if (name === 'email') setEmail(value);
    else if (name === 'password') setPassword(value);
    else if (name === 'name') setName(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let data;
    if (password.length < 6) {
      setMessage('Password must be at least 6 characters long.');
      setShowModal(true);
      return;
    }
    try {
      data = await createUserWithEmailAndPassword(auth, email, password);
      setMessage('Sign up successful!');
      setShowModal(true);
      console.log(data);
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    } catch (error) {
      setError(error.message);
      setMessage(
        'Sign up failed. Same email address cannot be used for registration.',
      );
      setShowModal(true);
      console.log(error);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.titleWrap}>
        <img src={Logo} alt="LOGO" className="flex w-[240px]" />
      </div>

      <form onSubmit={onSubmit}>
        <div className={styles.inputIdTitle}>Name</div>
        <div className={styles.inputWrap}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            required
            value={name}
            onChange={onChange}
            className={styles.input}
          />
        </div>

        <div className={styles.inputIdTitle}>ID</div>
        <div className={styles.inputWrap}>
          <input
            type="text"
            name="email"
            placeholder="Email"
            required
            value={email}
            onChange={onChange}
            className={styles.input}
          />
        </div>

        <div className={styles.inputPwdTitle}>Password</div>

        <div className={styles.inputWrap}>
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={onChange}
            className={styles.input}
          />
        </div>

        <div className={styles.ButtonWrap}>
          <input
            type="submit"
            value={'SignUp'}
            className={styles.signUpButton}
          />
        </div>
      </form>
      {showModal && (
        <Modal
          title={message.toLowerCase().includes('fail') ? 'Fail' : 'Complete'}
          message={message}
          onClose={() => setShowModal(false)}
        ></Modal>
      )}
    </div>
  );
};

export default SignUp;
