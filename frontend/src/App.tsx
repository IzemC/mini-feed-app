import { AuthScreen } from "@/components/auth-screen";
import { CreatePost } from "@/components/create-post";
import { Feed } from "@/components/feed";
import { useAuthStore } from "@/store";
import { LogOut } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";

export function App() {
  const { isAuthenticated, user, logout } = useAuthStore();

  if (!isAuthenticated) {
    return <AuthScreen />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <header className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Avatar userId={user!.id} userName={user!.name} />
              <p className="font-medium text-gray-900">{user!.name}</p>
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 cursor-pointer"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>

          <div className="flex items-center justify-center gap-3 mb-4">
            <h1 className="text-3xl text-center font-bold text-gray-900">
              Mini Feed App
            </h1>
          </div>
          <div className="text-start flex flex-col mx-auto w-fit gap-2 ">
            <p className="text-gray-600">
              A simple feed application where users can:
            </p>
            <ul className="mx-auto list-disc text-gray-600 ms-6">
              <li>View a list of post (just text)</li>
              <li>Create a new post (just text)</li>
              <li>Like/Dislike posts (by default nothing is selected)</li>
              <li>Comment on posts</li>
            </ul>
          </div>
        </header>

        <main>
          <CreatePost />
          <Feed />
        </main>
      </div>
    </div>
  );
}
