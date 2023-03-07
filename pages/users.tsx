import { Sidebar, SingleLineList } from "@/components"
// import { users } from "@/fake-data";
import { Card, Typography } from "antd"
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

const Users = () => {
    const { listFollow } = useSelector((reduxData: any) => {
		return reduxData.userReducer;
	});
 
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
                        {listFollow.map((item: any, index: number) => (
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