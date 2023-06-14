import Swal from "sweetalert2";

import LabeledInput from "../components/LabeledInput";
import useForm from '../hooks/useForm';
import { register } from "../services/auth.service";
import { NavLink } from "react-router-dom";

export default function RegisterPage() {

  const { formData, handleInputChange, handleSubmit, setFormData } = useForm({
    username: '',
    email: '',
    password: '',
    phoneNumber: '',
    address: '',
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
    try {
      const response = await register(formData);
      const responseJson = await response.json();
      if (response.ok) {
        Swal.fire({
          title: "Succeed",
          text: responseJson.message,
          icon: "success",
        });

        setFormData({
          username: '',
          email: '',
          password: '',
          phoneNumber: '',
          address: '',
        })
      } else {
        Swal.fire({
          title: "Error",
          text: responseJson.message,
          icon: "error",
        });        
      }
    } catch (error) {
      console.log(error);
    }
    
    function validatePayload({
      email, password
    }) {
      if (!email) {
        return 'Email is required'
      }
      if (!password) {
        return 'Password is required'
      }
      return null
    }
  }

  return (
    <div className="text-xs text-center lg:block px-5 mb-20">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Register New Admin</h1>
        <button className="text-lg font-bold">Personal Information</button>
      </div>

      <form className="form-control" onSubmit={handleSubmit}>
        <LabeledInput id="username" label="Username" name="username" inputType="text" value={formData.username} setValue={handleInputChange} />
        <LabeledInput id="email" label="Email" name="email" inputType="email" value={formData.email} setValue={handleInputChange} />
        <LabeledInput id="password" label="Password" name="password" inputType="password" value={formData.password} setValue={handleInputChange} />
        <LabeledInput id="phoneNumber" label="Phone Number" name="phoneNumber" inputType="number" value={formData.phoneNumber} setValue={handleInputChange} />
        <LabeledInput id="address" label="Address" name="address" inputType="text" value={formData.address} setValue={handleInputChange} />
        <div className="flex justify-end gap-3">
          <NavLink to="/" className="btn btn-primary my-5 w-fit">Cancel</NavLink>
          <button className="btn btn-primary my-5 w-fit">Save</button>
        </div>
      </form >
    </div>
  )
}