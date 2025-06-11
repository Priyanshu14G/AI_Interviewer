import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="p-6 rounded-lg shadow-lg bg-gray-800">
        <SignIn />
      </div>
    </div>
  );
}
