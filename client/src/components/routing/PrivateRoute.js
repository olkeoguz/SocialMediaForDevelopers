import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component, path }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  if (!isAuthenticated && !loading) {
    return <Redirect to='/login' />;
  } else {
    return <Route exact path={path} component={component} />;
  }
};

export default PrivateRoute;

// const PrivateRoute = ({ component: Component, ...rest }) => {
//   const { isAuthenticated, loading } = useSelector((state) => state.auth);

//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         !isAuthenticated && !loading ? (
//           <Redirect to='/login' />
//         ) : (
//           <Component {...props} />
//         )
//       }
//     />
//   );
// };
