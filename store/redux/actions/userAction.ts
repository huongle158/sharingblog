import { GET_USER_INFO,
        LOGOUT_USER } from "../constant/userConstant"

export const getUserInfo = (user: any) => {
    return {
        type: GET_USER_INFO,
        payload: user
    }
}
export const logoutUser = () => {
    return {
        type: LOGOUT_USER
    }
}
