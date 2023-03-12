import { OK } from "@/types/status"

const BASE_URL = "http://localhost:3000/notifications"

const notificationService = {
    getNotifications: async (token: string, userId: number) => {
        try {
            const res = await fetch(`${BASE_URL}/${userId}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
            if (res.status === OK) {
                return await res.json()
            }
            return null
        } catch (error) {
            console.error(error)
            return null
        }
    }
}

export default notificationService