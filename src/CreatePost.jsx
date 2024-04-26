import React, { useState } from 'react';
import supabase from './supabaseClient';

const CreatePost = ({ onPostCreated }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Insert a new post into the Supabase "posts" table
    const { data, error } = await supabase
      .from('Posts')
      .insert([{ title, content, image_url: imageUrl }]);

    if (error) {
      console.error('Error creating post:', error.message);
      return;
    }

    // Clear form fields after successful submission
    setTitle('');
    setContent('');
    setImageUrl('');

    // Notify parent component about the new post
    if (onPostCreated && data.length > 0) {
      onPostCreated(data[0]);
    }
  };

  return (
    <div>
      <h2>Create a New Post</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Content (optional):
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </label>
        <br />
        <label>
          Image URL (optional):
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
