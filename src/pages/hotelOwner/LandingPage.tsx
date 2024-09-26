import { motion } from "framer-motion";
import { Hotel, Star, Shield } from "lucide-react";
import NavBar from "@/components/owner/NavBar";
import Footer from "@/components/owner/Footer";
import RegistrationForm from "./registration/RegistrationForm";
import RegistrationFormOtp from "./registration/RegistrationFormOtp";
import { useEffect, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { setOtpVerified } from "@/redux/slices/hotelOwnerSlice";
import { useDispatch } from "react-redux";
import LoginModal from "./registration/LoginModal";

const LandingPage = () => {
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setOtpVerified(false));
  }, [dispatch]);

  const handleEmailSubmitSuccess = (submittedEmail: string) => {
    setEmail(submittedEmail);
    setShowOtpForm(true);
  };

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };

  return (
    <>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <Spin
            indicator={
              <LoadingOutlined style={{ fontSize: 48, color: "#fff" }} spin />
            }
          />
        </div>
      )}
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 flex flex-col">
        <NavBar onLoginClick={handleLoginClick} />
        <main className="flex-grow container mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full lg:w-1/2"
            >
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 sm:mb-6">
                Revolutionize Your Hotel{" "}
                <span className="text-yellow-400">Management</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-500 mb-6 sm:mb-8">
                Join Trippo and transform your hospitality business with our
                cutting-edge platform.
              </p>
              <div className="space-y-3 sm:space-y-4">
                {[
                  { icon: Hotel, text: "Streamline operations" },
                  { icon: Star, text: "Enhance guest experiences" },
                  { icon: Shield, text: "Secure and reliable" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
                    <span className="text-sm sm:text-base text-gray-700">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full lg:w-1/2 max-w-md mx-auto lg:mx-0"
            >
              <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6">
                  Join Us as a Hotel Proprietor
                </h2>
                {!showOtpForm ? (
                  <RegistrationForm
                    onSubmitSuccess={handleEmailSubmitSuccess}
                    loading={loading}
                    setLoading={setLoading}
                  />
                ) : (
                  <RegistrationFormOtp email={email} />
                )}
                <p className="mt-4 text-xs text-gray-500 text-center">
                  By signing up, you agree to our Terms and Privacy Policy
                </p>
              </div>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>

      <LoginModal isOpen={showLoginModal} onClose={handleCloseLoginModal} />
    </>
  );
};

export default LandingPage;