const SEND_MESSAGE='SEND-MESSAGE'

let initialState = {
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
}
const dialogsReducer = (state=initialState, action) =>{
        switch (action.type) {
            case SEND_MESSAGE:
                return {
                    ...state,
                    messagesData: [...state.messagesData, {id:5, message: action.newMessageBody}]
                }
            default:
                return state;
        }
    }

export const sendMessageActionCreator= (newMessageBody) => ({type: SEND_MESSAGE, newMessageBody})


export default dialogsReducer;