import { Sidebar } from "@/components/Sidebar";
import { useDispatch, useSelector } from 'react-redux';
import { getAllBlogs } from './../store/redux/actions/sharingblogAction';
import blogService from './../services/blogService';
import { useState, useEffect  } from 'react';

export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllBlogs());
  }, []);
  
  return (
    <Sidebar>
        <button>Home</button>
    </Sidebar>
  )
}


