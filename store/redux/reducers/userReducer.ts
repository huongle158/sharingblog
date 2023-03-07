import { GET_USER_INFO, 
		LOGOUT_USER ,
		GET_LIST_FOLLOWER,
		GET_LIST_FOLLOWING  } from "../constant/userConstant";
const initialState: any = {
	user: {},
	listFollow: []
};

const userReducer = (state = initialState, action: any) => {
	switch (action.type) {
		case GET_USER_INFO:
			state.user = action.payload;
			break;
		case LOGOUT_USER:
			return {
				...state,
				user: {},
			};
		case GET_LIST_FOLLOWER:
			state.listFollow = action.payload;
			break;
		case GET_LIST_FOLLOWING:
			state.listFollow = action.payload;
			break;
		default:
	}
	return { ...state };
};
export default userReducer;
