import Swal from "sweetalert2";

import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createCategory } from "../actions/category";
import LabeledInput from "./LabeledInput";
import useForm from "../hooks/useForm";

export default function CategoryForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { formData, handleInputChange, handleSubmit } = useForm({
    name: '',
  }, onSubmit)

  async function onSubmit(formData) {
    const message = validatePayload(formData)

    if (message) {
      Swal.fire({
        title: "Error",
        text: message,
        icon: "error",
      });
      return
    }

    const { error } = await dispatch(createCategory(formData))
    if (error) {
      Swal.fire({
        title: "Error",
        text: error,
        icon: "error",
      });
    } else {
      Swal.fire({
        title: "Success",
        text: `New category added successfully`,
        icon: "success",
      });
      navigate('/categories')
    }

    function validatePayload({
      name,
    }) {
      if (!name) {
        return 'Name is required'
      }
      return null
    }
  }

  return (
    <form className="form-control" onSubmit={handleSubmit}>
      <LabeledInput id="name" label="Name" name="name" inputType="text" value={formData.name} setValue={handleInputChange} />
      <div className="flex justify-end gap-3">
        <NavLink to="/categories" className="btn btn-primary my-5 w-fit">Cancel</NavLink>
        <button className="btn btn-primary my-5 w-fit">Save</button>
      </div>
    </form >
  )
}