import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteCategoryById, getCategories } from "../actions/category"
import Swal from "sweetalert2";
import ReactLoading from "react-loading"
import { formatTimeStamp } from "../utils/Mapper";
import { NavLink } from "react-router-dom";

export default function CategoryPage() {
  const { loading, categories } = useSelector(state => state.categories)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this category!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, confirm!",
    })
    .then((result) => {
      if (result.isConfirmed) {
        const { error } = dispatch(deleteCategoryById(id))
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

  return (
    <>
      {loading ? (
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
          <div className="flex justify-between mb-6">
            <h1 className="text-2xl font-bold">Category List</h1>
            <NavLink to="/categories/create" className="btn btn-primary">New Category</NavLink>
          </div>

          <div className="overflow-x-auto">
            <table className="table table-compact w-full">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Created At</th>
                  <th>Updated At</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  categories.map((category, i) => {
                    return (
                      <tr key={category.id}>
                        <th>{i+1}</th>
                        <td>{category.name}</td>
                        <td>{formatTimeStamp(category.createdAt)}</td>
                        <td>{formatTimeStamp(category.updatedAt)}</td>
                        <td>
                          <button className="btn btn-error" onClick={() => handleDelete(category.id)}>Delete</button>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
            {!categories.length && <p className="text-center text-lg">There is no category yet</p>}
          </div>
        </div>
      )}
  </>
  )
}