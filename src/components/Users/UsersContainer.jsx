import React from 'react'
import {connect} from "react-redux";
import Users from "./Users";
import {acceptFollow, acceptUnfollow, requestUsers, follow, unfollow,setCurrentPage,toggleFollowingInProcess} from "../../state/users-reducer"
import Preloader from "../commons/Preloader/Preloader";
import {compose} from "redux";
import {getUsers, getPageSize,getCurrentPage,getFollowingInProcess,getIsFetching,getTotalUserCount} from "./../../state/users-selectors"

class UsersContainer extends React.Component
{
componentDidMount() {
    let {currentPage, pageSize} = this.props;
    this.props.getUsers(currentPage, pageSize);
}

onPageChange = (p)  =>{
    let {pageSize} = this.props;
    this.props.getUsers(p, pageSize);
}
render () {
    return <>
        {this.props.isFetching ? <Preloader /> : null};
    <Users totalItemsCount={this.props.totalUsersCount}
                  pageSize={this.props.pageSize}
                  currentPage={this.props.currentPage}
                  onPageChange={this.onPageChange}
                  users={this.props.users}
                  follow={this.props.follow}
                  unfollow={this.props.unfollow}
                  followingInProcess={this.props.followingInProcess}/>
    </>
    }
}

let mapStateToProps = (state) =>{
    return{
        users: getUsers(state),
        pageSize: getPageSize(state),
        currentPage: getCurrentPage(state),
        followingInProcess: getFollowingInProcess(state),
        isFetching: getIsFetching(state),
        totalUsersCount: getTotalUserCount(state)
    }
}
/*let mapDispatchToProps= (dispatch) =>{
    return{
        follow: (userId) => {
            dispatch(followActionCreator(userId));
        },
        unfollow: (userId) => {
            dispatch(unfollowActionCreator(userId));
        },
        setUsers: (users) => {
            dispatch(setusersActionCreator(users));
        },
        setCurrentPage: (currentPage) => {
            dispatch(setcurrentpageActionCreator(currentPage));
        },
        setTotalUsersCount: (totalUsersCount) => {
            dispatch(settotaluserscountActionCreator(totalUsersCount));
        },
        toggleIsFetching: (isFetching) => {
            dispatch(toggleisfetchingActionCreator(isFetching));
        }
    }
}*/


export default compose(connect(mapStateToProps,{acceptFollow,
        acceptUnfollow,setCurrentPage,toggleFollowingInProcess,getUsers: requestUsers,follow,unfollow})
)(UsersContainer)