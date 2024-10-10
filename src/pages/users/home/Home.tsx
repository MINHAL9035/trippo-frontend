import { useEffect } from "react";
import NavBar from "@/components/user/NavBar";
import Footer from "@/components/user/Footer";
import { ArrowRight } from "lucide-react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Home = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <motion.main
        className="flex-grow container mx-auto px-4 py-12 md:py-20"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Original content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-20">
          <motion.div className="space-y-6" variants={itemVariants}>
            <div className="space-y-2 -mt-28">
              <h1 className="text-3xl md:text-4xl font-bold">
                From dreams to destination
              </h1>
              <h1 className="text-3xl md:text-4xl font-bold">
                Create unforgettable{" "}
                <span className="text-yellow-400">Memories</span>
              </h1>
              <h1 className="text-4xl md:text-4xl font-bold">
                Plan effortlessly!
              </h1>
            </div>
            <p className="text-sm md:text-base text-gray-600 max-w-md mt-5">
              Embark on a journey where every destination is an opportunity to
              explore, connect, and experience the wonders of the world. Whether
              you're seeking hidden gems or iconic landmarks, let your
              adventures shape memories that last a lifetime.
            </p>
            <motion.button
              className="bg-yellow-400 mt-5 px-6 py-3 rounded-md flex items-center space-x-2 text-black font-semibold hover:bg-yellow-500 transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Get Started</span>
              <ArrowRight size={20} />
            </motion.button>
          </motion.div>
          <motion.div
            className="grid grid-cols-2 gap-4"
            variants={itemVariants}
          >
            <div className="space-y-4">
              <motion.img
                src="/src/assets/images/home2.jpg"
                alt="Coastal road with boat"
                className="w-full h-64 object-cover rounded-md"
                whileHover={{ scale: 1.05 }}
              />
              <motion.img
                src="/src/assets/images/home3.jpg"
                alt="Japanese castle"
                className="w-full h-64 object-cover rounded-md"
                whileHover={{ scale: 1.05 }}
              />
            </div>
            <motion.div className="flex items-center">
              <motion.img
                src="/src/assets/images/home1.jpg"
                alt="Snowy landscape with person"
                className="w-full h-full object-cover rounded-md"
                whileHover={{ scale: 1.05 }}
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Modified Wanderers Unite section */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
        >
          <motion.div
            className="grid grid-cols-2 gap-4 order-2 md:order-1"
            variants={itemVariants}
          >
            <motion.img
              src="/src/assets/images/home1.jpg"
              alt="Group hiking in desert"
              className="w-full h-80 object-cover rounded-md"
              whileHover={{ scale: 1.05 }}
            />
            <motion.img
              src="/src/assets/images/home1.jpg"
              alt="Friends enjoying view"
              className="w-full h-60 object-cover rounded-md mt-20"
              whileHover={{ scale: 1.05 }}
            />
          </motion.div>
          <motion.div
            className="space-y-6 order-1 md:order-2"
            variants={itemVariants}
          >
            <h2 className="text-4xl font-bold">
              <span className="text-blue-600">Wanderers</span> Unite
            </h2>
            <h3 className="text-3xl font-bold">
              Join Our <span className="text-blue-600">Community</span>
            </h3>
            <p className="text-sm md:text-base text-gray-600 max-w-md">
              Connect with fellow travelers, share experiences, and grow as we
              journey together. Whether you're looking to meet new friends,
              share travel hacks, or find travel companions, our community is
              your home away from home. Let's make your solo travels feel less
              solo!
            </p>
            <motion.button
              className="bg-white text-blue-600 border-2 border-blue-600 px-6 py-3 rounded-md flex items-center space-x-2 font-semibold hover:bg-blue-50 transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Explore Community</span>
              <ArrowRight size={20} />
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.main>
      <Footer />
    </div>
  );
};

export default Home;
