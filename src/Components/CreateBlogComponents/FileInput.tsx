import Image from 'next/image';
import { useRef, useState } from 'react';

const FileInput = () => {
  const [showName, setShowName] = useState<File | null>(null);
  const [showImagePreview, setShowImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClearFile = () => {
    setShowName(null);
    setShowImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="">
      {showName ? (
        <div className="mx-auto flex max-w-[600px] items-center gap-x-6 rounded-lg border-2 border-dashed border-gray-400 p-5 bg-white">
          <Image
            className="w-full max-w-[150px] rounded-lg object-cover"
            width={150}
            height={150}
            src={showImagePreview as string}
            alt={showName.name}
          />
          <div className="flex-1 space-y-1.5 overflow-hidden">
            <h5 className="text-xl font-medium tracking-tight truncate">
              {showName.name}
            </h5>
            <p className="text-gray-500">
              {(showName.size / 1024).toFixed(1)} KB
            </p>
          </div>
          <div onClick={handleClearFile}>
            <svg
              width={30}
              viewBox="0 -0.5 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.96967 16.4697C6.67678 16.7626 6.67678 17.2374 6.96967 17.5303C7.26256 17.8232 7.73744 17.8232 8.03033 17.5303L6.96967 16.4697ZM13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697L13.0303 12.5303ZM11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303L11.9697 11.4697ZM18.0303 7.53033C18.3232 7.23744 18.3232 6.76256 18.0303 6.46967C17.7374 6.17678 17.2626 6.17678 16.9697 6.46967L18.0303 7.53033ZM13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303L13.0303 11.4697ZM16.9697 17.5303C17.2626 17.8232 17.73744 17.8232 18.0303 17.5303C18.3232 17.2374 18.3232 16.7626 18.0303 16.4697L16.9697 17.5303ZM11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697L11.9697 12.5303ZM8.03033 6.46967C7.73744 6.17678 7.26256 6.17678 6.96967 6.46967C6.67678 6.76256 6.67678 7.23744 6.96967 7.53033L8.03033 6.46967ZM8.03033 17.5303L13.0303 12.5303L11.9697 11.4697L6.96967 16.4697L8.03033 17.5303ZM13.0303 12.5303L18.0303 7.53033L16.9697 6.46967L11.9697 11.4697L13.0303 12.5303ZM11.9697 12.5303L16.9697 17.5303L18.0303 16.4697L13.0303 11.4697L11.9697 12.5303ZM13.0303 11.4697L8.03033 6.46967L6.96967 7.53033L11.9697 12.5303L13.0303 11.4697Z"
                fill="#000000"
              ></path>
            </svg>
          </div>
        </div>
      ) : (
        <label
          className="mx-auto flex max-w-[600px] flex-col items-center justify-center space-y-3 rounded-lg border-2 border-dashed border-gray-400 p-6 bg-white"
          htmlFor="file5"
        >
          <svg
            width={50}
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 42 32"
            enableBackground="new 0 0 42 32"
            xmlSpace="preserve"
            fill="#000000"
          >
            {/* Your SVG Content */}
          </svg>
          <div className="space-y-1.5 text-center">
            <h5 className="whitespace-nowrap text-lg font-medium tracking-tight">
              Upload your file
            </h5>
            <p className="text-sm text-gray-500">
              File should be in PNG, JPEG or JPG format
            </p>
          </div>
        </label>
      )}

      <input
        ref={fileInputRef}
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            const imageFile = e.target.files[0];
            setShowName(imageFile);
            setShowImagePreview(URL.createObjectURL(imageFile));
          }
        }}
        className="hidden"
        id="file5"
        type="file"
      />
    </div>
  );
};

export default FileInput;
