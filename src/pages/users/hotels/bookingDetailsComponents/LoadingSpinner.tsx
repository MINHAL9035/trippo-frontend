const LoadingSpinner = () => {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <p className="text-gray-600 font-medium">Loading booking details...</p>
        </div>
      </div>
    );
  };
  
  export default LoadingSpinner;