"use client";
import { MdErrorOutline } from "react-icons/md";

interface ErrorPageProps {
  error: Error;
}

export default function Error({ error }: ErrorPageProps) {
  return (
    <div className="mx-auto max-w-sm bg-white rounded-lg shadow-lg px-2 py-4 flex flex-col gap-2 items-center">
      <div className="text-3xl flex gap-3 items-center font-extrabold">
        <h1 className="text-gray-800">Error</h1>
        <MdErrorOutline className="text-red-600" />
      </div>
      <div className="text-gray-700">{error.message}</div>
    </div>
  );
}
