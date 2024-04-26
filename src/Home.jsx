import React, {useState} from 'react';
import { Link } from 'react-router-dom'; // Importing Link for routing
import CreatePost from './CreatePost';

const Home = ({ posts, handlePostCreated }) => {

    

    const [searchQuery, setSearchQuery] = useState(''); // Search state

    // Filter the list of posts based on the search query
    const filteredPosts = posts.filter((post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
    const handleSearchChange = (e) => {
      setSearchQuery(e.target.value); // Update search query as input changes
    };  
    
 return(
    <div>
    
    <input
      type="text"
      placeholder="Search by title..." // Search input field
      value={searchQuery}
      onChange={handleSearchChange} // Event handler for input changes
    />
    <CreatePost onPostCreated={handlePostCreated} />
    <div>
      {filteredPosts.length > 0 ? (
        filteredPosts.map((post) => (
          <div key={post.id}>
            <h2>
              <Link to={`/post/${post.id}`}>{post.title}</Link> 
            </h2>
            <p>Created at: {new Date(post.created_at).toLocaleString()}</p> 
            <p>Upvotes: {post.upvotes || 0}</p> 
          </div>
        ))
      ) : (
        <p>No matching posts.</p> 
      )}
    </div>
  </div>
)};

export default Home;
