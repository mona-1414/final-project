import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import supabase from './supabaseClient';

const PostDetail = () => {
  const { postId } = useParams(); // Get post ID from route parameters
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]); // State for comments
  const [newComment, setNewComment] = useState(''); // State for new comment
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState(''); // State for the post content
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      console.log('Fetching post with ID:', postId); // Debugging output

      const { data, error } = await supabase
        .from('Posts')
        .select('*')
        .eq('id', postId) // Fetch the post by ID
        .single(); // Get a single post

      if (error) {
        console.error('Error fetching post:', error.message); // Log any errors
        setLoading(false); // Stop loading if there's an error
      } else {
        console.log('Fetched post:', data); // Debugging output
        setPost(data); // Set the post data
        setLoading(false); // Stop loading
        setContent(data.content);

      }
    };

    fetchPost(); // Fetch the post when the component mounts
  }, [postId]); // Dependency on postId to re-fetch if the ID changes



  useEffect(() => {
    const fetchComments = async () => {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('post_id', postId) // Fetch comments for this post
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching comments:', error.message);
      } else {
        setComments(data); // Set the comments state
      }
    };

    fetchComments(); // Fetch comments when the component mounts
  }, [postId]); 




  const handleAddComment = async (e) => {
    e.preventDefault();
  
    const { data, error } = await supabase
      .from('comments')
      .insert([{ post_id: postId, content: newComment }]);
  
    if (error) {
      console.error('Error adding comment:', error.message);
    } else {
      setNewComment(''); // Clear the form
      fetchComments(); // Re-fetch comments to ensure the state is updated
    }
  };
  
  const fetchComments = async () => {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('post_id', postId)
      .order('created_at', { ascending: false});
  
    if (error) {
      console.error('Error fetching comments:', error.message);
    } else {
      setComments(data); // Set the comments state
    }
  };

  const handleUpvote = async () => {
    if (post) { // Ensure there's a valid post to update
      const { data, error } = await supabase
        .from('Posts')
        .update({ upvotes: (post.upvotes || 0) + 1 }) // Increment upvotes
        .eq('id', postId) // Update the correct post
        .select(); // Ensure updated data is returned
  
      if (error) {
        console.error('Error upvoting post:', error.message);
      } else {
        setPost(data[0]); // Update state with the updated post
      }
    }
  };
  



  const handleEditPost = async (e) => {
    e.preventDefault();
  
    const { data, error } = await supabase
      .from('Posts') // Ensure correct table name
      .update({ content }) // Update the content field
      .eq('id', postId) // Find the correct post by ID
      .select(); // Return the updated data
  
    if (error) {
      console.error('Error editing post:', error.message); // Handle errors
    } else {
      setPost(data[0]); // Update the state with the edited post
      setEditMode(false); // Exit edit mode
    }
  };


  const handleDeletePost = async () => {
    const { error } = await supabase
      .from('Posts') // Ensure the correct table name
      .delete() // Delete the post
      .eq('id', postId); // Delete the correct post by ID
  
    if (error) {
      console.error('Error deleting post:', error.message); // Log errors
    } else {
      window.history.back(); // Navigate back to the previous page after deletion
    }
  };




  if (loading) {
    return <p>Loading...</p>; // Show loading while fetching data
  }

  if (!post) {
    return <p>Post not found</p>; // Message if post data is not found
  }


  return (
    <div>
      <h2>{post.title}</h2> 
      {editMode ? (
        <form onSubmit={handleEditPost}> {/* Form to edit the content */}
          <label>
            Edit Content:
            <textarea
              value={content} // Bind the content to the textarea
              onChange={(e) => setContent(e.target.value)} // Update the content
            />
          </label>
          <button type="submit">Save Changes</button> {/* Button to save changes */}
        </form>
      ) : (
        <div>
          <p>{post.content}</p> {/* Display the content */}
          <button onClick={() => setEditMode(true)}>Edit Content</button> {/* Button to enter edit mode */}
        </div>
      )} 


      <button onClick={handleUpvote}>Upvote {post.upvotes || 0}</button> 

      <h3>Comments</h3>
      <form onSubmit={handleAddComment}> 
        <label>
          Add a Comment:
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)} // Input for new comment
          />
        </label>
        <button type="submit">Add Comment</button> 
      </form>

      {comments.length > 0 ? (
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>{comment.content}</li> 
          ))}
        </ul>
      ) : (
        <p>No comments yet.</p> 
      )}

    <button
    onClick={() => {
        
        handleDeletePost(); // Call the deletion function
      
    }}
    >
    Delete Post
    </button>

    </div>
  );
};

export default PostDetail;
