// pages/BlogPost.tsx
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


const Post: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const location = useLocation();
    const { state:post } = location;
    console.log('Post slug:', slug);
    console.log('Post state:', post);
  
  if (!post) return <div>Post not found</div>;
  
  return (
    <article>
      <h1>{post.title}</h1>
      {post.subtitle && <h2>{post.subtitle}</h2>}
      <div>{post.content}</div>
    </article>
  );
};

export default Post;