import React, { useEffect, useState } from "react";
import {
  MoreVertical,
  Heart,
  MessageCircle,
  Bookmark,
  Edit,
  Trash,
  EyeOff,
  ChevronLeft,
  ChevronRight,
  MapPin,
} from "lucide-react";
import { IPostInterface } from "@/interface/user/IPost.interface";
import { getPosts } from "@/service/api/community";
import handleError from "@/utils/errorHandler";

interface ImageCarouselProps {
  images: string[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="relative w-full h-96 mb-4">
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        className="w-full h-full object-cover rounded-md"
      />
      {images.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={goToNext}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
          >
            <ChevronRight size={24} />
          </button>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index: number) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentIndex ? "bg-white" : "bg-gray-400"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffHours < 24) {
    return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
  } else if (diffDays < 30) {
    return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;
  } else if (date.getFullYear() === now.getFullYear()) {
    return date.toLocaleDateString("en-US", { month: "long", day: "numeric" });
  } else {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
};

interface PostCardProps {
  post: IPostInterface;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="rounded-md mb-6">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full mr-3 overflow-hidden">
                <img
                  src={post.userId.image}
                  alt={post.userId.fullName}
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="font-semibold">{post.userId.fullName}</span>
            </div>
            {post.place && (
              <div className="flex items-center mt-1 text-sm text-gray-500">
                <MapPin size={14} className="mr-1" />
                <span>{post.place}</span>
              </div>
            )}
          </div>
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <MoreVertical size={20} />
            </button>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                <div className="py-1">
                  <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                    <Edit className="mr-2 h-4 w-4" /> Edit
                  </button>
                  <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                    <Trash className="mr-2 h-4 w-4" /> Delete
                  </button>
                  <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                    <EyeOff className="mr-2 h-4 w-4" /> Hide
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        {post.imageUrl && post.imageUrl.length > 0 && (
          <ImageCarousel images={post.imageUrl} />
        )}
        <p className="text-gray-800 mb-2">{post.description}</p>
        <p className="text-sm text-gray-500 mb-4">
          {formatDate(post.createdAt)}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`flex items-center px-2 py-1 rounded-md ${
                isLiked ? "text-red-500" : "text-gray-500"
              } hover:bg-gray-100`}
            >
              <Heart className="mr-2 h-5 w-5" />
            </button>
            <button className="flex items-center px-2 py-1 rounded-md text-gray-500 hover:bg-gray-100">
              <MessageCircle className="mr-2 h-5 w-5" />
            </button>
          </div>
          <button
            onClick={() => setIsSaved(!isSaved)}
            className={`p-1 rounded-full ${
              isSaved ? "text-blue-500" : "text-gray-500"
            } hover:bg-gray-100`}
          >
            <Bookmark className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<IPostInterface[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await getPosts();
        if (response.status === 200) {
          setPosts(response.data);
        }
      } catch (error) {
        handleError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
