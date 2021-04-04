import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import DashBoardActions from './DashBoardActions';
import Experience from './Experience';
import Education from './Education';
import { deleteAccount } from '../../actions/profile';

const Dashboard = () => {
  const { profile, loading } = useSelector((state) => state.profile);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentProfile());
  }, [dispatch]);


  return loading && profile === null ? (
    <Spinner />
  ) : (
    <>
      <h1 className='large text-primary'> Dashboard</h1>
      <p className='lead'>
        {' '}
        <i className='fas fa-user'> </i> Welcome {user && user.name}{' '}
      </p>
      {profile !== null ? (
        <>
          <DashBoardActions />
          <Experience experience={profile.experience} />
          <Education education={profile.education} />
          <div className='my-2'>
            <button
              className='btn btn-danger'
              onClick={() => dispatch(deleteAccount())}
            >
              <i className='fas fa-user-minus'></i> Delete My Account
            </button>
          </div>
        </>
      ) : (
        <>
          <p>You have not setup a profile,please add some info</p>
          <Link to='/create-profile' className='btn btn-primary m1-1'>
            Create Profile
          </Link>
        </>
      )}
    </>
  );
};

export default Dashboard;
