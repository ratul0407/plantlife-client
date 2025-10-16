import { Link, useNavigate } from "react-router";
import signUpImg from "../../assets/static/sign-up-page-img.jpg";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import Password from "@/components/Password";
import { Button } from "@/components/ui/button";

import z from "zod";
import config from "@/config";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegisterMutation } from "@/redux/features/auth.api";
import { toast } from "sonner";

const registerSchema = z
  .object({
    name: z
      .string()
      .min(3, { error: "Min 3 characters" })
      .max(50, { error: "Name is too big!" }),

    email: z.email({ error: "Invalid email" }),
    password: z
      .string()
      .min(8, { error: "password must be 8 characters long" }),
    confirmPassword: z
      .string()
      .min(8, { error: "confirm password did not match" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  });
export const Register = () => {
  const [register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    try {
      const res = await register(data).unwrap();
      if (res.success) {
        navigate("/");
        toast.success("Account created successfully!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="px-4 lg:flex lg:min-h-screen lg:items-center lg:gap-12 lg:p-0">
      <div className="hidden min-h-screen basis-1/2 lg:block">
        <img
          src={signUpImg}
          className="max-h-svh min-h-full min-w-full object-cover"
        />
      </div>
      <div className="pt-10 sm:mx-auto sm:max-w-lg lg:flex lg:h-full lg:basis-1/2 lg:items-center lg:justify-center lg:pt-0">
        <div className="space-y-8">
          <div className="flex flex-col gap-4 text-center">
            <Link to="/" className="font-metal text-4xl sm:text-3xl">
              PlantLife
            </Link>
            <p className="font-metal text-3xl text-gray-600">
              One step closer to bringing nature home
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      {/* Your form field */}
                      <Input placeholder="enter your email" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      {/* Your form field */}
                      <Input placeholder="enter your email" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      {/* <Input placeholder="******* " type="password" {...field} /> */}
                      <Password {...field} />
                    </FormControl>
                    <FormDescription className="sr-only">
                      This is a field for the password input
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      {/* <Input placeholder="******* " type="password" {...field} /> */}
                      <Password {...field} />
                    </FormControl>
                    <FormDescription className="sr-only">
                      This is a field for the password input
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={isLoading}>Create Account</Button>
            </form>
          </Form>

          <div className="justify-cener flex items-center gap-4">
            <span className="h-[1px] w-full bg-gray-300"></span>
            <p className="text-gray-400">Or</p>
            <span className="h-[1px] w-full bg-gray-300"></span>
          </div>
          {/* <GoogleLogin isSubmitting={isSubmitting} /> */}
          <Button
            onClick={() => window.open(`${config.baseUrl}/auth/google`)}
            variant="outline"
            className="w-full"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                fill="currentColor"
              />
            </svg>
            Login with Google
          </Button>
        </div>
      </div>
    </div>
  );
};
