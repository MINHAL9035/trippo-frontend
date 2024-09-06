const ProfileBottom = () => {
  return (
    <>
      <div className="rounded-lg border p-6">
        <div className="border-b  pb-4 mb-4">
          <button className="mr-4 text-yellow-500 font-medium">
            Activity feed
          </button>
          <button className="mr-4 text-gray-500">Trips</button>
          <button className="mr-4 text-gray-500">Account info</button>
          <button className="mr-4 text-gray-500">Photos</button>
          <button className="mr-4 text-gray-500">Reviews</button>
          <button className="text-gray-500">Travel map</button>
        </div>
        <div className="flex justify-center items-center h-[320px]  rounded-lg">
          <div className="text-center">
            <h3 className="font-semibold mb-2">Build Your Travel Identity</h3>
            <p className="text-sm text-gray-500">
              Include photos and reviews to make it easier for people to find
              and connect with you
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileBottom;
