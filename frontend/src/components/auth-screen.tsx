import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";
import { SubmitButton } from "@/components/ui/submit-button";

export function AuthScreen() {
  const [name, setName] = useState("");
  const { register } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register.mutate(name);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Welcome to Mini Feed App
          </h2>
          <p className="text-gray-600 mt-2">Enter your name to get started</p>
        </div>

        {register.error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-700 text-sm">{register.error.message}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Your Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your name"
              required
              disabled={register.isPending}
            />
          </div>

          <SubmitButton
            isLoading={register.isPending}
            disabled={register.isPending}
            className="mx-auto"
          >
            Continue
          </SubmitButton>
        </form>
      </div>
    </div>
  );
}
