import { GET_USER_INFO } from "../constant/userConstant"
const initialState: any = {
    user: {}
}

const userReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_USER_INFO :
        state.user = action.payload
    }
    return {...state}
}
export default userReducer