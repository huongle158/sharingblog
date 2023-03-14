import { GET_ALL_TAG_REQUEST, GET_ALL_TAG_SUCCESS } from './../constant/tagConstant';
const initialState: any = {
    tags: [],
    pendingTagList: false,
}

const tagReducer = (state = initialState, action:any) => {
    switch (action.type) {
        case GET_ALL_TAG_REQUEST:
            return {
                ...state,
                pendingTagList: true
            }
        case GET_ALL_TAG_SUCCESS:
            return {
                ...state,
                pendingTagList: false,
                tags: action.payload.tags
            }
        default:
            return state
    }
}

export default tagReducer
