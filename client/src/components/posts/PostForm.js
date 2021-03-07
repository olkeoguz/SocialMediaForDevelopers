import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPost } from '../../actions/post';

const PostForm = () => {
  const dispatch = useDispatch();

  const [text, setText] = useState('');

  return (
    <div className='post-form'>
      <div className='bg-primary p'>
        <h3>Say Something...</h3>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(addPost({ text }));
          setText('');
        }}
        className='form my-1'
      >
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          name='text'
          cols='30'
          rows='5'
          placeholder='Create a post'
          required
        ></textarea>
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  );
};

export default PostForm;
