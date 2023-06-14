import Button from "./Button";

export default function Navbar() {
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <a className="btn btn-ghost normal-case text-xl">
          <img className="w-28" src="https://www.idntimes.com/assets/img/idntimes.png" alt="idntimes" />
        </a>
      </div>
      <div className="navbar-end">
        <Button />
      </div>
    </div>
  )
}
