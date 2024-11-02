import { useEffect, useRef } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import NavBar from "@/components/user/NavBar";
import Footer from "@/components/user/Footer";
import { RootState } from "@/redux/store/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const planTripRef = useRef<HTMLDivElement>(null);

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
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  const scrollToPlanTrip = () => {
    planTripRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const navigate = useNavigate();

  const handleClick = () => {
    if (userInfo) {
      navigate("/ai-create-trip");
    } else {
      navigate("/trips");
    }
  };
  const handleCommunityClick = () => {
    if (userInfo) {
      navigate("/community");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <motion.main
        className="flex-grow container mx-auto px-4 py-8 md:py-16"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Hero Section */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-16"
          variants={containerVariants}
        >
          <motion.div className="space-y-10" variants={itemVariants}>
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl  lg:text-5xl font-bold">
                From dreams to destination
              </h1>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                Create unforgettable{" "}
                <span className="text-yellow-400">Memories</span>
              </h1>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                Plan effortlessly!
              </h1>
            </div>
            <p className="text-sm md:text-base dark:text-gray-400 text-gray-800 max-w-md">
              Embark on a journey where every destination is an opportunity to
              explore, connect, and experience the wonders of the world.
            </p>
            <motion.button
              onClick={scrollToPlanTrip}
              className="bg-yellow-400 px-6 py-3 rounded-md flex items-center space-x-2 font-semibold hover:bg-yellow-500 transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Get Started</span>
              <ArrowDown size={20} />
            </motion.button>
          </motion.div>
          <motion.div
            className="grid grid-cols-2 gap-4"
            variants={itemVariants}
          >
            <div className="space-y-4">
              <motion.img
                src="/public/images/home1.jpg"
                alt="Coastal road with boat"
                className="w-full h-40 md:h-64 object-cover rounded-md"
                whileHover={{ scale: 1.05 }}
              />
              <motion.img
                src="/public/images/home2.jpg"
                alt="Japanese castle"
                className="w-full h-40 md:h-64 object-cover rounded-md"
                whileHover={{ scale: 1.05 }}
              />
            </div>
            <motion.div className="flex items-center">
              <motion.img
                src="/public/images/home3.jpg"
                alt="Snowy landscape with person"
                className="w-full h-full object-cover rounded-md"
                whileHover={{ scale: 1.05 }}
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Plan Your Trip section */}
        <motion.div
          ref={planTripRef}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="my-16 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center rounded-lg overflow-hidden"
        >
          <motion.div
            className="relative h-64 md:h-96 lg:h-full"
            variants={itemVariants}
          >
            <img
              src='images/home/homeAi.png'
              alt="Plan your trip"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <motion.div className="space-y-6 p-10" variants={itemVariants}>
            <h2 className="text-3xl md:text-4xl font-bold">
              Plan Your <span className="text-yellow-400">Trip</span>
              <br />
              in <span className="text-yellow-400">minutes</span>
            </h2>

            <p className="text-sm md:text-base dark:text-gray-400 text-gray-800 max-w-md">
              Receive a custom itinerary tailored for you, enriched with
              traveler insights and reviews.
            </p>
            <motion.button
              className="bg-yellow-400 px-6 py-3 rounded-md flex items-center space-x-2 font-semibold hover:bg-yellow-500 transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleClick}
            >
              <span>Start a trip with AI</span>
              <ArrowRight size={20} />
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Wanderers Unite section */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="my-16 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center rounded-lg overflow-hidden"
        >
          <motion.div
            className="space-y-4 p-8 order-2 lg:order-1"
            variants={itemVariants}
          >
            <h2 className="text-3xl md:text-4xl font-bold">
              <span className="text-yellow-400">Wanderers</span> Unite
            </h2>
            <h3 className="text-2xl md:text-3xl font-bold ">
              Join Our <span className="text-yellow-400">Community</span>
            </h3>
            <p className="text-sm md:text-base dark:text-gray-400  text-gray-800 max-w-md">
              Connect with fellow travelers, share experiences,
              <br /> and grow as we journey together. Let's make <br /> your
              solo travels feel less solo!
            </p>
            <motion.button
              className="bg-yellow-400 px-6 py-3 rounded-md flex items-center space-x-2 font-semibold hover:bg-yellow-500 transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCommunityClick}
            >
              <span>Explore Community</span>
              <ArrowRight size={20} />
            </motion.button>
          </motion.div>
          <motion.div
            className="grid grid-cols-2 gap-4 p-8 order-1 lg:order-2"
            variants={itemVariants}
          >
            <motion.img
              src="images/home/homeC1 (2).jpg"
              alt="Group hiking in desert"
              className="w-full h-48 md:h-72 object-cover rounded-md"
              whileHover={{ scale: 1.05 }}
            />
            <motion.img
              src="images/home/homeC2.jpg"
              alt="Friends enjoying view"
              className="w-full h-32 md:h-72 object-cover rounded-md mt-8 md:mt-16"
              whileHover={{ scale: 1.05 }}
            />
          </motion.div>
        </motion.div>
      </motion.main>
      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
};

export default Home;
