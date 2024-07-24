import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800">
        <h1 className="text-4xl font-bold mb-8">Avatar App</h1>
        <div className="space-y-8">
          <div className="flex items-center space-x-4">
            <span className="text-xl font-semibold">
              Enter using Static Site Generation
            </span>
            <Link
              href="/ssg"
              className="px-4 py-2 bg-customGreen text-white rounded hover:bg-hoverGray"
            >
              SSG
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-xl font-semibold">
              Enter using Server Side Rendering
            </span>
            <Link
              href="/ssr"
              className="px-4 py-2 bg-customGreen text-white rounded hover:bg-hoverGray"
            >
              SSR
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
