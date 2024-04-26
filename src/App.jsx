
import React, {useEffect, useState } from 'react';
import supabase from './supabaseClient';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css'
//import CreatePost from './CreatePost';
import PostDetail from './PostDetail';
import Home from './Home';



function App() {
  const [posts, setPosts] = useState([]);
  const [sortOrder, setSortOrder] = useState('created_at');

  // Fetch posts when the component mounts
  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('Posts')
        .select('*')
        .order(sortOrder, { ascending: false }); // Sort by selected order

      if (error) {
        console.error('Error fetching posts:', error.message);
      } else {
        setPosts(data);
      }
    };

    fetchPosts(); // Fetch posts when the component mounts
  }, [sortOrder]); // Re-fetch when sort order changes

  const handleSortChange = (e) => {
    setSortOrder(e.target.value); // Update sorting state when dropdown changes
  };

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]); // Prepend the new post to the state
  };

  return (
    <Router>
      <div>
        <h1>Hot Takes</h1>
        <label htmlFor="sort">Sort by:</label> 
        <select id="sort" onChange={handleSortChange} value={sortOrder}>
          <option value="created_at">Created Time</option> 
          <option value="upvotes">Upvotes</option> 
        </select>
      </div>

      <Routes>
        <Route
          path="/"
          element={<Home posts={posts} handlePostCreated={handlePostCreated} />}
        />
        <Route path="/post/:postId" element={<PostDetail />} /> 
      </Routes>
    </Router>
  )
}

export default App
