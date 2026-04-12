import { useState, useEffect } from 'react';
import axios from 'axios';
import PostCard from '../components/PostCard';

function Home() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/posts')
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
        <h1>🎭 The Creative Archive</h1>
        <p>A sanctuary for poetry and lyrics</p>
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
          🎵 Lyrics
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