import { BlogItem, ListUsers, SearchOptions, TagsBox } from "@/components";
import { Sidebar } from "@/components/layouts/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs, getAllBlogsByAuthor, getAllBlogsByTags } from "./../store/redux/actions/sharingblogAction";
import blogService from "./../services/blogService";
import { useState, useEffect, Suspense } from "react";
import { getAllTags } from "@/store/redux/actions/tagAction";
import tagService from "@/services/tagService";
import { Spin, message } from "antd";
import { users } from '@/fake-data';
import Cookies from "js-cookie";
import { useRouter } from 'next/router';

export default function Home() {
	const router = useRouter();
	const dispatch = useDispatch();
	const [tags, setTags] = useState([]);
	const token = Cookies.get("token") || "";
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	//const [blogs, setBlogs] = useState([])
	const { blogs, pending } = useSelector((reduxData: any) => {
		return reduxData.sharingBlogReducers;
	});
	useEffect(() => {
		 // Xử lý điều huong
		 if (!token) {
			 router.push("/login");
		 } else {
			 setIsLoggedIn(true);
		 }
		const fetchTags = async () => {
			const allTags = await tagService.getAllTags();
			if (allTags && allTags.tags) {
				setTags(allTags.tags);
				getAllTags();
			}
		};
		dispatch(getAllBlogs(token));
		fetchTags();
	}, []);

	const handleSearch = async (searchOption: string, searchValue: string) => {
		const filter = searchValue.toLocaleLowerCase().trim()
		if(searchOption === "Author") {
			await blogService.getAllPosts(token,undefined,filter)
			.then((result) => {
				if(result.articles.length === 0) {
					message.info('Không tìm thấy bài viết của tác giả này');
					return false
				}
			  dispatch(getAllBlogsByAuthor(result.articles));
			})
			.catch((err) => {
				message.error(`Không tìm thấy tác giả: ${filter}`);
			})
		}
		if(searchOption === "Tags") {
			await blogService.getAllPosts(token,undefined,undefined,filter)
			.then((result) => {
				if( result.articles.length == 0) {
					message.info('Không tìm thấy bài viết nào liên quan đến tag này');
					return false
				}
				dispatch(getAllBlogsByTags(result.articles));
			})
			.catch((err) => {
				message.error(err);
			})
		}
	  };
	return (
		<Sidebar>
			<div className="flex items-center justify-center lg:ml-40 mt-4 lg:w-[50%] w-[98%] ml-2">
				<SearchOptions onSearch={handleSearch} />
			</div>
			{pending ? (
				<div className="flex items-center justify-center h-screen">
					<Spin className="w-12 h-12" />
				</div>
			) : (
				<div className="flex lg:p-10 p-4 lg:flex-row flex-col overflow-y-scroll h-screen">
					<div className="lg:flex-1 lg:pr-10 lg:order-1 order-2 mt-4 lg:overflow-y-scroll h-screen">
						{blogs &&
							blogs.map((item: any, index: any) => (
								<BlogItem key={index} blog={item} />
							))}
					</div>
					<div className="lg:flex-2 lg:order-2 order-1 mt-4 lg:right-0 lg:sticky">
						<Suspense fallback={<div>Loading...</div>}>
							<ListUsers title="Danh sách gợi ý" users={users} />
						</Suspense>
						<div className="mt-4 lg:w-[280px]">
							<TagsBox title="Các chủ đề được đề xuất" tags={tags} />
						</div>
					</div>
				</div>
			)}
		</Sidebar>
	);
}
