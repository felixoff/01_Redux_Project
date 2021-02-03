import React from 'react'
import styles from './Users.module.css';
import {NavLink} from 'react-router-dom'
import ava from '../../avatar/football-tiger-mascot-png-transparent-images-4483-pngio-tiger-mascot-png-1200_1238.png'
import Paginator from  '../commons/Paginator/Paginator'
import User from "./User";
let Users = ({totalItemsCount, pageSize, currentPage, onPageChange, ...props}) =>
{
    return <div>
        <Paginator totalItemsCount={totalItemsCount} pageSize={pageSize} currentPage={currentPage} onPageChange={onPageChange}/>
        <div>
            {
                props.users.map(u => <User user={u}
                                           followingInProcess={props.followingInProcess}
                                           follow={props.follow}
                                           unfollow={props.unfollow}
                                           key={u.id}
                />)
            }
        </div>
    </div>
};

export default Users;