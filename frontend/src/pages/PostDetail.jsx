import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { token, username } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/posts/${id}`)
      .then(res => {
        setPost(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/');
    }
  };

  if (loading) return <p className="loading">Loading...</p>;
  if (!post) return <p className="loading">Post not found!</p>;

  return (
    <div className="container">
      <div className="post-detail">
        <p className="post-detail-type">
          {post.type === 'poetry' ? '🌹 Poetry' : '🎵 Lyrics'}
        </p>
        <h1 className="post-detail-title">{post.title}</h1>
        <p className="post-detail-meta">
          ✍️ By {post.authorName} &nbsp;|&nbsp;
          🎭 {post.genre} &nbsp;|&nbsp;
          📅 {new Date(post.createdAt).toLocaleDateString()}
        </p>
        <p className="post-detail-content">{post.content}</p>

        {username === post.authorName && (
          <div className="post-detail-actions">
            <button
              className="btn-edit"
              onClick={() => navigate(`/edit/${post._id}`)}
            >
              ✏️ Edit
            </button>
            <button className="btn-danger" onClick={handleDelete}>
              🗑️ Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default PostDetail;