import { PlusSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const EmptyState = () => {
  return (
    <Card className="w-full bg-white">
      <CardContent className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <div className="rounded-full bg-gray-50 p-4 mb-4">
          <PlusSquare className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No Posts Yet
        </h3>
        <p className="text-gray-500 mb-6 max-w-sm">
          Share your moments with the community. Create your first post and
          start connecting with others!
        </p>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2">
          <PlusSquare className="w-4 h-4" />
          Create Your First Post
        </Button>
      </CardContent>
    </Card>
  );
};

export default EmptyState;
