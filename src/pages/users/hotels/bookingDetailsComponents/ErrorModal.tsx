import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

interface ErrorResponse {
  statusCode?: number;
  timestamp?: string;
  path?: string;
  message?:
    | {
        message?: string;
        error?: string;
        statusCode?: number;
      }
    | string;
}

interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  error: Error | ErrorResponse | null;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ isOpen, onClose, error }) => {
  const getErrorMessage = (error: Error | ErrorResponse | null): string => {
    if (!error) return "An unknown error occurred";

    try {
      // If error is Error instance
      if (error instanceof Error) {
        try {
          const parsedError = JSON.parse(error.message) as ErrorResponse;
          if (
            typeof parsedError.message === "object" &&
            parsedError.message?.message
          ) {
            return parsedError.message.message;
          }
        } catch {
          return error.message;
        }
      }

      // If error is ErrorResponse
      const errorResponse = error as ErrorResponse;
      if (errorResponse.message) {
        if (
          typeof errorResponse.message === "object" &&
          errorResponse.message.message
        ) {
          return errorResponse.message.message;
        }
        if (typeof errorResponse.message === "string") {
          return errorResponse.message;
        }
      }

      // Fallback
      return "An unexpected error occurred";
    } catch (e) {
      return "An unexpected error occurred";
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <AlertCircle className="h-5 w-5" />
            Error
          </DialogTitle>
          <DialogDescription className="text-base text-foreground">
            {getErrorMessage(error)}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={onClose} variant="destructive">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ErrorModal;
