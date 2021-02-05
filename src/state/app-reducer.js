import {getUserPage} from "./auth-reducer";

const INIT_SUCESS= 'INIT_SUCESS'

let initialState = {
    init: false,
    globalError:null
}

let appReducer= (state = initialState, action) => {
    switch (action.type) {
        case INIT_SUCESS:
            return {
            ...state,
            init: true
            }
        default:
            return state;
    }
}
export const initSucess = () => ({type: INIT_SUCESS});

export const initializeApp=()=> (dispatch) => {
    let promise =dispatch(getUserPage());
    Promise.all([promise]).then(()=> {
        dispatch(initSucess());
    })
}

export default appReducer;