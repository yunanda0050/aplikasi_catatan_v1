// pages/AddNote.js
import React, { useState, useEffect } from 'react';
import { Input, Button, message } from 'antd';
import { Link, useNavigate  } from 'react-router-dom';

const AddNote = ({ addNote, setNotes }) => {
  const navigate = useNavigate();

  if (typeof addNote !== 'function') {
    console.error('addNote is not a function');
    return null; // or handle the error in some way
  }
  
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    setIsDisabled(!(title.trim() !== '' && body.trim() !== ''));
  }, [title, body]);

  const handleSubmit = async () => {
    const newNote = {
      id: new Date().getTime(),
      title,
      body,
      createdAt: new Date().toLocaleDateString(),
    };

    try {
      await addNote(newNote);
      setTitle('');
      setBody('');
      navigate('/home');
    } catch (error) {
      console.error('Failed to add note:', error);
      // Handle error, show message, etc.
      message.error('Failed to add note. Please try again.');
    }
  };
  
  return (
    <section>
      <h2>Tambah Catatan</h2>
      <Input
        placeholder="Judul"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ marginBottom: '16px' }}
      />
      <Input.TextArea
        placeholder="Isi Catatan"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        style={{ marginBottom: '16px' }}
      />
      <Button type="primary" disabled={isDisabled} onClick={handleSubmit} style={{ marginRight: '16px', backgroundColor: isDisabled ? '#d9d9d9' : '#1890ff',
        borderColor: isDisabled ? '#d9d9d9' : '#1890ff', }}>
        Tambah Catatan
      </Button>
      <Link to="/home">Kembali ke Daftar Catatan</Link>
    </section>
  );
};

export default AddNote;