interface ToastProps {
  message: string;
  visible: boolean;
}

export function Toast({ message, visible }: ToastProps) {
  if (!visible) return null;

  return (
    <div className="pointer-events-none fixed right-4 top-20 z-50 rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800 shadow-lg">
      {message}
    </div>
  );
}
