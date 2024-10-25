import React, { useState } from "react";
import { AlertCircle, ChevronUp, ChevronDown } from "lucide-react";
export const CancellationPolicy: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
      >
        <AlertCircle className="w-4 h-4" />
        <span className="text-sm font-medium">Cancellation Policy</span>
        {isOpen ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </button>

      {isOpen && (
        <div className="mt-2 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-yellow-50 rounded-full">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">
                Important Note:
              </h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="min-w-3">•</span>
                  <span>
                    If you cancel within 24 hours of booking:{" "}
                    <span className="font-medium text-green-600">
                      100% refund
                    </span>{" "}
                    to your wallet
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="min-w-3">•</span>
                  <span>
                    If you cancel after 24 hours of booking:{" "}
                    <span className="font-medium text-yellow-600">
                      50% refund
                    </span>{" "}
                    to your wallet
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="min-w-3">•</span>
                  <span>
                    Refunded amount will be immediately available in your wallet
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
