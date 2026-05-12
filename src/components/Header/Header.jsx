import Container from "../container/Container";
import Logo from "../Logo";
import LogoutBtn from "./LogoutBtn";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/60 bg-white/75 py-3 shadow-sm shadow-slate-900/5 backdrop-blur-xl">
      <Container>
        <nav className="flex flex-wrap items-center gap-4">
          <div className="mr-2">
            <Link
              to="/"
              className="group flex items-center gap-3 rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-600"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-slate-950 p-2 shadow-lg shadow-slate-900/15 transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105">
                <Logo width="32px" className="drop-shadow-sm" />
              </span>
              <span className="leading-tight">
                <span className="block text-base font-black tracking-wide text-slate-950">
                  MegaBlog
                </span>
                <span className="text-xs font-semibold uppercase text-teal-700">
                  Stories hub
                </span>
              </span>
            </Link>
          </div>
          <ul className="ml-auto flex flex-wrap items-center justify-end gap-2">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="inline-flex items-center rounded-full px-4 py-2 text-sm font-bold text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-950 hover:text-white hover:shadow-lg hover:shadow-slate-900/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null,
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
