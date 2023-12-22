// pages/Home.js
import React, { useState, useEffect } from 'react';
import { Input, List, Button, message } from 'antd';
import AddNote from './AddNote';
import { SearchOutlined } from '@ant-design/icons';
import { Card } from 'antd';
const { Item } = List;
import { deleteNote as apiDeleteNote, getNotes } from '../utils/network'; // Perubahan 1
import { Spin } from 'antd';



const Home = ({ notes, setNotes }) => {
  const [loading, setLoading] = useState(false);
  // Data hardcode untuk demonstrasi
  /*const [hardcodedNotes, setHardcodedNotes] = useState([
    { id: 1, title: 'Mata Kuliah Senin', createdAt: '2023-11-13', body: 'IT Governance, Etika Profesi' },
    { id: 2, title: 'Mata Kuliah Selasa', createdAt: '2023-11-14', body: 'Pemodelan Sistem Informasi, Technopreneurship 1' },
    { id: 3, title: 'Mata Kuliah Kamis', createdAt: '2023-11-14', body: 'Arsitektur dan Manajemen E-Business, Pemodelan Proses Bisnis' },
    { id: 4, title: 'Mata Kuliah Jumat', createdAt: '2023-11-14', body: 'Perencanaan Sumber Daya Perusahaan' },
    // Tambahkan catatan lain jika diperlukan
  ]);*/

  const [searchResults, setSearchResults] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Ambil catatan dari localStorage saat komponen dimount
    const storedNotes = JSON.parse(localStorage.getItem('noteData')) || [];
    setNotes(storedNotes);
    //setHardcodedNotes(storedNotes);
    setFilteredNotes(storedNotes); // Sesuaikan filteredNotes juga jika diperlukan
  }, [setNotes]); // Watch for changes in 'notes' prop

  useEffect(() => {
  const filtered = notes.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  setFilteredNotes(filtered);
  setSearchResults(filtered);
  }, [searchTerm, notes]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Set loading to true
        const { error, data } = await getNotes();
  
        if (!error) {
          setNotes(data);
          //updateLocalStorage(data);
        } else {
          console.error('Error fetching notes:', error);
        }
      } finally {
        setLoading(false); // Set loading to false, regardless of success or failure
      }
    };
  
    fetchData();
  }, []);
  


  const handleDelete = async (id) => {
    console.log('Deleting note with ID:', id);
  
    try {
      const response = await apiDeleteNote(id);
  
      if (!response.error) {
        // Remove the deleted note from local state immediately
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
        setSearchResults((prevResults) => prevResults.filter((note) => note.id !== id));
        setFilteredNotes((prevFiltered) => prevFiltered.filter((note) => note.id !== id));
        updateLocalStorage(notes.filter((note) => note.id !== id));
  
        // Show success message
        message.success('Note deleted successfully.');
      } else if (response.code === 404) {
        console.error('Note not found:', id);
        message.error('Note not found. Please refresh the page.');
      } else {
        console.error('Failed to delete note:', response.error);
        message.error('Failed to delete note. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting note:', error);
      message.error('Failed to delete note. Please try again.');
    }
  };


  const addNote = async (newNote) => {
    try {
      const { error, data } = await apiAddNote({
        title: newNote.title,
        body: newNote.body,
      });
  
      if (!error) {
        setNotes((prevNotes) => {
          const updatedNotes = [...prevNotes, data];
          updateLocalStorage(updatedNotes);
          return updatedNotes;
        });
      } else {
        console.error('Failed to add note:', error);
        // Handle error, show message, etc.
        message.error('Failed to add note. Please try again.');
      }
    } catch (error) {
      console.error('Error adding note:', error);
      // Handle error, show message, etc.
      message.error('Failed to add note. Please try again.');
    }
  };
  
  
  const updateLocalStorage = (updatedNotes) => {
    localStorage.setItem('noteData', JSON.stringify(updatedNotes));
  };

  useEffect(() => {
    updateLocalStorage(notes);
  }, [notes]);
  
  

  return (
    <section>
      <h2>Daftar Catatan</h2>
      <Input
        placeholder="Cari berdasarkan judul"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        suffix={<SearchOutlined />}
        style={{ marginBottom: '16px' }}
      />
       {loading ? (
      <Spin size="large" />
    ) : (
      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={searchResults}
        renderItem={(note) => (
          <List.Item>
            <Card
              title={
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>{note.title}</div>
                  <div>{new Date(note.createdAt).toLocaleDateString()}</div>
                </div>
              }
              actions={[
                <Button type="link" onClick={() => handleDelete(note.id)}>
                  Hapus
                </Button>,
              ]}
            >
              <p style={{ textAlign: 'left' }}>{note.body}</p>
            </Card>
          </List.Item>
        )}
      />
      )}
    </section>
  );
};

export default Home;