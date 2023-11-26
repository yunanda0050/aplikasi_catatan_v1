// pages/Home.js
import React, { useState, useEffect } from 'react';
import { Input, List, Button } from 'antd';
import AddNote from './AddNote';
import { SearchOutlined } from '@ant-design/icons';
import { Card } from 'antd';
const { Item } = List;

const Home = ({ setNotes }) => {
  // Data hardcode untuk demonstrasi
  const [hardcodedNotes, setHardcodedNotes] = useState([
    { id: 1, title: 'Mata Kuliah Senin', createdAt: '2023-11-13', body: 'IT Governance, Etika Profesi' },
    { id: 2, title: 'Mata Kuliah Selasa', createdAt: '2023-11-14', body: 'Pemodelan Sistem Informasi, Technopreneurship 1' },
    { id: 3, title: 'Mata Kuliah Kamis', createdAt: '2023-11-14', body: 'Arsitektur dan Manajemen E-Business, Pemodelan Proses Bisnis' },
    { id: 4, title: 'Mata Kuliah Jumat', createdAt: '2023-11-14', body: 'Perencanaan Sumber Daya Perusahaan' },
    // Tambahkan catatan lain jika diperlukan
  ]);

  const [searchResults, setSearchResults] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Ambil catatan dari localStorage saat komponen dimount
    const storedNotes = JSON.parse(localStorage.getItem('noteData')) || [];
    setNotes(storedNotes);
    setHardcodedNotes(storedNotes);
    setFilteredNotes(storedNotes); // Sesuaikan filteredNotes juga jika diperlukan
  }, [setNotes]); // Watch for changes in 'notes' prop

  useEffect(() => {
  const filtered = hardcodedNotes.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  setFilteredNotes(filtered);
  setSearchResults(filtered);
  }, [searchTerm, hardcodedNotes]);

  const handleDelete = (id) => {
    setNotes((prevNotes) => {
      const updatedNotes = prevNotes.filter((note) => note.id !== id);
      localStorage.setItem('noteData', JSON.stringify(updatedNotes)); // Update localStorage
      setHardcodedNotes(updatedNotes); // Update hardcodedNotes state
      setFilteredNotes(updatedNotes); // Update filteredNotes state
      setSearchResults(updatedNotes); // Update searchResults state
      return updatedNotes;
    });
  };

  const addNote = (newNote) => {
    setNotes((prevNotes) => {
      const updatedNotes = [...prevNotes, newNote];
      localStorage.setItem('noteData', JSON.stringify(updatedNotes));
      setHardcodedNotes(updatedNotes);
      setFilteredNotes(updatedNotes);
      setSearchResults(updatedNotes);
      return updatedNotes;
    });
  };

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
      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={searchResults}
        renderItem={(note) => (
          <List.Item>
            <Card
              title={
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>{note.title}</div>
                  <div>{note.createdAt}</div>
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
    </section>
  );
};

export default Home;