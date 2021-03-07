import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addExperience } from '../../actions/profile';
import { Link } from 'react-router-dom';

const initialState = {
  title: '',
  company: '',
  location: '',
  from: '',
  to: '',
  current: 'false',
  description: '',
};

const AddExperience = ({ history }) => {
  const [formData, setFormData] = useState(initialState);

  const { title, company, location, from, to, current, description } = formData;

  const [toDateDisabled, toggleDisabled] = useState(false);

  const dispatch = useDispatch();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(addExperience(formData, history));
  };

  return (
    <>
      <h1 className='large text-primary'>Add An Experience</h1>
      <p className='lead'>
        <i className='fas fa-code-branch'></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form onSubmit={(e) => onSubmit(e)} className='form'>
        <div className='form-group'>
          <input
            value={title}
            onChange={(e) => onChange(e)}
            type='text'
            placeholder='* Job Title'
            name='title'
            required
          />
        </div>
        <div className='form-group'>
          <input
            value={company}
            onChange={(e) => onChange(e)}
            type='text'
            placeholder='* Company'
            name='company'
            required
          />
        </div>
        <div className='form-group'>
          <input
            value={location}
            onChange={(e) => onChange(e)}
            type='text'
            placeholder='Location'
            name='location'
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
            Current Job
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
            placeholder='Job Description'
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

export default AddExperience;
