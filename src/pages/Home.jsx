// pages/Home.js
import React from 'react';
import NoteList from '../components/NoteList';

const Home = () => {
  // Data hardcode untuk demonstrasi
  const mockData = [
    { id: 1, title: 'Mata Kuliah Senin', createdAt: '2023-11-13', body: 'IT Governance, Etika Profesi' },
    { id: 2, title: 'Mata Kuliah Selasa', createdAt: '2023-11-14', body: 'Pemodelan Sistem Informasi, Technopreunership 1' },
    { id: 3, title: 'Mata Kuliah Kamis', createdAt: '2023-11-14', body: 'Arsitektur dan Manajemen E-Business, Pemodelan Proses Bisnis' },
    { id: 4, title: 'Mata Kuliah Jumat', createdAt: '2023-11-14', body: 'Perencanaan Sumber Daya Perusahaan' },
    // Tambahkan catatan lain jika diperlukan
  ];

  return (
    <div>
      <div>
      <h1>Daftar Catatan</h1>
      </div>
      <div>
      <NoteList note={mockData} />
      </div>
    </div>
  );
};

export default Home;
