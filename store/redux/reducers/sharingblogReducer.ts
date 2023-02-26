import { CREATE_TITLE_BLOG } from '../../../types/actionConstant';

const initialState: any = {
    newTitle : ""
}

const sharingblogReducers = (state = initialState, action: any) => {
    switch (action.type) {
        case action.type : 
        state.newTitle === action.payload
    }
    return {...state}
}
export default sharingblogReducers
