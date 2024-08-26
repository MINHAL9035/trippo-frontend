import NavBar from "@/components/user/NavBar"

const TripList = () => {
  return (
    <>
    <NavBar/>
    <div className="max-w-7xl mx-auto p-6 space-y-6">
  <div className="flex justify-between items-center mb-4">
    <h2 className="text-3xl font-bold text-gray-900">Your Trips</h2>
    <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600">
      Create New Trip
    </button>
  </div>

  <div className="flex items-center bg-white rounded-lg shadow-lg p-4 border border-yellow-500">
    <img 
      className="w-1/3 h-40 object-cover rounded-lg"
      src="https://via.placeholder.com/400x250" 
      alt="Trip Image" 
    />
    <div className="ml-6 flex-grow">
      <h3 className="text-2xl font-semibold text-gray-900">Lets gooo....</h3>
      <div className="flex items-center mt-2 text-gray-700">
        <span className="flex items-center mr-4">
          <svg className="w-5 h-5 mr-1 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M6 2a1 1 0 000 2h1v1a1 1 0 102 0V4h2v1a1 1 0 102 0V4h1a1 1 0 100-2H6zM4 6h12v11a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm4 4a1 1 0 112 0v2a1 1 0 11-2 0v-2z" />
          </svg>
          3 days
        </span>
        <span className="flex items-center">
          <svg className="w-5 h-5 mr-1 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-14a6 6 0 100 12 6 6 0 000-12zm0 1.75a4.25 4.25 0 110 8.5 4.25 4.25 0 010-8.5zM10 6a1 1 0 100 2 1 1 0 000-2zM10 8.25a1.75 1.75 0 100 3.5 1.75 1.75 0 000-3.5z" clipRule="evenodd" />
          </svg>
          London
        </span>
      </div>
    </div>
    <div className="ml-auto">
      <button className="text-gray-400 hover:text-gray-600">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M6 10a1 1 0 112-0 1 1 0 00-2 0zm4 0a1 1 0 112-0 1 1 0 00-2 0zm4 0a1 1 0 112-0 1 1 0 00-2 0z" />
        </svg>
      </button>
    </div>
  </div>
</div>

    </>
  )
}

export default TripList