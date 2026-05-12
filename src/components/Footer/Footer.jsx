import { Link } from "react-router-dom";
import Logo from "../Logo";
import Container from "../container/Container";

function Footer() {
  const groups = [
    {
      title: "Company",
      links: ["Features", "Pricing", "Affiliate Program", "Press Kit"],
    },
    {
      title: "Support",
      links: ["Account", "Help", "Contact Us", "Customer Support"],
    },
    {
      title: "Legals",
      links: ["Terms & Conditions", "Privacy Policy", "Licensing"],
    },
  ];

  return (
    <footer className="mt-12 border-t border-white/70 bg-white/70 py-12 backdrop-blur-xl">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <Link to="/" className="inline-flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-slate-950 p-2 shadow-lg shadow-slate-900/15">
                <Logo width="32px" />
              </span>
              <span>
                <span className="block text-lg font-black text-slate-950">
                  MegaBlog
                </span>
                <span className="text-sm font-semibold text-slate-500">
                  Publish beautifully.
                </span>
              </span>
            </Link>
            <p className="mt-6 max-w-md text-sm leading-6 text-slate-500">
              &copy; Copyright 2023. All Rights Reserved by DevUI.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {groups.map((group) => (
              <div key={group.title}>
                <h3 className="mb-5 text-xs font-black uppercase tracking-[0.2em] text-teal-700">
                  {group.title}
                </h3>
                <ul className="space-y-3">
                  {group.links.map((link) => (
                    <li key={link}>
                      <Link
                        className="text-sm font-bold text-slate-600 transition-colors duration-200 hover:text-slate-950"
                        to="/"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
