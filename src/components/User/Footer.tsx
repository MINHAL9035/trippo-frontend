import { motion, Variants, useAnimation } from "framer-motion";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const Footer = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
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
      color: "#FACC15", // Tailwind yellow-400
      transition: {
        type: "spring",
        stiffness: 300,
      },
    },
  };

  return (
    <motion.footer
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className="py-12 px-4 md:px-8"
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Website Name */}
          <motion.div variants={itemVariants} className="text-center md:text-left">
            <h2 className="text-3xl font-bold mb-4">Trippo</h2>
            <p className="">Your travel companion</p>
          </motion.div>

          {/* Products */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-semibold mb-4">Products</h3>
            <ul className="space-y-2">
              <motion.li variants={linkVariants} whileHover="hover">
                <Link to="/plan-trip" className="block text-black dark:text-white hover:text-yellow-400">Plan Trip</Link>
              </motion.li>
              <motion.li variants={linkVariants} whileHover="hover">
                <Link to="/expense-tracker" className="block text-black dark:text-white hover:text-yellow-400">Expense Tracker</Link>
              </motion.li>
              <motion.li variants={linkVariants} whileHover="hover">
                <Link to="/community" className="block text-black dark:text-white hover:text-yellow-400">Community</Link>
              </motion.li>
            </ul>
          </motion.div>

          {/* General */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-semibold mb-4">General</h3>
            <ul className="space-y-2">
              <motion.li variants={linkVariants} whileHover="hover">
                <Link to="/about" className="block text-black dark:text-white hover:text-yellow-400">About</Link>
              </motion.li>
              <motion.li variants={linkVariants} whileHover="hover">
                <Link to="/contact" className="block text-black dark:text-white hover:text-yellow-400">Contact Us</Link>
              </motion.li>
            </ul>
          </motion.div>

          {/* Social */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-semibold mb-4">Social</h3>
            <div className="flex space-x-4">
              <motion.a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                variants={linkVariants}
                whileHover="hover"
              >
                <svg
                  className="w-6 h-6 text-black dark:text-white hover:text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </motion.a>
              <motion.a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                variants={linkVariants}
                whileHover="hover"
              >
                <svg
                  className="w-6 h-6 text-black dark:text-white hover:text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                </svg>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
      <motion.div
        variants={itemVariants}
        className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-400"
      >
        © {new Date().getFullYear()} Trippo. All rights reserved.
      </motion.div>
    </motion.footer>
  );
};

export default Footer;