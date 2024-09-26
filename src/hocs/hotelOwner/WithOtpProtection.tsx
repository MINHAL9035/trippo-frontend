import React from 'react';
import { RootState } from "@/redux/store/store";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface WithOtpProtectionProps {
  component: React.ComponentType;
}

const WithOtpProtection: React.FC<WithOtpProtectionProps> = ({ component: Component }) => {
  const isOtpVerified = useSelector((state: RootState) => state.hotelOwner.isOtpVerified);

  if (!isOtpVerified) {
    return <Navigate to="/hotelOwner" replace />;
  }

  return <Component />;
};

export default WithOtpProtection;