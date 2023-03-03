import { Sidebar, SingleLineList } from "@/components"
import { users } from "@/fake-data";
import { Card, Typography } from "antd"
import { useRouter } from "next/router";

const Users = () => {
    const router = useRouter();
    const { title, items } = router.query;
    // if (items) {
    //     const users = JSON.parse(items);
    // }
   
    return (
        <Sidebar>
            <div className="container mx-auto py-16 h-screen overflow-scroll">
                <Typography.Title level={2} className="text-center mb-10">{title}</Typography.Title>
                <div className="w-[80%] mx-auto grid gap-x-8 gap-y-4 grid-cols-3">
                        {users.map((item: any, index: number) => (
                            <Card key={index}>
                                <SingleLineList user={item} />
                            </Card>
                        ))}
                </div>
            </div>
        </Sidebar>
    )
}

export default Users