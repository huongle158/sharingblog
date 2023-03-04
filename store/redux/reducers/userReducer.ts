import { GET_USER_INFO, LOGOUT_USER } from "../constant/userConstant";
const initialState: any = {
	user: {},
};

const userReducer = (state = initialState, action: any) => {
	switch (action.type) {
		case GET_USER_INFO:
			console.log("STATE", action.payload);
			state.user = action.payload;
			break;
		case LOGOUT_USER:
			return {
				...state,
				user: {},
			};
		default:
	}
	return { ...state };
};
export default userReducer;
