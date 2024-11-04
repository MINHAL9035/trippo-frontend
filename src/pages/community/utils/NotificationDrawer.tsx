import { X } from "lucide-react";

interface NotificationDrawerProps {
  isNotificationOpen: boolean;
  onClose: () => void;
}

const NotificationDrawer = ({
  isNotificationOpen,
  onClose,
}: NotificationDrawerProps) => {
  return (
    <>
      <div
        className={`fixed left-28 top-0 h-full   transition-all duration-300 z-10 ${
          isNotificationOpen ? "w-80 border-r" : "w-0"
        } overflow-hidden`}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Notifications</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="relative"></div>
          <div className="mt-4"></div>
        </div>
      </div>
    </>
  );
};

export default NotificationDrawer;
