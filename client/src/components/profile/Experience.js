import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const Experience = ({ experience }) => {
  return (
    <>
      <div className='profile-exp bg-white p-2'>
        <h2 className='text-primary'>Experience</h2>

        {experience && experience.length > 0 ? (
          <>
            {' '}
            {experience.map((exp, index) => (
              <div key={index}>
                <h3 className='text-dark'>{exp.company}</h3>
                <p>
                  <Moment format='DD/MM/YYYY'>{exp.from}</Moment> -{' '}
                  {exp.to ? (
                    <span>
                      <Moment format='DD/MM/YYYY'>{exp.to}</Moment>
                    </span>
                  ) : (
                    <span>Now</span>
                  )}
                </p>
                <p>
                  <strong>Position:</strong> {exp.title}
                </p>
                <p>
                  <strong>Description</strong> {exp.description}
                </p>
              </div>
            ))}{' '}
          </>
        ) : (
          <h4>No Experience Credentials</h4>
        )}
      </div>
    </>
  );
};

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
};

export default Experience;
