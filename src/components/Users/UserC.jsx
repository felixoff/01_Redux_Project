import React from 'react'
import styles from './Users.module.css';
import ava from '../../avatar/football-tiger-mascot-png-transparent-images-4483-pngio-tiger-mascot-png-1200_1238.png'
import * as axios from 'axios'
let Users = (props) => {
    let getUsers =() => {
        if (props.users.length === 0) {
            axios.get("https://social-network.samuraijs.com/api/1.0/users")
                .then(response => {
                    props.setusers(response.data.items);
                })
        }
    }
    return <div>
        <button onClick={getUsers}>Get Users</button>
        {
        props.users.map(u => <div key={u.id}>
        <span>
            <div>
                <img src={u.photos.small != null ? u.photos.small: ava} className={styles.userPhoto}/>
            </div>
            <div>
                {u.followed ? <button onClick={() => {
                        props.unfollow(u.id)
                    }}>Unfollow</button>
                    : <button onClick={() => {
                        props.follow(u.id)
                    }}>Follow</button>}
            </div>
        </span>
            <span>
            <span>
                <div>{u.fullname}</div>
                <div>{u.status}</div>
            </span>
            <span>
                <div>{"u.location.country"}</div>
                <div>{"u.location.city"}</div>
            </span>
        </span>
        </div>
        )
    }
    </div>
};

export default Users;