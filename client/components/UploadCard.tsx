import Image from "next/image";

export default function UploadCard() {
  return (
    <div className="border border-solid border-[hsla(0,0%,85%,1)] px-2 py-4 lg:px-4 lg:py-6 rounded-xl flex flex-col gap-4">
      <div className="flex flex-col items-center justify-center text-center group cursor-pointer">
        <Image
          src="/cloud-upload.svg"
          alt="Cloud Upload"
          width={120}
          height={120}
          className="mb-2"
        />
        <span className="text-xs uppercase tracking-wider text-gray-400 italic font-medium mb-4">
          CLICK TO UPLOAD ARTICLE
        </span>
        <button className="bg-[hsla(194,53%,67%,1)] hover:bg-[#8ec4d6] text-white font-semibold py-3 rounded-full text-lg transition-colors w-64 cursor-pointer">
          Upload
        </button>
      </div>
    </div>
  );
}
