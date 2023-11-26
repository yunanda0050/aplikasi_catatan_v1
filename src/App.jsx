// App.js
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './pages/Home';
import { Navigation } from './components/Navigation';
import AddNote from './pages/AddNote';

const App = () => {
  const [notes, setNotes] = useState([]);

  const addNote = (newNote) => {
    setNotes((prevNotes) => {
      const updatedNotes = [...prevNotes, newNote];
      localStorage.setItem('noteData', JSON.stringify(updatedNotes));
      return updatedNotes;
    });
  };

  return (
    <div>
      <header>
        <h1>Aplikasi Catatan</h1>
        <Navigation />
      </header>
      <main>
        <Routes>
          <Route
            path="/"
            element={<Home notes={notes} setNotes={setNotes} />}
          />
          <Route
            path="/add"
            element={<AddNote addNote={addNote} setNotes={setNotes} />}
          />
        </Routes>
      </main>
    </div>
  );
};

export default App;
