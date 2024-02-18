import { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import db from '../Firebase/firebase';
import Modal from '../components/Modal';
import { userDataAtom } from '../components/Atoms/Atoms';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';

function BoardWrite() {
  const navigate = useNavigate();
  const [userData] = useAtom(userDataAtom);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    startDate: '',
    endDate: '',
    mainContent: '',
  });

  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'mainContent' && value.length > 500) {
      setError('Main Content cannot exceed 500 characters.');
      return;
    }

    const koreanCharacters = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

    if (koreanCharacters.test(value)) {
      setError('Please Write English.');
      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isFormValid()) return;

    try {
      await saveData();
      clearForm();
      setIsOpen(true);
    } catch (error) {
      console.error('error:', error);
    }
  };

  if (!userData) {
    return <>{!isOpen && navigate('/login')}</>;
  }

  const isFormValid = () => {
    const { title, startDate, endDate, mainContent } = formData;
    const startsWithNumber = /^\d/;

    if (!title.trim() || !startDate || !endDate.trim() || !mainContent.trim()) {
      setError('All fields must be filled out.');
      return false;
    }

    if (title.length < 4 || mainContent.length < 4) {
      setError(
        'Please exclude data that is 4 characters or fewer, including blank spaces!',
      );
      return false;
    }

    if (startsWithNumber.test(title) || startsWithNumber.test(mainContent)) {
      setError('The title and main content cannot start with a number.');
      return false;
    }

    return true;
  };

  const saveData = async () => {
    try {
      const newDocumentId = uuidv4();
      await setDoc(doc(db, 'noticeBoard', newDocumentId), {
        title: formData.title,
        startDate: formData.startDate,
        endDate: formData.endDate,
        mainContent: formData.mainContent,
        authorId: userData.uid,
      });
      setIsOpen(true);
    } catch (error) {
      console.error('Error saving document:', error);
    }
  };

  const clearForm = () => {
    setFormData({
      title: '',
      startDate: '',
      endDate: '',
      mainContent: '',
    });
  };

  return (
    <div className="max-w-md pl-2">
      <h1 className="text-md">Write Page</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <FormField
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Please Write Title"
        />
        <FormField
          label="Start"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          type="date"
        />
        <FormField
          label="End"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          type="date"
        />
        <FormField
          label="Main Content"
          name="mainContent"
          value={formData.mainContent}
          onChange={handleChange}
          placeholder="Please Write Your Contents"
          textarea
        />
        <button
          type="submit"
          className="rounded-md w-24 bg-blue-500 text-white h-8"
        >
          Submit
        </button>
      </form>
      {isOpen && (
        <Modal
          message="Complete."
          title="Good Job"
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}

function FormField({
  label,
  name,
  value,
  onChange,
  placeholder,
  type,
  textarea,
}) {
  if (textarea) {
    return (
      <div>
        <label>{label}</label>
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          className="w-72 h-60 bg-gray-300 text-white text-[14px] flex p-2"
          placeholder={placeholder}
        />
      </div>
    );
  }

  return (
    <div>
      <label>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-72 h-8 bg-gray-300 text-white text-sm pl-2 flex"
        placeholder={placeholder}
      />
    </div>
  );
}

FormField.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  textarea: PropTypes.bool,
};

export default BoardWrite;
