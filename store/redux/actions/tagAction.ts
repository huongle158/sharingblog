import tagService from "@/services/tagService";
import {
    GET_ALL_TAG_REQUEST,
    GET_ALL_TAG_SUCCESS,
    GET_ALL_TAG_FAILURE
} from './../constant/tagConstant';

export const getAllTags = () => {
    return (
        async (dispatch: any) => {
            await dispatch({
                type: GET_ALL_TAG_REQUEST
            })
            try {
                const tags = await tagService.getAllTags()
                return dispatch({
                    type: GET_ALL_TAG_SUCCESS,
                    payload: tags
                })
            }
            catch (e) {
                return dispatch({
                    type: GET_ALL_TAG_FAILURE,
                    payload: e
                })
            }
        }
    )
}
