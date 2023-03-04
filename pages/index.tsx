import { BlogItem, ListUsers, SearchOptions, TagsBox } from "@/components";
import { Sidebar } from "@/components/layouts/Sidebar"
import { useDispatch, useSelector } from 'react-redux';
import { getAllBlogs } from './../store/redux/actions/sharingblogAction';
import blogService from './../services/blogService';
import { useState, useEffect, Suspense } from 'react';
import { getAllTags } from "@/store/redux/actions/tagAction";
import tagService from "@/services/tagService";
import { Spin } from 'antd';


export default function Home() {
	const dispatch = useDispatch();
	const [tags, setTags] = useState([])
	//const [blogs, setBlogs] = useState([])
	const { blogs, loading } = useSelector((reduxData: any) => {
        return reduxData.sharingBlogReducers
    })
	useEffect(() => {
		const fetchTags = async () => {
			const allTags = await tagService.getAllTags()
			if (allTags && allTags.tags) {
				setTags(allTags.tags)
				getAllTags()
			}
		}
		const fetchBlogs = async () => {
			const allBlogs = await blogService.getAllPosts()
			if (allBlogs && allBlogs.articles) {
				//setBlogs(allBlogs.articles)
			  dispatch(getAllBlogs(allBlogs.articles))
			}
		}
		fetchTags();
		fetchBlogs();
		// dispatch(getAllBlogs());
	}, []);

	return (
		<Sidebar>
			<div className="flex items-center justify-center lg:ml-40 mt-4 lg:w-[50%] w-[98%] ml-2">
				<SearchOptions onSearch={() => {}}/>
			</div>
			{	loading
					?
					<div class="flex items-center justify-center h-screen">
						<Spin className="w-12 h-12" />
					</div>
					:
					<div className="flex lg:p-10 p-4 lg:flex-row flex-col overflow-y-scroll h-screen">	
						<div className="lg:flex-1 lg:pr-10 lg:order-1 order-2 mt-4 lg:overflow-y-scroll h-screen">
								{blogs &&  blogs.map((item: any, index: any) => (
									<BlogItem key={index} blog={item}/>
								))}
							</div>
						<div className="lg:flex-2 lg:order-2 order-1 mt-4 lg:right-0 lg:sticky">
							{/* <Suspense fallback={<div>Loading...</div>}><ListUsers title="Danh sách gợi ý" users={users} /></Suspense> */}
							<div className="mt-4 lg:w-[280px]">
								<TagsBox title="Các chủ đề được đề xuất" tags={tags} />
							</div>
						</div>
					</div>
				}
			
		</Sidebar>
	);
}


