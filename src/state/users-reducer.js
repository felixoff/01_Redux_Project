import {usersAPI} from "../api/api";
import {updatesObjectInArray} from "../objectHelpers/object-helpers";

const FOLLOW= 'FOLLOW'
const UNFOLLOW= 'UNFOLLOW'
const SET_USERS='SET_USERS'
const SET_CURRENT_PAGE='SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT='SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETCHING='TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROCESS= 'TOGGLE_IS_FOLLOWING_PROCESS'

let initialState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProcess: []
}

let usersReducer= (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updatesObjectInArray(state.users, action.userId, "id", {followed: true})
            }
        case UNFOLLOW :
            return {
                ...state,
                users: updatesObjectInArray(state.users, action.userId, "id", {followed: false})
            }
        case SET_USERS :
            return {
                ...state,
                users: [...action.users]
            }
        case SET_CURRENT_PAGE :
            return {
                ...state,
                currentPage: action.currentPage
            }
        case SET_TOTAL_USERS_COUNT :
            return {
                ...state,
                totalUsersCount: action.count
            }
        case TOGGLE_IS_FETCHING :
            return {
                ...state,
                isFetching: action.isFetching
            }
        case TOGGLE_IS_FOLLOWING_PROCESS :
            return {
                ...state,
                followingInProcess: action.isFetching
                ? [...state.followingInProcess, action.userId]
                : state.followingInProcess.filter(id => id != action.userId)
            }
        default:
            return state;
    }
}

export const requestUsers=(requestPage, pageSize) => (dispatch) => {
    debugger;
    dispatch(toggleIsFetching(true));
    dispatch(setCurrentPage(requestPage));
    usersAPI.getUsers(requestPage,pageSize).then(data => {
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));
    })
}

export const flowFollowUnfollow = async (dispatch, userId, apiMethod, actionCreator) => {
    dispatch(toggleFollowingInProcess(true, userId));
    let response = await apiMethod(userId);
    if (response.data.codeResult === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(toggleFollowingInProcess(false, userId));
}

export const follow=(userId) => async (dispatch) => {
    flowFollowUnfollow(dispatch,userId,usersAPI.follow.bind(usersAPI), acceptFollow)
}

export const unfollow=(userId) => async (dispatch) => {
    flowFollowUnfollow(dispatch,userId,usersAPI.unfollow.bind(usersAPI), acceptUnfollow)
}

export const acceptFollow= (userId) => ({type: FOLLOW, userId});
export const acceptUnfollow=(userId) => ({type:UNFOLLOW, userId});
export const setUsers=(users) => ({type:SET_USERS, users});
export const setTotalUsersCount=(totalUsersCount) => ({type:SET_TOTAL_USERS_COUNT, count:totalUsersCount});
export const toggleIsFetching=(isFetching) => ({type:TOGGLE_IS_FETCHING, isFetching});
export const setCurrentPage=(currentPage) => ({type:SET_CURRENT_PAGE, currentPage});
export const toggleFollowingInProcess=(isFetching,userId) => ({type:TOGGLE_IS_FOLLOWING_PROCESS, isFetching, userId});

export default usersReducer;