import React from "react";
import { Link } from "react-router-dom";

const CommunityFooter = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { name: "About", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Help", href: "#" },
    { name: "Privacy", href: "#" },
    { name: "Terms", href: "#" },
  ];

  return (
    <footer className=" text-gray-400 py-4 text-xs">
      <div className="container mx-auto px-4">
        <nav className="flex flex-wrap justify-center mb-4">
          {footerLinks.map((link, index) => (
            <React.Fragment key={link.name}>
              <Link to={link.href} className="hover:underline mx-2 my-1">
                {link.name}
              </Link>
              {index < footerLinks.length - 1 && (
                <span className="mx-2 my-1">·</span>
              )}
            </React.Fragment>
          ))}
        </nav>
        <div className="flex justify-center items-center space-x-4">
          <p>© {currentYear} Trippo from Meta</p>
        </div>
      </div>
    </footer>
  );
};

export default CommunityFooter;
