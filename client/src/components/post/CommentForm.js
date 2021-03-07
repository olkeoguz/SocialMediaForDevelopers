import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addComment } from '../../actions/post';

const CommentForm = ({ postId }) => {
  const [text, setText] = useState('');

  const dispatch = useDispatch();
  return (
    <div className='post-form'>
      <div className='bg-primary p'>
        <h3>Leave a Comment</h3>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(addComment(postId, { text }));
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
          placeholder='Leave a comment'
          required
        />
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  );
};

export default CommentForm;
