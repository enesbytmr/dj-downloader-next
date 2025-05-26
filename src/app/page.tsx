"use client";

import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setIsLoading(true);
    setDownloadUrl(null);

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("https://djcontroller-742077104492.europe-west1.run.app", {
      method: "POST",
      body: formData,
    });

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    setDownloadUrl(url);
    setIsLoading(false);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4">
      <h1 className="text-3xl font-bold mb-6">🎧 DJ ZIP Downloader</h1>

      <form
        onSubmit={handleUpload}
        className="bg-zinc-900 p-6 rounded-xl shadow-md w-full max-w-md"
      >
        <input
          type="file"
          accept=".csv"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="w-full mb-4 p-2 bg-zinc-800 text-sm border border-zinc-700 rounded"
        />
        <button
          type="submit"
          disabled={!file || isLoading}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 transition rounded font-semibold"
        >
          {isLoading ? "⏳ Processing..." : "📥 Upload & Get ZIP"}
        </button>
      </form>

      {downloadUrl && (
        <a
          href={downloadUrl}
          download="downloaded_tracks.zip"
          className="mt-6 text-blue-400 underline"
        >
          🎉 Download ZIP
        </a>
      )}
    </main>
  );
}