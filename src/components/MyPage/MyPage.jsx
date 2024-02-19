import { deleteUser } from 'firebase/auth'; // Import deleteUser function
import { auth } from '../../Firebase/firebase.js';
import { useAtom } from 'jotai';
import { useState } from 'react';
import Modal from '../Modal';
import { useNavigate } from 'react-router-dom';
import { errorAtom } from '../Atoms/Atoms.js';
import styles from './MyPage.module.css';
const MyPage = () => {
  const [error, setError] = useAtom(errorAtom);
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  // Function to handle user deletion
  const handleDeleteAccount = async () => {
    try {
      await deleteUser(auth.currentUser); // Delete the currently signed-in user
      setMessage('Account successfully deleted.');
      setShowModal(true);
      setTimeout(() => {
        navigate('/'); // Redirect to home page after successful deletion
      }, 2000);
    } catch (error) {
      setError(error.message);
      setMessage('Failed to delete account.');
      setShowModal(true);
      console.error(error);
    }
  };

  return (
    <div>

      <h1 className={styles.title}>My Page</h1>

      <div className={styles.ButtonWrap}>
      <button onClick={handleDeleteAccount} className={styles.signUpButton}>Delete My Account</button>
      </div>

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

export default MyPage;
