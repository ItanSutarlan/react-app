/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactLoading from "react-loading"
import { deletePostById, getPosts } from "../actions/post";
import Swal from "sweetalert2";
import { NavLink } from "react-router-dom";

export default function HomePage() {
  const { loading, posts } = useSelector(state => state.posts)
  const [searchedPosts, setSearchedPosts] = useState(null)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPosts())
  }, [dispatch])

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this post!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, confirm!",
    })
    .then((result) => {
      if (result.isConfirmed) {
        const { error } = dispatch(deletePostById(id))
        if (error) {
          Swal.fire({
            title: "Error",
            text: error,
            icon: "error",
          });
        }
      }
    })
  }

  const searchPosts = (e) => {
    if (e.keyCode == 13) {
      const title = e.target.value
      setSearchedPosts(posts.filter(post => post.title.toLowerCase().includes(title.toLowerCase())))
    }
  }

  const removeSearchedPosts = (e) => {
    if (e.target.value.length === 0) {
      setSearchedPosts(null)
    }
  }

  return (
    <>
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
        ): (
          <div className="text-xs text-center lg:block px-5 mb-20">
            <div className="flex justify-center items-center mb-4">
              <input id="search" type="text" autoComplete="off" placeholder="Type title here then press enter to see what you're looking for" className="input input-sm input-bordered w-full" onKeyDown={searchPosts} onChange={removeSearchedPosts} />
              <label htmlFor="search" tabIndex="0" className=" btn btn-ghost btn-circle">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </label>
            </div>
            <div className="flex justify-between mb-6">
              <h1 className="text-2xl font-bold">Products</h1>
              <NavLink className="btn btn-primary" to="/create">New Product</NavLink>
            </div>

            <div className="overflow-x-auto">
              <table className="table table-compact w-full text-center">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Slug</th>
                    <th>Content</th>
                    <th>Image</th>
                    <th>Category</th>
                    <th>Tags</th>
                    <th>Author</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    (searchedPosts || posts).map((post, i) => {
                      return (
                        <tr key={post.id}>
                          <th>{i + 1}</th>
                          <td><span className="w-48 truncate inline-block align-middle">{post.title}</span></td>
                          <td><span className="w-48 truncate inline-block align-middle">{post.slug}</span></td>
                          <td><span className="w-48 truncate inline-block align-middle">{post.content}</span></td>
                          <td className="inline-block w-48"><img className="w-32 mx-auto" src={post.imgUrl} alt={post.title} /></td>
                          <td>{post.category.name}</td>
                          <td>{post.tags.map(tag => tag.name).slice().join(', ')}</td>
                          <td>{post.author.username}</td>
                          <td className="flex gap-3 items-center">
                            <NavLink className="btn btn-warning" to={`/edit/${post.id}`}>Edit</NavLink>
                            <button className="btn btn-error" onClick={() => handleDelete(post.id)}>Delete</button>
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
              {posts.length === 0 && <p className="text-center text-lg font-medium mt-4">There is no product yet</p>}
            </div>
          </div>
        )
      }
    </>
  )
}