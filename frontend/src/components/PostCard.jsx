import { Link } from 'react-router-dom';

function PostCard({ post }) {
  return (
    <div className="post-card">
      <div className="post-card-type">
        {post.type === 'poetry' ? '🌹 Poetry' : '🎵 Lyrics'}
      </div>
      <h3 className="post-card-title">{post.title}</h3>
      <p className="post-card-content">{post.content}</p>
      <div className="post-card-footer">
        <span>✍️ {post.authorName}</span>
        <span>{post.genre}</span>
        <Link to={`/post/${post._id}`} className="read-more-btn">
          Read More →
        </Link>
      </div>
    </div>
  );
}

export default PostCard;