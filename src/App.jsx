// App.js
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import { Navigation } from './components/Navigation';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import AddNote from './pages/AddNote';
import { putAccessToken, getUserLogged, addNote as apiAddNote, getNotes, deleteNote as apiDeleteNote } from './utils/network';

const App = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [authUser, setAuthUser] = useState(null);

  const onLoginSuccess = async ({ accessToken }) => {
    console.log(accessToken, 'onLoginSuccess');
    putAccessToken(accessToken);

    try {
      const { error, data } = await getUserLogged();
      if (!error) {
        setAuthUser(data);

        /*const notesResponse = await getNotes();
        if (!notesResponse.error) {
          setNotes(notesResponse.data);
        }*/

        navigate('/home');
      } else {
        setAuthUser(null);
        setNotes([]);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const onLogout = () => {
    localStorage.removeItem('accessToken');
    setAuthUser(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      const { error, data } = await getUserLogged();
      if (!error) {
        setAuthUser(data);

        /*const notesResponse = await getNotes();
        if (!notesResponse.error) {
          setNotes(notesResponse.data);
        }*/
      } else {
        setAuthUser(null);
        //setNotes([]);
      }
    };

    fetchData();
  }, []);

  const addNote = async (newNote) => {
    const { error, data } = await apiAddNote({
      title: newNote.title,
      body: newNote.body,
    });

    if (!error) {
      setNotes((prevNotes) => {
        const updatedNotes = [...prevNotes, data];
        localStorage.setItem('noteData', JSON.stringify(updatedNotes));
        return updatedNotes;
      });
    } else {
      console.error('Failed to add note:', error);
    }
  };

  const deleteNote = async (id) => {
    try {
      const response = await apiDeleteNote(id);

      if (!response.error) {
        setNotes((prevNotes) => {
          const updatedNotes = prevNotes.filter((note) => note.id !== id);
          localStorage.setItem('noteData', JSON.stringify(updatedNotes));
          return updatedNotes;
        });
      } else {
        console.error('Failed to delete note:', response.error);
        // Handle error, show message, etc.
        message.error('Failed to delete note. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting note:', error);
      // Handle error, show message, etc.
      message.error('Failed to delete note. Please try again.');
    }
  };

  return (
    <div>
      <header>
        <h1>Aplikasi Catatan</h1>
        <Navigation authUser={authUser} logout={onLogout} />
      </header>
      <main>
        <Routes>
          <Route
            path="/"
            element={<LoginPage onLoginSuccess={onLoginSuccess} />}
          />
          <Route path="/register" element={<RegisterPage onRegisterSuccess={() => {}} />} />
          {authUser !== null && (
            <>
              <Route
                path="/home"
                element={<Home notes={notes} setNotes={setNotes} deleteNote={deleteNote} />}
              />
              <Route
                path="/add"
                element={<AddNote addNote={addNote} setNotes={setNotes} />}
              />
            </>
          )}
        </Routes>
      </main>
    </div>
  );
};

export default App;