import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";

let store= {
    _callSubscriber() {
        console.log('State changed');
    },
    getState() {
        return this._state;
    },
    _state: {
        profilePage: {
            posts: [
                {id: 0, message: 'Nikita', likeCount: 3},
                {id: 1, message: 'Sasha', likeCount: 5},
                {id: 2, message: 'Katya', likeCount: 5},
                {id: 3, message: 'Elena', likeCount: 8},
                {id: 4, message: 'Oleg', likeCount: 5},
            ],
            newPosText: ''
        },
        dialogsPage: {
            dialogsData: [
                {id: 0, name: 'Nikita'},
                {id: 1, name: 'Sasha'},
                {id: 2, name: 'Katya'},
                {id: 3, name: 'Elena'},
                {id: 4, name: 'Oleg'},
            ],
            messagesData: [
                {id: 0, message: 'Hello'},
                {id: 1, message: 'its'},
                {id: 2, message: 'me'},
                {id: 3, message: 'me'},
                {id: 4, message: 'me'},
            ],
            newMessageText: ''
        }
    },
    subscriber(observer) {
        this._callSubscriber = observer;
    },
    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
        this._callSubscriber(this._state);
        }
    }


export default store;