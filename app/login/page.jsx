"use server";

import GitHubLoginButton from "@/components/auth/GitHubLoginButton";
import GoogleLoginButton from "@/components/auth/GoogleLoginButton";

export default async function LoginPage() {

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <GitHubLoginButton />
        <GoogleLoginButton />
      </div>
    </div>
  );
}
