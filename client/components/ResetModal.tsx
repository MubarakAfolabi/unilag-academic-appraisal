"user client";
import { RotateCcw } from "lucide-react";

type ResetModalProps = {
  onClose: () => void;
  onConfirm: () => void;
};

export default function ResetModal({ onClose, onConfirm }: ResetModalProps) {
  return (
    <div
      className="fixed top-0 left-0 right-0 bottom-0 bg-[hsla(0,0%,85%,0.7)] z-1 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="p-6 bg-[hsla(0,0%,100%,1)] flex flex-col gap-4 rounded-lg max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[hsla(210,79%,46%,0.2)] p-4 rounded-full self-center">
          <RotateCcw />
        </div>
        <div className="flex flex-col text-center gap-1">
          <p className="text-lg font-bold">Are you sure you want to reset?</p>
          <p className="text-sm text-[hsla(0,2%,42%,1)]">
            All option chosen and documents uploaded would be reset and you
            would have to refill and upload again.
          </p>
        </div>
        <div className="flex gap-6">
          <button
            className="flex-1 p-3 border-solid border border-black rounded-lg cursor-pointer"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="flex-1 p-2 bg-[hsla(194,30%,14%,1)] text-white border-solid border border-black rounded-lg cursor-pointer"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            Yes, Reset
          </button>
        </div>
      </div>
    </div>
  );
}
