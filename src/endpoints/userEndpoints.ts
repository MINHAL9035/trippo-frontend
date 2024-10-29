const userEndpoints = {
  signUp: "/users/register",
  verifyOtp: "/users/verify-otp",
  resendOtp: "/users/resend-otp",
  login: "/auth/login",
  logout: "/auth/logout",
  googleLogin: "/auth/google-login",
  getUserDetails: "/users/getUserDetails",
  editProfile: "/users/editProfile",
  ForgetPassWordOtp: "/auth/forgotOtp",
  verifyForgotOtp: "/auth/verifyForgotOtp",
  changePassword: "/auth/changePassword",
  searchResults: "/users/searchResults",
  getSingleHotelDetails: "/users/getHotelDetails",
  pendingBookings: "/users/pendingBookings",
  getBookingDetails: "/users/getBookingDetails",
  getCompletedBookings: "/users/completedBookings",
  userBookings: "/users/bookings",
  cancelledBookings:"/users/cancelled",
  cancelBooking: "/users/cancelBooking",
  userWallet: "/users/wallet",
  getGroups:"/users/getGroups"
};

export default userEndpoints;
