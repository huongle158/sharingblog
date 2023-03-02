import { GET_USER_INFO,
         LOGOUT_USER } from "../constant/userConstant"
const initialState: any = {
    user: {}
}

const userReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_USER_INFO :
            state.user = action.payload
            break;
        case LOGOUT_USER :
            state.user = {}
            break;

    }
    return {...state}
}
export default userReducer