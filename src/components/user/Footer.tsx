import { useEffect } from "react";
import { motion, Variants, useAnimation } from "framer-motion";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";

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
      scale: 1.1,
      color: "#ffd700",
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
      className="py-10 bg-gray-50 dark:bg-black"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div variants={itemVariants}>
            <h2 className="text-2xl font-bold mb-4">Trippo</h2>
            <p className="text-gray-400">officialtrippo@gmail.com</p>
            <p className="text-gray-400">+91 9072299035</p>
          </motion.div>

          <motion.div variants={itemVariants} className="md:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium mb-2">Company</h3>
                <ul className="space-y-2">
                  <motion.li variants={linkVariants} whileHover="hover">
                    <Link
                      to="/trip"
                      className="hover:text-yellow-400 transition-colors duration-200"
                    >
                      Plan a Trip
                    </Link>
                  </motion.li>
                  <motion.li variants={linkVariants} whileHover="hover">
                    <Link
                      to="/community"
                      className="hover:text-yellow-400 transition-colors duration-200"
                    >
                      Community
                    </Link>
                  </motion.li>
                  <motion.li variants={linkVariants} whileHover="hover">
                    <Link
                      to="/explore"
                      className="hover:text-yellow-400 transition-colors duration-200"
                    >
                      Explore
                    </Link>
                  </motion.li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Legal</h3>
                <ul className="space-y-2">
                  <motion.li variants={linkVariants} whileHover="hover">
                    <Link
                      to="/about"
                      className="hover:text-yellow-400 transition-colors duration-200"
                    >
                      About Us
                    </Link>
                  </motion.li>
                  <motion.li variants={linkVariants} whileHover="hover">
                    <Link
                      to="/contact"
                      className="hover:text-yellow-400 transition-colors duration-200"
                    >
                      Contact Us
                    </Link>
                  </motion.li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={itemVariants}
          className="mt-8 pt-4 border-t text-center text-sm text-gray-400 flex items-center justify-between"
        >
          <p>© {new Date().getFullYear()} Trippo Inc.</p>
          <div className="flex space-x-4">
            <motion.a
              href="#"
              variants={linkVariants}
              whileHover="hover"
              className="hover:text-yellow-400 transition-colors duration-200"
            >
              <FaFacebook />
            </motion.a>
            <motion.a
              href="#"
              variants={linkVariants}
              whileHover="hover"
              className="hover:text-yellow-400 transition-colors duration-200"
            >
              <FaInstagram />
            </motion.a>
            <motion.a
              href="#"
              variants={linkVariants}
              whileHover="hover"
              className="hover:text-yellow-400 transition-colors duration-200"
            >
              <FaTwitter />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;