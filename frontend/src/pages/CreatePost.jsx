import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState('poetry');
  const [genre, setGenre] = useState('');
  const [error, setError] = useState('');
  const { token } = useAuth();
  const navigate = useNavigate();

  if (!token) {
    navigate('/login');
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/posts`,
        { title, content, type, genre },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create post');
    }
  };

  return (
    <div className="form-container">
      <h2>Share Your Creation 🎭</h2>
      {error && <p className="error-msg">{error}</p>}
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          placeholder="Give your work a title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Type</label>
        <select value={type} onChange={e => setType(e.target.value)}>
          <option value="poetry">🌹 Poetry</option>
          <option value="lyrics">🎵 Lyrics</option>
        </select>
      </div>
      <div className="form-group">
        <label>Genre</label>
        <input
          type="text"
          placeholder="e.g. Romantic, Sad, Motivational, Rap"
          value={genre}
          onChange={e => setGenre(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Content</label>
        <textarea
          placeholder="Write your poem or lyrics here..."
          value={content}
          onChange={e => setContent(e.target.value)}
        />
      </div>
      <button className="btn-primary" onClick={handleSubmit}>
        Publish ✨
      </button>
    </div>
  );
}

export default CreatePost;