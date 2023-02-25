import { BlogItem, ListUsers } from "@/components";
import { Sidebar } from "@/components/layouts/Sidebar"
import { blogs, users } from "@/fake-data";

export default function Home() {
	return (
		<Sidebar>
			<div className="flex lg:p-10 p-4 lg:flex-row flex-col overflow-y-scroll h-screen">
				<div className="lg:flex-1 lg:pr-10 lg:order-1 order-2 mt-4 lg:overflow-y-scroll h-screen">
					{blogs.map((item, index) => (
						<BlogItem key={index} {...item} />
					))}
				</div>
				<div className="lg:flex-2 lg:order-2 order-1 mt-4 lg:right-0 lg:sticky">
					<ListUsers title="Suggestion list" users={users} />
				</div>
			</div>
		</Sidebar>
	);
}
