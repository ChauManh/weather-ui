import { useLoading } from '../contexts/LoadingContext';
import { useAlert } from '../contexts/AlertContext';

export default function GlobalOverlay() {
  const { isLoading, loadingMessage } = useLoading();
  const { alert, clearAlert } = useAlert();

  if (!isLoading && !alert) return null;

  return (
    <>
      {/* Loading overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 flex flex-col items-center justify-center z-50 space-y-4">
          <div className="loader border-4 border-t-transparent border-white rounded-full w-12 h-12 animate-spin"></div>
          <p className="text-white text-sm font-medium">{loadingMessage}</p>
        </div>
      )}

      {/* Alert message */}
      {alert && (
        <div className="fixed bottom-4 right-4 z-50">
          <div className="max-w-xs bg-white bg-opacity-80 backdrop-blur-md rounded-xl shadow-lg p-4 flex items-start space-x-3 animate-slide-in">
            <div
              className={`flex-none w-3 h-3 mt-1 rounded-full ${
                alert.type === 'success'
                  ? 'bg-green-500'
                  : alert.type === 'error'
                    ? 'bg-red-500'
                    : 'bg-blue-500'
              }`}
            />
            <div className="flex-1 text-sm text-gray-800">{alert.message}</div>
            <button
              onClick={clearAlert}
              className="flex-none text-gray-500 hover:text-gray-700 ml-2"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}
