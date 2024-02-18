import { useEffect, useState } from 'react';
import {
  getDocs,
  collection,
  query,
  orderBy,
  doc,
  deleteDoc,
} from 'firebase/firestore';
import { Link } from 'react-router-dom';
import db from '../Firebase/firebase';
import { useAtom } from 'jotai';
import { userDataAtom } from '../components/Atoms/Atoms';

function NoticeBoard() {
  const [loading, setLoading] = useState(true);
  const [noticeBoardData, setNoticeBoardData] = useState([]);
  const [userData] = useAtom(userDataAtom);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const q = query(collection(db, 'noticeBoard'), orderBy('title'));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNoticeBoardData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error getting documents:', error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'noticeBoard', id));
      fetchData();
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };

  return (
    <div className="overflow-y-auto">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="flex flex-col gap-1 mt-12">
          {noticeBoardData.map((item) => (
            <li
              key={item.id}
              className="border rounded-md w-11/12 m-auto h-20 flex"
              style={{ backgroundColor: '#E4E4E4' }}
            >
              <Link
                to={`/noticeBoard/detail/${item.id}`}
                className="rounded-lg"
              >
                <h2 className="text-xl font-semibold line-clamp-1">
                  Title: {item.title}
                </h2>
                <p className="text-gray-600">
                  Duration: {item.startDate} ~ {item.endDate}
                </p>
                <p className="text-gray-600 line-clamp-1">
                  Content: {item.mainContent}
                </p>
              </Link>
              {userData && userData.uid === item.authorId && (
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default NoticeBoard;
