import { LayoutGrid, Bookmark } from "lucide-react";

const CommunityProfile = () => {
  const profileData = {
    username: "md.robiulalomemon",
    name: "MD Robiul Alom Emon",
    bio: "Md Robiul Alom Emon is a logo designer specializing in modern, minimalist brand identities.",
    postsCount: 3,
    followersCount: 7,
    followingCount: 41,
  };

  const posts = [
    {
      id: 1,
      imageUrl: "/src/assets/images/explore.jpg",
      alt: "NDRA Electrical logo design on black background",
    },
    {
      id: 2,
      imageUrl: "/src/assets/images/explore.jpg",
      alt: "Aurae perfume packaging in purple",
    },
    {
      id: 3,
      imageUrl: "/src/assets/images/explore.jpg",
      alt: "Green packaging design with natural elements",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex items-center gap-8 mb-8">
        <img
          src="/src/assets/images/home1.jpg"
          alt="Profile"
          className="w-32 h-32 rounded-full"
        />
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-4">
            <h2 className="text-xl font-normal">{profileData.username}</h2>
            <button className="bg-[#0095F6] text-white px-4 py-1.5 rounded-lg text-sm font-semibold">
              Follow
            </button>
          </div>

          <div className="flex gap-8 mb-4">
            <span>
              <strong>{profileData.postsCount}</strong> posts
            </span>
            <span>
              <strong>{profileData.followersCount}</strong> followers
            </span>
            <span>
              <strong>{profileData.followingCount}</strong> following
            </span>
          </div>

          <div>
            <h1 className="font-semibold">{profileData.name}</h1>
            <p className="text-sm">{profileData.bio}</p>
          </div>
        </div>
      </div>

      <div className="border-t">
        <div className="flex justify-center gap-12 -mb-px">
          <button className="flex items-center gap-2 py-4 text-sm font-semibold border-t border-black">
            <LayoutGrid size={12} />
            POSTS
          </button>
          <button className="flex items-center gap-2 py-4 text-sm font-semibold text-gray-500">
            <Bookmark size={12} />
            TAGGED
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-1">
        {posts.map((post) => (
          <div key={post.id} className="aspect-square">
            <img
              src={post.imageUrl}
              alt={post.alt}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityProfile;
