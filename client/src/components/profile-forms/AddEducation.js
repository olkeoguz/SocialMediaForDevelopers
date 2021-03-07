import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addEducation } from '../../actions/profile';
import { Link } from 'react-router-dom';

const initialState = {
  school: '',
  degree: '',
  fieldofstudy: '',
  from: '',
  to: '',
  current: false,
  description: '',
};

const AddEducation = ({ history }) => {
  const [formData, setFormData] = useState(initialState);

  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description,
  } = formData;

  const [toDateDisabled, toggleDisabled] = useState(false);

  const dispatch = useDispatch();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(addEducation(formData, history));
  };

  return (
    <>
      <h1 className='large text-primary'>Add An Education</h1>
      <p className='lead'>
        <i className='fas fa-code-branch'></i> Add any school or bootcamp you
        have attended
      </p>
      <small>* = required field</small>
      <form onSubmit={(e) => onSubmit(e)} className='form'>
        <div className='form-group'>
          <input
            value={school}
            onChange={(e) => onChange(e)}
            type='text'
            placeholder='* School or Bootcamp'
            name='school'
            required
          />
        </div>
        <div className='form-group'>
          <input
            value={degree}
            onChange={(e) => onChange(e)}
            type='text'
            placeholder='* Degree or Certificate'
            name='degree'
            required
          />
        </div>
        <div className='form-group'>
          <input
            value={fieldofstudy}
            onChange={(e) => onChange(e)}
            type='text'
            placeholder='Field of Study'
            name='fieldofstudy'
          />
        </div>
        <div className='form-group'>
          <h4>From Date</h4>
          <input
            value={from}
            onChange={(e) => onChange(e)}
            type='date'
            name='from'
          />
        </div>
        <div className='form-group'>
          <p>
            <input
              value={current}
              onChange={(e) => {
                setFormData({ ...formData, current: !current });
                toggleDisabled(!toDateDisabled);
              }}
              type='checkbox'
              name='current'
            />{' '}
            Current School
          </p>
        </div>
        {!toDateDisabled && (
          <>
            <div className='form-group'>
              <h4>To Date</h4>
              <input
                value={to}
                onChange={(e) => onChange(e)}
                type='date'
                name='to'
              />
            </div>
          </>
        )}
        <div className='form-group'>
          <textarea
            value={description}
            onChange={(e) => onChange(e)}
            name='description'
            cols='30'
            rows='5'
            placeholder='Program Description'
          ></textarea>
        </div>
        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='dashboard'>
          Go Back
        </Link>
      </form>
    </>
  );
};

export default AddEducation;
