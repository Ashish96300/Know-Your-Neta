"use client";

import CloudinaryUpload from "@/app/components/common/CloudinaryUpload";

export default function CloudinaryTest() {
    return (
        <div className="p-10">
            <CloudinaryUpload
                folder="test"
                onUpload={(publicId) => {
                    console.log("Uploaded:", publicId);
                }}
            />
        </div>
    );
}