import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfileById } from '../../actions/profile';
import { Link, useParams } from 'react-router-dom';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import Experience from './Experience';
import Education from './Education';
import Github from './Github';

const Profile = () => {
  const { profile, loading } = useSelector((state) => state.profile);
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getProfileById(id));
  }, [dispatch, id]);

  if (profile === null || loading) {
    return <Spinner />;
  }

  return (
    <>
      <Link to='/profiles' className='btn btn-light'>
        Back to Profiles{' '}
      </Link>
      {auth.isAuthenticated &&
        !auth.loading &&
        auth.user._id === profile.user._id && (
          <Link to='/edit-profile' className='btn btn-dark'>
            Edit Profile
          </Link>
        )}
      <div className='profile-grid my-1'>
        <ProfileTop profile={profile} loading={loading} />
        <ProfileAbout profile={profile} loading={loading} />
        <Experience experience={profile.experience} />
        <Education education={profile.education} />
        {profile.githubusername && <Github username={profile.githubusername} />}
      </div>
    </>
  );
};

export default Profile;
