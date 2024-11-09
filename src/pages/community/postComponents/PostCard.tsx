import { Heart, MessageCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IPostInterface } from "@/interface/user/IPost.interface";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import socket from "@/service/socket.service";
import CommentModal from "./utils/CommentModal";

interface PostProps {
  post: IPostInterface;
}

const PostCard: React.FC<PostProps> = ({ post }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [likes, setLikes] = useState<string[]>(post.likes || []);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const currentUser = userInfo.userId;
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "MMMM dd, yyyy 'at' hh:mm a");
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? post.imageUrl.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === post.imageUrl.length - 1 ? 0 : prev + 1
    );
  };

  const handleUserClick = (userName: string) => {
    navigate(`/${userName}`);
  };

  // liking the post
  useEffect(() => {
    socket.connect();
    socket.on("connect", () => {
      console.log("Socket connected");
    });

    socket.on("post_liked", (data) => {
      if (data.postId === post._id) {
        setLikes(data.likes);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [post._id]);

  const handleLike = () => {
    if (socket) {
      socket.emit("like_post", {
        postId: post._id,
        userId: currentUser,
      });
    }
  };

  const isLiked = likes.includes(currentUser);

  return (
    <>
      <div className="border border-gray-200 rounded-lg mb-6 ">
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          <div className="flex flex-col items-center cursor-pointer">
            <div
              className="flex items-center space-x-3"
              onClick={() => handleUserClick(post.userId.userName)}
            >
              <Avatar className="w-8 h-8">
                <AvatarImage src={post.userId.image} />
                <AvatarFallback>{post.userId.fullName}</AvatarFallback>
              </Avatar>
              <span className="font-semibold">{post.userId.userName}</span>
            </div>
          </div>
          <button className="text-gray-600">•••</button>
        </div>

        {/* Image Carousel */}
        <div className="relative">
          <img
            src={post.imageUrl[currentImageIndex]}
            alt={`${post.description} - Image ${currentImageIndex + 1}`}
            className="w-full object-cover max-h-[600px]"
          />

          {post.imageUrl.length > 1 && (
            <>
              {/* Navigation Arrows */}
              <button
                onClick={handlePrevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 p-1 rounded-full text-white hover:bg-black/70 transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 p-1 rounded-full text-white hover:bg-black/70 transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Image Indicator Dots */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {post.imageUrl.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentImageIndex ? "bg-white" : "bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Action Buttons */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleLike}
                className={` ${isLiked ? "text-red-500" : ""}`}
              >
                <Heart className={`w-6 h-6 ${isLiked ? "fill-current" : ""}`} />
              </button>
              <button
                onClick={() => setIsCommentModalOpen(true)}
                className="hover:text-gray-600"
              >
                <MessageCircle className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Likes */}
          <div className="font-semibold mb-2">
            {likes.length} {likes.length === 1 ? "like" : "likes"}
          </div>

          {/* Caption */}
          <div className="space-y-1">
            <p>
              <span className="font-semibold mr-2">{post.userId.userName}</span>
              {post.description}
            </p>
          </div>

          {/* Comments Preview */}
          <button
            onClick={() => setIsCommentModalOpen(true)}
            className="text-gray-500 text-sm mt-2"
          >
            View all comments
          </button>

          {/* Timestamp */}
          <div className="text-gray-500 text-xs mt-2">
            {formatDate(post.createdAt)}
          </div>
        </div>
      </div>
      <CommentModal
        post={post}
        isOpen={isCommentModalOpen}
        onClose={() => setIsCommentModalOpen(false)}
      />
    </>
  );
};

export default PostCard;
