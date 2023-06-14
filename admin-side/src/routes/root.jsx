import { useDispatch } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { handleLogout } from "../actions/auth";
import Swal from "sweetalert2";

export default function Root() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutHandler = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You need to relogin!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, confirm!",
    })
    .then((result) => {
      if (result.isConfirmed) {
        dispatch(handleLogout())
        Swal.fire("Logout!", "Your already logout.", "success");
        navigate('/login')
      }
    });
  }
  return (
    <div className="drawer drawer-mobile">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content pt-16">
        <label htmlFor="my-drawer" className="btn btn-primary drawer-button lg:hidden">Open Menu</label>

        {/* place content here */}
        <Outlet />

      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-52 bg-base-100 text-white h-full" style={{ backgroundColor: "#4140CA" }}>
          <li><NavLink to="/">Dashboard</NavLink></li>
          <li><NavLink to="/categories">Categories</NavLink></li>
          <li><NavLink to="/register">Register Admin</NavLink></li>
          <li onClick={logoutHandler}><a>Sign Out</a></li>
        </ul>
      </div>
    </div >
  )
}