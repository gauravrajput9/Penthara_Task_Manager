const Error = ({ message = "Something went wrong!", onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center">
      <div className="text-red-500 text-5xl">⚠️</div>

      <h2 className="mt-3 text-lg font-semibold text-gray-800">
        {message}
      </h2>

      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Retry
        </button>
      )}
    </div>
  );
};

export default Error;