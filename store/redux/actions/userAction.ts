import { GET_USER_INFO,
        LOGOUT_USER,
        GET_LIST_FOLLOWER,
        GET_LIST_FOLLOWING } from "../constant/userConstant"

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
export const getListFollower = (list: any) => {
    return {
        type: GET_LIST_FOLLOWER,
        payload: list
    }
}
export const getListFollowing = (list: any) => {
    return {
        type: GET_LIST_FOLLOWING,
        payload: list
    }
}

