import {usersAPI,profileAPI} from "../api/api";
import {acceptFollow, toggleFollowingInProcess} from "./users-reducer";
import {render, screen} from "@testing-library/react";
import App from "../App";
import profileReducer, {addPostActionCreator, deletePost} from "./profile-reducer";

test('check if added new post', () => {
    let state = {
        posts: [
            {id: 0, message: 'Nikita', likeCount: 3},
            {id: 1, message: 'Sasha', likeCount: 5},
            {id: 2, message: 'Katya', likeCount: 5},
            {id: 3, message: 'Elena', likeCount: 8},
            {id: 4, message: 'Oleg', likeCount: 5},
        ]
    };
    let action = addPostActionCreator('Hello guys');
    let result = profileReducer(state, action);

    expect(result.posts.length).toBe(6);
});

test('check if correct newPostText', () => {
    let state = {
        posts: [
            {id: 0, message: 'Nikita', likeCount: 3},
            {id: 1, message: 'Sasha', likeCount: 5},
            {id: 2, message: 'Katya', likeCount: 5},
            {id: 3, message: 'Elena', likeCount: 8},
            {id: 4, message: 'Oleg', likeCount: 5},
        ]
    };
    let action = addPostActionCreator('Hello guys');
    let result = profileReducer(state, action);

    expect(result.posts[5].message).toBe('Hello guys');
});

test('check after delete amount of rows must decrement', () => {
    let state = {
        posts: [
            {id: 0, message: 'Nikita', likeCount: 3},
            {id: 1, message: 'Sasha', likeCount: 5},
            {id: 2, message: 'Katya', likeCount: 5},
            {id: 3, message: 'Elena', likeCount: 8},
            {id: 4, message: 'Oleg', likeCount: 5}
        ]
    };
    let action = deletePost(3);
    let result = profileReducer(state, action);

    expect(result.posts.length).toBe(4);
});

test("check if id is uncorrected amount of rows mustn't change", () => {
    let state = {
        posts: [
            {id: 0, message: 'Nikita', likeCount: 3},
            {id: 1, message: 'Sasha', likeCount: 5},
            {id: 2, message: 'Katya', likeCount: 5},
            {id: 3, message: 'Elena', likeCount: 8},
            {id: 4, message: 'Oleg', likeCount: 5},
        ]
    };
    let action = deletePost(10000);
    let result = profileReducer(state, action);

    expect(result.posts.length).toBe(5);
});