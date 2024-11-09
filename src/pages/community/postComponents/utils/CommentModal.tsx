import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, Send } from "lucide-react";
import { format } from "date-fns";
import { IPostInterface } from "@/interface/user/IPost.interface";
import socket from "@/service/socket.service";
import { RootState } from "@/redux/store/store";
import { useSelector } from "react-redux";
import { Comment } from "@/interface/community/message.interface";

interface CommentModalProps {
  post: IPostInterface;
  isOpen: boolean;
  onClose: () => void;
}

const CommentModal: React.FC<CommentModalProps> = ({
  post,
  isOpen,
  onClose,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const currentUserId = userInfo.userId;

  useEffect(() => {
    if (isOpen) {
      // Fetch existing comments when modal opens
      socket.emit(
        "get-comments",
        { postId: post._id },
        (response: Comment[]) => {
          setComments(response);
        }
      );

      // Listen for new comments
      socket.on("new_comment", (data: { postId: string; comment: Comment }) => {
        if (data.postId === post._id) {
          setComments((prev) => [data.comment, ...prev]);
        }
      });
    }

    return () => {
      socket.off("new_comment");
    };
  }, [isOpen, post._id]);

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

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment = {
      postId: post._id,
      text: commentText,
      userId: currentUserId,
    };

    socket.emit("create-comment", newComment);
    setCommentText("");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "MMMM dd, yyyy 'at' hh:mm a");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-screen-xl w-[95vw] p-0 overflow-hidden rounded-lg">
        <div className="flex flex-col md:flex-row h-[90vh] md:h-[85vh] bg-white relative">
          {/* Close button - visible on all screens */}

          {/* Left side - Image carousel */}
          <div className="w-full md:w-3/5 bg-black relative h-[45vh] md:h-full flex items-center justify-center">
            <img
              src={post.imageUrl[currentImageIndex]}
              alt={`Post ${currentImageIndex + 1}`}
              className="w-full h-full object-contain"
            />

            {post.imageUrl.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>

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

          {/* Right side - Comments section */}
          <div className="w-full md:w-2/5 flex flex-col h-[45vh] md:h-full border-l">
            {/* Header */}
            <div className="p-4 border-b">
              <div className="flex items-center space-x-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={post.userId.image} />
                  <AvatarFallback>{post?.userId?.fullName?.[0]}</AvatarFallback>
                </Avatar>
                <span className="font-semibold">{post.userId.userName}</span>
              </div>
            </div>

            {/* Comments area */}
            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300">
              {/* Original post */}
              <div className="p-4 border-b">
                <div className="flex space-x-3">
                  <Avatar className="w-8 h-8 flex-shrink-0">
                    <AvatarImage src={post.userId.image} />
                    <AvatarFallback>{post.userId.fullName?.[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="break-words">
                      <span className="font-semibold mr-2">
                        {post.userId.userName}
                      </span>
                      {post.description}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      {formatDate(post.createdAt)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Comments list */}
              <div className="p-4 space-y-6">
                {comments.map((comment) => (
                  <div key={comment._id} className="flex space-x-3 group">
                    <Avatar className="w-8 h-8 flex-shrink-0">
                      <AvatarImage src={comment.userId.image} />
                      <AvatarFallback>
                        {comment.userId.fullName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="break-words">
                        <span className="font-semibold mr-2">
                          {comment.userId.userName}
                        </span>
                        <span className="text-sm">{comment.text}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatDate(comment.createdAt)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom section */}
            <div className="border-t mt-auto">
              {/* <div className="p-4 border-b">
                <div className="flex items-center justify-between">
                  <button className="hover:text-red-500 transition-colors">
                    <Heart className="w-6 h-6" />
                  </button>
                  <span className="text-sm text-gray-500">
                    {post.likes.length}{" "}
                    {post.likes.length === 1 ? "like" : "likes"}
                  </span>
                </div>
              </div> */}

              <form onSubmit={handleSubmitComment} className="p-4">
                <div className="flex items-center space-x-3">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="flex-1 focus:outline-none text-sm"
                  />
                  <button
                    type="submit"
                    disabled={!commentText.trim()}
                    className="text-blue-500 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommentModal;
