import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Welcome to the Opinion Trading App</h1>
      <div className="space-x-4">
        <button
          onClick={() => router.push("/login")}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Login
        </button>
        <button
          onClick={() => router.push("/dashboard")}
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Dashboard
        </button>
      </div>
    </div>
  );
}
 