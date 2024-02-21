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
import Trash from '../../public/assets/icons/trash.svg';
import { Card, CardHeader, CardBody, CardFooter, Divider, Image, Button } from "@nextui-org/react";

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
        <div className="flex flex-col gap-1 mt-12 flex-1 mb-4">

          <div className="flex justify-center items-center">
          <Card className="w-40 mb-10">
            <CardBody className="text-center">
              <p className="text-bold text-lg">📢 Notice</p>
            </CardBody>
          </Card>
          </div>


          {noticeBoardData.map((item) => (
            <Card key={item.id} className="mt-4">
              <CardHeader className="flex gap-3">
                <Image
                  alt="nextui logo"
                  height={40}
                  radius="sm"
                  src="src/assets/miniLogo/miniLogo.svg"
                  width={40}
                />
                <div className="flex flex-col">
                  <p className="text-md">The Volunteers</p>
                  <p className="text-small text-default-500">Official</p>
                </div>
              </CardHeader>
              <Divider />
              <CardBody>
                <h2 className="text-xl font-semibold line-clamp-1">
                  Title: {item.title}
                </h2>
                <p className="text-default-500 text-sm mb-2">
                  Duration: {item.startDate} ~ {item.endDate}
                </p>
                <p className="text-gray-600 line-clamp-1 mt-2">
                  Content: {item.mainContent}
                </p>
              </CardBody>
              <Divider />
              <CardFooter className="flex justify-between">
                <Button color="primary">
                  <Link to={`/noticeBoard/detail/${item.id}`}>View Details</Link>
                </Button>
                {userData && userData.uid === item.authorId && (
                  <img
                    onClick={() => handleDelete(item.id)}
                    src={Trash}
                    className="cursor-pointer w-8 justify-items-end"
                    alt="trash"
                  />
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default NoticeBoard;
