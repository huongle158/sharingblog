import { Sidebar, SingleLineList } from "@/components/shared"
// import { users } from "@/fake-data";
import { Card, Typography } from "antd"
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const Users = () => {
    const { listFollow } = useSelector((reduxData: any) => {
		return reduxData.userReducer;
	});
 
    const router = useRouter();
    const { title } = router.query;
   
    return (
        <Sidebar>

            <div className="container mx-auto py-16 h-screen overflow-scroll">
                <Typography.Title level={2} className="text-center mb-10">{title}</Typography.Title>
                <div className="w-[80%] mx-auto grid gap-x-8 gap-y-4 grid-cols-3">
                        {listFollow.map((item: any, index: number) => (
                            <Card key={index}>
                                <SingleLineList userDetail={item} />
                            </Card>
                        ))}
                </div>
            </div>
        </Sidebar>
    )
}

export default Users