import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const Education = ({ education }) => {
  return (
    <>
      <div className='profile-edu bg-white p-2'>
        <h2 className='text-primary'>Education</h2>

        {education && education.length > 0 ? (
          <>
            {' '}
            {education.map((edu, index) => (
              <div key={index}>
                <h3 className='text-dark'>{edu.school}</h3>
                <p>
                  <Moment format='DD/MM/YYYY'>{edu.from}</Moment> -{' '}
                  {edu.to ? (
                    <span>
                      <Moment format='DD/MM/YYYY'>{edu.to}</Moment>
                    </span>
                  ) : (
                    <span>Now</span>
                  )}
                </p>
                <p>
                  <strong>Degree:</strong> {edu.degree}
                </p>
                <p>
                  <strong>Field Of Study:</strong> {edu.fieldofstudy}
                </p>
                <p>
                  <strong>Description</strong> {edu.description}
                </p>
              </div>
            ))}{' '}
          </>
        ) : (
          <h4>No Education Credentials</h4>
        )}
      </div>
    </>
  );
};

Education.propTypes = {
  education: PropTypes.array.isRequired,
};

export default Education;
