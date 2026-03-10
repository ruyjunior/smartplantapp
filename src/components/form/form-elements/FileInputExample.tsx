"use client";
import React, { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import FileInput from "../input/FileInput";
import Label from "../Label";
import { upload } from '@vercel/blob/client';
import Image from "next/image";


export default function FileInputExample() {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("Selected file:", file.name);
    }
  };


  async function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const newBlob = await upload(file.name, file, {
        access: 'public',
        handleUploadUrl: '/api/upload',
      });
      setAvatarUrl(newBlob.url);
    } finally {
      setUploading(false);
    }
  }


  return (
    <ComponentCard title="File Input">
      <div>
        <Label>Upload file</Label>
        <FileInput onChange={handleAvatarChange} className="custom-class" />
        <div>
          {uploading && <p className="text-xs text-blue-600 mt-1">Enviando avatar...</p>}
          {avatarUrl && (
            <div className="mt-2">
              <Image src={avatarUrl} alt="Preview" className="h-20 rounded-md" />
              <input type="hidden" name="avatarurl" value={avatarUrl} />
            </div>
          )}
        </div>
      </div>
    </ComponentCard>
  );
}
