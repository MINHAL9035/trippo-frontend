import  { useEffect } from "react";
import { motion, Variants, useAnimation } from "framer-motion";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Plane,
  CreditCard,
  Users,
  MapPin,
} from "lucide-react";

const Footer = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const linkVariants: Variants = {
    hover: {
      scale: 1.05,
      color: "#10B981", 
      transition: {
        type: "spring",
        stiffness: 300,
      },
    },
  };

  const products = [
    { name: "Plan Trip", icon: Plane },
    { name: "Expense Tracker", icon: CreditCard },
    { name: "Community", icon: Users },
    { name: "Destinations", icon: MapPin },
  ];

  return (
    <motion.footer
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className="py-10  bg-gray-50 dark:bg-black relative overflow-hidden"
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Website Name and Description */}
          <motion.div
            variants={itemVariants}
            className="text-center md:text-left col-span-1 md:col-span-2 lg:col-span-1"
          >
            <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-blue-600">
              Trippo
            </h2>
            <p className="mt-2 text-gray-400 text-justify leading-relaxed">
              Embark on unforgettable journeys with Trippo, your ultimate travel
              companion. We're here to make your adventures seamless, memorable,
              and extraordinary.
            </p>
          </motion.div>

          {/* Products */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-semibold mb-2 bg-clip-text text-transparent  bg-gradient-to-r from-yellow-400 to-blue-600">
              Explore
            </h3>
            <ul className="space-y-4">
              {products.map((item, index) => (
                <motion.li
                  key={index}
                  variants={linkVariants}
                  whileHover="hover"
                  className="flex items-center"
                >
                  <item.icon className="w-5 h-5 mr-2 text-black dark:text-white" />
                  <Link
                    to={`/${item.name.toLowerCase().replace(" ", "-")}`}
                    className="hover:text-yellow-400  text-black dark:text-white transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-semibold mb-2 bg-clip-text text-transparent  bg-gradient-to-r from-yellow-400 to-blue-600">
              Quick Links
            </h3>
            <ul className="space-y-4">
              {[
                "About Us",
                "Contact",
                "FAQ",
                "Privacy Policy",
                "Terms of Service",
              ].map((item, index) => (
                <motion.li
                  key={index}
                  variants={linkVariants}
                  whileHover="hover"
                >
                  <Link
                    to={`/${item.toLowerCase().replace(" ", "-")}`}
                    className="hover:text-yellow-400 transition-colors text-black dark:text-white duration-200"
                  >
                    {item}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Social & Newsletter */}
          <motion.div variants={itemVariants}>
            <h3 className="text-1xl font-semibold mb-4 text-yellow-400">
              Stay Connected
            </h3>
            <div className="flex space-x-4 mb-6">
              {[Facebook, Instagram, Twitter, Linkedin].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={linkVariants}
                  whileHover="hover"
                  className="bg-gray-800 p-2 rounded-full text-gray-300 hover:text-emerald-400 hover:bg-gray-700 transition-all duration-200"
                >
                  <Icon size={24} />
                </motion.a>
              ))}
            </div>
            <form className="mt-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-400 mb-2"
              >
                Subscribe to our newsletter
              </label>
              <div className="flex items-center">
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className="flex-grow px-4 py-2 rounded-l-md text-gray-900 focus:ring-2 focus:ring-yellow-400 bg-gray-100"
                />
                <button
                  type="submit"
                  className="bg-yellow-400 text-white px-4 py-2 rounded-r-md hover:bg-yellow-600 transition-colors duration-200"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </motion.div>
        </div>

        <motion.div
          variants={itemVariants}
          className="mt-7 pt-5 border-t border-gray-700 text-center text-sm text-gray-400 flex flex-col md:flex-row justify-between items-center"
        >
          <p>© {new Date().getFullYear()} Trippo. All rights reserved.</p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;


