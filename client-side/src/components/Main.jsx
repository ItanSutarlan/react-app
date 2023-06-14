/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import ReactLoading from "react-loading"
import { useDispatch, useSelector } from "react-redux"
import { getPosts } from "../actions/post";
import { NavLink } from "react-router-dom";

export default function Main() {
  const { posts, loading } = useSelector(state => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts())
  }, [])

  return (
    <main>
      {
        loading ? (
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
          <>
            <div className="grid grid-cols-2 grid-flow-col mt-7 gap-4">
              <div>
                <img src={posts?.[0]?.imgUrl} alt={posts?.[0]?.name} />
              </div>
              <div className="flex flex-col gap-4">
                {
                  posts.map((post, index) => {
                    if(0 < index && index < 6) {
                      return (
                        <div key={post.id} className="flex gap-2">
                          <img className="w-14 h-14 object-cover" src={post.imgUrl} alt={post.title} />
                          <h2>{post.title}</h2>
                        </div>
                      )
                    }
                  })
                }
              </div>
            </div>
            <div>
              <h2 className="text-2xl text-center font-bold">BERITA TERKINI</h2>
              <div className="flex flex-col gap-2">
                {
                  posts.map((post) => {
                    return (
                      <div key={post.id} className="flex flex-col gap-2">
                        <img className="w-24 h-24 object-cover" src={post.imgUrl} alt={post.title} />
                        <h2 className="text-lg font-bold">{post.title}</h2>
                        <span className="font-semibold">Tags: {post.tags.map(tag => tag.name).join(', ')}</span>
                        <p className="w-1/2 h-24 overflow-y-hidden text-justify">{post.content}</p>
                        <NavLink to={`/${post.slug}`} className="underline font-medium hover:cursor-pointer">See details...</NavLink>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </>
        )
      }
    </main>
  )
}