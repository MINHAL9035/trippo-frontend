const ProfileTop = () => {
  return (
    <>
      <div className=" border rounded-lg  p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Your Achievements</h2>
        <p className="text-sm text-gray-500 mb-4">Start sharing to unlock</p>
        <div className="flex gap-4">
          <div className="flex-1 border border-gray-200 rounded-md p-4">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <span className="text-sm font-medium">
                Write your first review
              </span>
            </div>
          </div>
          <div className="flex-1 border border-gray-200 rounded-md p-4">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <span className="text-sm font-medium">
                Upload your first photo
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileTop;
