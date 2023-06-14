/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import Swal from "sweetalert2";
import ReactLoading from "react-loading";
import { getPostBySlug } from "../actions/post";

export default function DetailPage() {
  const { slug } = useParams();
  const { post, loading } = useSelector(state => state.posts);
  const dispatch = useDispatch();
  useEffect(() => {
    (async() => {
      const { error } = await dispatch(getPostBySlug(slug))
      if (error) {
        Swal.fire({
          title: "Error",
          text: error,
          icon: "error",
        })
      }
    })()
  }, [])

  return (
    <div>
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
          <span className="font-semibold text-base">{post?.createdAt.split('T')[0]}</span>
          <h1 className="font-bold text-3xl text-center my-3">{post?.title}</h1>
          <span className="block font-semibold text-lg text-center my-2">Tags: {post?.tags.map(tag=>tag.name).join(', ')}</span>
          <img src={post?.imgUrl} alt="" />
          <p className="text-lg text-justify">{post?.content}</p>
        </div>
      )}    
    </div>
  )
}
