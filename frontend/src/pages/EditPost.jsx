import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState('poetry');
  const [genre, setGenre] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();
  const navigate = useNavigate();

  // Fetch existing post data
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/posts/${id}`)
      .then(res => {
        setTitle(res.data.title);
        setContent(res.data.content);
        setType(res.data.type);
        setGenre(res.data.genre);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  // If not logged in, redirect
  if (!token) {
    navigate('/login');
    return null;
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/posts/${id}`,
        { title, content, type, genre },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate(`/post/${id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update post');
    }
  };

  if (loading) return <p className="loading">Loading...</p>;

  return (
    <div className="form-container">
      <h2>Edit Your Creation ✏️</h2>
      {error && <p className="error-msg">{error}</p>}

      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Type</label>
        <select value={type} onChange={e => setType(e.target.value)}>
          <option value="poetry">🌹 Poetry</option>
          <option value="lyrics">🎵 Lyrics/Notations</option>
          <option value="articles">📝 Articles</option>
        </select>
      </div>

      <div className="form-group">
        <label>Genre</label>
        <input
          type="text"
          placeholder="e.g. Romantic, Sad, Motivational"
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

      <div style={{ display: 'flex', gap: '10px' }}>
        <button className="btn-primary" onClick={handleUpdate}>
          Save Changes ✅
        </button>
        <button
          className="btn-danger"
          onClick={() => navigate(`/post/${id}`)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default EditPost;