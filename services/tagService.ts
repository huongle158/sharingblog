const BASE_URL = 'http://localhost:3000/tags';
import { CREATED, INTERNAL_SERVER_ERROR, OK } from './../types/status';

const tagService = {
    getAllTags: async () => {
        try {
            const res = await fetch(`${BASE_URL}`)
            if (res.status === OK) {
                return await res.json()
            }
        }
        catch (e) {
            console.error(e)
        }
        return null
    }
}

export default tagService