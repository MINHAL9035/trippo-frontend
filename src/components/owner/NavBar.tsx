import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface NavBarProps {
  onLoginClick: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ onLoginClick }) => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold text-yellow-400"
          >
            Trippo
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button variant="outline" className="bg-yellow-400 hover:bg-yellow-500" onClick={onLoginClick}>
              Owner Login
            </Button>
          </motion.div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;