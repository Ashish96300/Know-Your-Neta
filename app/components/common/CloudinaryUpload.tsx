"use client";

import { CldUploadWidget } from "next-cloudinary";

interface CloudinaryUploadProps {
    folder: string;
    onUpload: (publicId: string) => void;
}

export default function CloudinaryUpload({
    folder,
    onUpload,
}: CloudinaryUploadProps) {
    return (
        <CldUploadWidget
            uploadPreset="know_ur_neta"
            signatureEndpoint="/api/cloudinary/sign"
            options={{
                folder,
            }}
            onSuccess={(result) => {
                const info = result.info;

                if (
                    typeof info === "object" &&
                    info !== null &&
                    "public_id" in info
                ) {
                    onUpload(info.public_id as string);
                }
            }}
        >
            {({ open }) => (
                <button
                    type="button"
                    onClick={() => open()}
                    className="rounded-md bg-primary px-4 py-2 text-primary-foreground"
                >
                    Upload Image
                </button>
            )}
        </CldUploadWidget>
    );
}