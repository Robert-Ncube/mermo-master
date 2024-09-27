import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex flex-col p-4 items-center justify-center font-bold text-4xl bg-slate-600">
      <ul>
        <li>
          <Link to="/">Memo-Master</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
