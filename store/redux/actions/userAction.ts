import { GET_USER_INFO } from "../constant/userConstant"

export const getUserInfo = (user: any) => {
    return {
        type: GET_USER_INFO,
        payload: user
    }
}
