import { MdErrorOutline } from "react-icons/md";

interface NotFoundPageProps {
  error: Error;
}

export default function NotFoundPage({
  error,
}: NotFoundPageProps): React.ReactNode {
  return (
    <div className="mx-auto max-w-sm bg-white rounded-lg shadow-lg px-2 py-4 flex flex-col gap-2 items-center">
      <div className="text-3xl flex gap-3 items-center font-extrabold">
        <h1 className="text-gray-800">Page Not Found!</h1>
        <MdErrorOutline className="text-red-600" />
      </div>
      <div className="text-gray-700">
        The page you're looking for does not exist
      </div>
      <div className="text-gray-600 text-sm">Error Code: 404</div>
    </div>
  );
}
