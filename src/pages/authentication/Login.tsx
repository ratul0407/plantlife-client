// import { Link, useNavigate } from "react-router";
import loginImg from "../../assets/static/login-page-img.jpg";
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
import { Link } from "react-router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useLoginMutation } from "@/redux/features/auth.api";
const loginSchema = z.object({
  email: z.string(),
  password: z.string().min(8, { error: "Min 8 characters required" }),
});
export const Login = () => {
  const [login, { isLoading }] = useLoginMutation();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    console.log(data);
    try {
      const res = await login(data).unwrap();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex min-h-screen items-center">
      <div className="mx-auto basis-1/2 lg:max-w-lg lg:space-y-12">
        <div className="flex flex-col gap-4 text-center">
          <Link to="/" className="font-metal text-4xl sm:text-3xl">
            PlantLife
          </Link>
          <p className="font-metal text-3xl text-gray-600">
            Connect with nature, Connect with your roots
          </p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid space-y-6"
          >
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
            <Button>Login</Button>
          </form>
        </Form>
        {/* <div className="space-y-8">
          <div className="flex flex-col gap-4 text-center">
            <Link to="/" className="font-metal text-4xl sm:text-3xl">
              PlantLife
            </Link>
            <p className="font-metal text-3xl text-gray-600">
              Connect with nature, Connect with your roots
            </p>
          </div>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="input-container">
            <label htmlFor="email" className="w-20 font-semibold text-gray-600">
              Email:{" "}
            </label>
            <input
              type="email"
              name="email"
              placeholder="example@gmail.com"
              className="input"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.email && touched.email ? (
              <div className="error-msg">{errors.email}</div>
            ) : null}
          </div>
          <div className="input-container">
            <label htmlFor="email" className="w-20 font-semibold text-gray-600">
              Password:
            </label>
            <input
              placeholder="type your password"
              type={showPass ? "text" : "password"}
              name="password"
              className="input"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <button
              onClick={() => setShowPass(!showPass)}
              type="button"
              className="absolute top-10 right-10 cursor-pointer text-gray-600"
            >
              {showPass ? <FiEyeOff /> : <FiEye />}
            </button>
            {errors.password && touched.password ? (
              <div className="error-msg">{errors.password}</div>
            ) : null}
          </div>
          {/* <FormButton isSubmitting={isSubmitting} text={"Login"} /> */}
        {/* </form>
        <div>
          <p className="space-x-2">
            <span>New to PlantLife?</span>
            <Link to="/signup" className="font-bold text-green-700 underline">
              Create an account
            </Link>
          </p>
        </div> */}{" "}
        {/* <div className="justify-cener flex items-center gap-4">
          <span className="h-[1px] w-full bg-gray-300"></span>
          <p className="text-gray-400">Or</p>
          <span className="h-[1px] w-full bg-gray-300"></span>
        </div> */}
        {/* <GoogleLogin /> */}
      </div>
      <div className="hidden basis-1/2 lg:block">
        <img className="max-h-screen w-full" src={loginImg} />
      </div>
    </div>
  );
};
