import { useState, useEffect } from 'react';
import axios from 'axios';
import PostCard from '../components/PostCard';

function Home() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/posts`)
      .then(res => {
        setPosts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const filtered = filter === 'all'
    ? posts
    : posts.filter(p => p.type === filter);

  return (
    <div className="container">
      <div className="home-header">
        <h1>📜 SwarLipi Vault</h1>
        <p>Where poetry breathes and lyrics sing.</p>
      </div>

      <div className="filter-buttons">
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={`filter-btn ${filter === 'poetry' ? 'active' : ''}`}
          onClick={() => setFilter('poetry')}
        >
          🌹 Poetry
        </button>
        <button
          className={`filter-btn ${filter === 'lyrics' ? 'active' : ''}`}
          onClick={() => setFilter('lyrics')}
        >
          🎵 Lyrics/Notations
        </button>
        <button
          className={`filter-btn ${filter === 'articles' ? 'active' : ''}`}
          onClick={() => setFilter('articles')}
        >
          📝 Articles
        </button>
      </div>

      {loading ? (
        <p className="loading">Loading creative works...</p>
      ) : filtered.length === 0 ? (
        <p className="no-posts">No posts yet. Be the first to share! ✨</p>
      ) : (
        <div className="posts-grid">
          {filtered.map(post => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;