import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userActions } from '../_actions';
import { profileActions } from '../_actions';

function ProfilePage() {
    const profiles = useSelector(state => state.profiles);
    const user = useSelector(state => state.authentication.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userActions.getAll());
    }, []);

    function handleDeleteUser(id) {
        dispatch(userActions.delete(id));
    }

    return (
        <div className="col-lg-8 offset-lg-2">
            <h1>Hi {user.firstName}!</h1>
            <p>You're logged in with React Hooks!!</p>
            <h3>All registered profiles:</h3>
            {profiles.loading && <em>Loading profiles...</em>}
            {profiles.error && <span className="text-danger">ERROR: {profiles.error}</span>}
            {profiles.items &&
                <ul>
                    {profiles.items.map((user, index) =>
                        <li key={user.id}>
                            {user.firstName + ' ' + user.lastName}
                            {
                                user.deleting ? <em> - Deleting...</em>
                                : user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
                                : <span> - <a onClick={() => handleDeleteUser(user.id)} className="text-primary">Delete</a></span>
                            }
                        </li>
                    )}
                </ul>
            }
            <p>
                <Link to="/login">Logout</Link>
            </p>
        </div>
    );
}

export { ProfilePage };