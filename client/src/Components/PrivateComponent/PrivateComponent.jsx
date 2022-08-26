import React from 'react';
import { withAuthenticationRequired } from '@auth0/auth0-react';

const PrivateRoute = () => {
    return (
        <div>
            <h1>You are in a private route</h1>
            <p>You can access to this component if you are loged in</p>
        </div>
    )
}

export default withAuthenticationRequired(PrivateRoute, {
  // Show a message while the user waits to be redirected to the login page.
  onRedirecting: () => <div>Redirecting you to the login page...</div>,
});