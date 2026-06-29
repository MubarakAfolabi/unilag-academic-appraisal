import { Check, CircleAlert, X } from "lucide-react";

type AlertProps = {
  type: "success" | "error";
  message: string;
  onClose: () => void;
};

export default function AlertPopup({ type, message, onClose }: AlertProps) {
  const isSuccess = type === "success";

  return (
    <div
      className={`fixed top-5 left-1/2 -translate-x-1/2 flex justify-between gap-10 rounded-md p-2 shadow-[0_0_10px_rgba(0,0,0,0.15)] ${
        isSuccess
          ? "bg-green-50 border border-green-200"
          : "bg-red-50 border border-red-200"
      }`}
    >
      <div className="flex items-center gap-2">
        <div className={isSuccess ? "text-green-600" : "text-red-600"}>
          {isSuccess ? <Check size={20} /> : <CircleAlert size={20} />}
        </div>

        <p className={isSuccess ? "text-green-700" : "text-red-700"}>
          {message}
        </p>
      </div>

      <button
        onClick={onClose}
        className="cursor-pointer text-gray-500 hover:text-gray-700"
      >
        <X size={20} />
      </button>
    </div>
  );
}
