import React from 'react'
import styles from './Users.module.css';
import {NavLink} from 'react-router-dom'
import ava from '../../avatar/football-tiger-mascot-png-transparent-images-4483-pngio-tiger-mascot-png-1200_1238.png'
import Paginator from  '../commons/Paginator/Paginator'
let User = ({user, followingInProcess, follow, unfollow}) =>
{
    return (<div>
        <span>
            <div>
                <NavLink to={'/Profile/' + user.id}>
                <img src={user.photos.small != null ? user.photos.small : ava} className={styles.userPhoto}/>
                </NavLink>
                </div>
            <div>
                {user.followed ? <button disabled={followingInProcess.some(id => id === user.id)} onClick={() => {
                    follow(user.id);
                    }}>Unfollow</button>
                    : <button disabled={followingInProcess.some(id => id === user.Id)} onClick={() => {
                        unfollow(user.id)
                    }}>Follow</button>}
            </div>
        </span>
                    <span>
            <span>
                <div>{user.name}</div>
                <div>{user.status}</div>
            </span>
            <span>
                <div>{"user.location.country"}</div>
                <div>{"user.location.city"}</div>
            </span>
        </span>
                </div>
            )
};

export default User;