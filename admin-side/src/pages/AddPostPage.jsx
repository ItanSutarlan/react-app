import { useDispatch, useSelector } from "react-redux";
import ReactLoading from "react-loading"
import { useEffect } from 'react';

import PostForm from "../components/PostForm";
import { getCategories } from '../actions/category';



export default function AddPostPage() {
  const dispatch = useDispatch()
  const {loading, categories} = useSelector(state=> state.categories)
  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])

  return (
    <>
      {loading? (
        <div className="h-screen flex justify-center items-center">
          <ReactLoading
            className="mx-auto"
            type={"bars"}
            color={"#03fc4e"}
            height={100}
            width={100}
          />
        </div>
      ) : (
        <div className="text-xs lg:block px-5 mb-20">
          <h1 className="font-bold text-3xl text-center">Add New Post</h1>
          <PostForm categories={categories} />
        </div>
      )}
  </>
  )
}