import { FC } from "react";
import { AuthForm } from "../forms/auth-form";
import { AuthType } from "../../types";

interface AuthPageProps {
  type: AuthType;
}

export const AuthPage: FC<AuthPageProps> = ({ type }) => {
  return (
    <div className="px-8 h-screen flex flex-col items-center justify-center">
      <header className="text-center mb-10">
        <h1 className="text-2xl">Welcome to Messenger</h1>
      </header>

      <main className="w-full max-w-lg mx-auto">
        <AuthForm type={type} />
      </main>
    </div>
  );
};
