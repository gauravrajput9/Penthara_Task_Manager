const Loading = ({ message = "Loading...", compact = false }) => {
  if (compact) {
    return (
      <div className="flex items-center gap-2 py-1">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-blue-500" />
        <span className="text-sm text-muted-foreground">{message}</span>
      </div>
    );
  }

  return (
    <div className="flex h-[60vh] flex-col items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-500" />
      <p className="mt-3 text-sm text-gray-600">{message}</p>
    </div>
  );
};

export default Loading;
