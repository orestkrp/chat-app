import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FC } from "react";
import { AuthData, AuthType } from "../../types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "react-query";
import { guestAxios } from "@/axios";
import { useStore } from "@/store";

interface AuthFormProps {
  type: AuthType;
}

const FormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

type FormData = z.infer<typeof FormSchema>;

export const AuthForm: FC<AuthFormProps> = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "unterdog28@gmail.com",
      password: "abiabi",
    },
  });

  const { setAuth } = useStore((state) => ({
    setAuth: state.setAuth,
  }));

  const { mutate: logIn } = useMutation(
    async (data: FormData) => {
      const response = await guestAxios.post<AuthData>("auth/login", data);

      return response.data;
    },
    {
      onSuccess: (data) => {
        setAuth(data.tokens.accessToken, data.tokens.refreshToken, data.userId);
      },
      onError(error) {
        console.log(error);
      },
    }
  );

  const onSubmit = async (data: FormData) => {
    logIn(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 flex flex-col items-center"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter email" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Enter password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" size="lg">
          Log in
        </Button>
      </form>
    </Form>
  );
};
