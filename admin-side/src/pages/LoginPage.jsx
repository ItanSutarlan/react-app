import { useDispatch, useSelector, } from "react-redux"
import LabeledInput from "../components/LabeledInput"
import useForm from '../hooks/useForm'
import { handleLogin } from "../actions/auth"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2";
import ReactLoading from "react-loading";

export default function LoginPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading } = useSelector((state) => state.auth)

  const { formData, handleInputChange, handleSubmit } = useForm({
    email: '',
    password: ''
  }, onSubmit)

  async function onSubmit (formData) {
    const message = validatePayload(formData)
    if (message) {
      Swal.fire({
        title: "Error",
        text: message,
        icon: "error",
      });

      return
    }
    const { isLoggedIn, error } = await dispatch(handleLogin(formData))

    if (isLoggedIn) {
      Swal.fire({
        title: "Login succeed",
        text: "Successfully login",
        icon: "success",
      });
      navigate('/')
    } else if (error) {
      Swal.fire({
        title: "Error",
        text: error,
        icon: "error",
      });
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
    <div className="h-screen flex justify-center items-center">
      {loading ? (
        <ReactLoading
          className="mx-auto"
          type={"bars"}
          color={"#03fc4e"}
          height={100}
          width={100}
        />
      ) : (
        <div className="mx-4 md:w-1/2 md:mx-auto h-screen flex flex-col justify-center">
          <h1 className="font-bold text-3xl text-center mb-8">Login</h1>
          <form className="form-control" onSubmit={handleSubmit}>
            <LabeledInput id="email" label="Email" name="email" inputType="email" value={formData.email} setValue={handleInputChange} />
            <LabeledInput id="password" label="Password" name="password" inputType="password" value={formData.password} setValue={handleInputChange} />
            <button className="btn btn-primary my-5">Login</button>
          </form >
        </div>
      )}
    </div>
  )
}