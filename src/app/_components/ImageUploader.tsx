"use client";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import { useState } from "react";

export function ImageUploader({ onUpload }: any) {
  const [previewUrl, setPreviewUrl] = useState("");
  return (
    <div>
      <CldUploadButton
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
        signatureEndpoint="/api/sign-cloudinary-params"
        onUpload={(error, result) => {
          if (result?.info?.secure_url) {
            setPreviewUrl(result.info.secure_url);
            onUpload(result.info.secure_url);
          }
        }}
        options={{ singleUploadAutoClose: true }}
      >
        Upload da imagem
      </CldUploadButton>
      {previewUrl && (
        <Image
          src={previewUrl}
          alt="Preview"
          width={40}
          height={40}
          className="mt-2 rounded-md"
        />
      )}
    </div>
  );
}

/* {({ open }) => {
        <Button
          type="button"
          onClick={() => open()}
          className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 "
        >
          Upload imagem
        </Button>;
      }} */
