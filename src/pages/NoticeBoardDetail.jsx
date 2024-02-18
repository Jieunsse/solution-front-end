import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  doc,
  getDoc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import Modal from '../components/Modal';
import db from '../Firebase/firebase';

function DetailPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [postData, setPostData] = useState({});
  const [formData, setFormData] = useState('');
  const [comments, setComments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');

  const fetchData = async (id) => {
    try {
      const postDocRef = doc(db, 'noticeBoard', id);
      const postDocSnap = await getDoc(postDocRef);
      if (postDocSnap.exists()) {
        setPostData(postDocSnap.data());
      } else {
        console.log('No such document!');
      }

      const commentRef = collection(db, 'comments');
      const q = query(commentRef, where('pageId', '==', id));
      const querySnapshot = await getDocs(q);
      const commentsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComments(commentsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(id);
  }, [id]);

  const postComment = async () => {
    try {
      const newDocumentId = uuidv4();
      const currentTime = new Date();
      await setDoc(doc(db, 'comments', newDocumentId), {
        pageId: id,
        comment: formData,
        timestamp: currentTime,
      });
      setFormData('');
      fetchData(id);
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.trim() === '' || formData.trim().length < 4) {
      setShowModal(true);
      setMessage(
        'Please exclude data that is 4 characters or fewer, including blank spaces!',
      );
      return;
    }

    try {
      await postComment();
      setShowModal(true);
      setMessage('Complete!');
    } catch (error) {
      console.error('Error posting comment:', error);
      setMessage('Fail');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setMessage('');
  };

  const handleChange = (e) => {
    const { value } = e.target;
    if (/^[A-Za-z\s]*$/.test(value)) {
      setFormData(value);
    } else {
      setShowModal(true);
      setMessage('Please write comments in English only!');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-md max-h-screen pl-4">
      <h1 className="text-2xl font-bold">{postData.title}</h1>
      <div className="mb-4">
        <h1>Title: {postData.title}</h1>
        <p className="mb-2">
          Duration: {postData.startDate} ~ {postData.endDate}
        </p>
        <p>Content: {postData.mainContent}</p>
      </div>
      <div className="mb-4">
        <h4 className="text-xl font-bold mb-2">Comments</h4>
        <ul>
          {comments.map((comment) => (
            <li key={comment.id} className="mb-2 h-7">
              <div className="text-sm">{comment.comment}</div>
              <div className="text-sm text-gray-500">
                time: {comment.timestamp.toDate().toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <form onSubmit={handleSubmit} className="mb-2">
        <input
          type="text"
          value={formData}
          onChange={handleChange}
          placeholder="Write a comment"
          className="px-3 py-2 "
        />
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Write
        </button>
      </form>
      {showModal && (
        <Modal
          title={message.startsWith('Complete!') ? 'Good job!' : 'Fail!'}
          message={message}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

export default DetailPage;
