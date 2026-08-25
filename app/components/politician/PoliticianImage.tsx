"use client";

import { CldImage } from "next-cloudinary";

interface Props {
    publicId?: string;
    name: string;
}

export default function PoliticianImage({
    publicId,
    name,
}: Props) {
    if (!publicId) {
        return (
            <div className="flex h-48 w-full items-center justify-center bg-muted text-2xl font-semibold">
                {name
                    .split(" ")
                    .map((word) => word[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
            </div>
        );
    }

    return (
        <CldImage
            src={publicId}
            alt={name}
            width={400}
            height={250}
            className="h-48 w-full object-cover"
        />
    );
}