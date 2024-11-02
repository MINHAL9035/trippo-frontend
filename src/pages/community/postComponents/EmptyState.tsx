import { PlusSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import CreatePostModal from "../utils/CreatePostModal";
import { IPostInterface } from "@/interface/user/IPost.interface";
import { getPosts } from "@/service/api/community";
import handleError from "@/utils/errorHandler";

const EmptyState = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [, setPosts] = useState<IPostInterface[]>([]);
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleClickCreate = () => {
    setIsModalOpen(true);
  };
  const fetchPosts = async () => {
    try {
      const response = await getPosts();
      if (response.status === 200) {
        setPosts(response.data);
      }
    } catch (error) {
      handleError(error);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <Card className="w-full  mt-28">
        <CardContent className="flex flex-col items-center justify-center py-16 px-4 text-center">
          <div className="rounded-full  p-4 ">
            <PlusSquare className="w-12 h-12 " />
          </div>
          <h3 className="text-xl font-semibold  mb-2">No Posts Yet</h3>
          <p className="text-gray-500 mb-6 max-w-sm">
            Share your moments with the community. Create your first post and
            start connecting with others!
          </p>
          <Button
            onClick={handleClickCreate}
            className="bg-yellow-400 hover:bg-yellow-600  flex items-center gap-2"
          >
            <PlusSquare className="w-4 h-4" />
            Create Your First Post
          </Button>
        </CardContent>
      </Card>
      <CreatePostModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onPostCreated={fetchPosts}
      />
    </>
  );
};

export default EmptyState;
