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
import { Link, useNavigate } from "react-router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useLoginMutation } from "@/redux/features/auth.api";
import config from "@/config";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  useLazyGetUserWishlistQuery,
  useMergeWishlistMutation,
} from "@/features/wishlist/api/wishlist.api";
import { useAuth } from "@/hooks/useAuth";
import {
  useLazyMyCartQuery,
  useMergeCartMutation,
} from "@/features/cart/api/cart.api";
import { clearCart, setCart } from "@/features/cart/slices/cartSlice";
import {
  clearWishlist,
  setWishlist,
} from "@/features/wishlist/slices/wishlistSlice";
const loginSchema = z.object({
  email: z.string(),
  password: z.string().min(8, { error: "Min 8 characters required" }),
});
export const Login = () => {
  const { login: setAuthUser } = useAuth();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const wishlist = useAppSelector((state) => state.wishlist.items);
  const cart = useAppSelector((state) => state.cart.items);

  const [myCart] = useLazyMyCartQuery();
  const [myWishlist] = useLazyGetUserWishlistQuery();
  const [login, { isLoading }] = useLoginMutation();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const autoFill = (user: string) => {
    form.setValue("email", config[`${user}_email`]);
    form.setValue("password", config[`${user}_password`]);
    form.handleSubmit(onSubmit)();
  };
  const [mergeWishlist, { isLoading: mergingLoading }] =
    useMergeWishlistMutation();
  const [mergeCart, { isLoading: mergingCartLoading }] = useMergeCartMutation();
  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    try {
      const res = await login(data).unwrap();

      if (res.success) {
        setAuthUser(res?.data?.user);
        const { data: mergeWishlistResponse } = await mergeWishlist(wishlist);
        const { data: mergeCartResponse } = await mergeCart(cart);

        if (mergeCartResponse.success && mergeWishlistResponse.success) {
          dispatch(clearWishlist());
          dispatch(clearCart());
          const cart = await myCart(undefined);

          if (cart.isSuccess) {
            const cartItem = cart.data.data.map((item: any) => ({
              plantId: item.plantId,
              quantity: item.quantity,
              sku: item.sku,
            }));
            dispatch(setCart(cartItem));
          }

          const wishlist = await myWishlist(undefined);

          if (wishlist.isSuccess) {
            const wishlistItem = wishlist.data.data.map((item: any) => ({
              plantId: item.plantId,
            }));
            dispatch(setWishlist(wishlistItem));
          }
        }
        if (!mergingLoading && !mergingCartLoading) {
          navigate("/");
          toast.success("Logged in successfully!");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-screen items-center">
      <div className="mx-auto px-4 sm:max-w-lg lg:max-w-lg lg:basis-1/2 lg:space-y-6">
        <div className="flex flex-col gap-4 text-center">
          <Link to="/" className="font-metal text-4xl sm:text-3xl">
            PlantLife
          </Link>
          <p className="font-metal text-3xl text-gray-600">
            Connect with nature, Connect with your roots
          </p>
        </div>
        <div className="space-x-4">
          <Button disabled={isLoading} onClick={() => autoFill("super_admin")}>
            Admin Login
          </Button>
          <Button disabled={isLoading} onClick={() => autoFill("user")}>
            User Login
          </Button>
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
            <Button disabled={isLoading}>Login</Button>
          </form>
        </Form>

        <div className="justify-cener flex items-center gap-4">
          <span className="h-[1px] w-full bg-gray-300"></span>
          <p className="text-gray-400">Or</p>
          <span className="h-[1px] w-full bg-gray-300"></span>
        </div>
        {/* <GoogleLogin /> */}
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
        <p>
          Already have an account? <Link to="/register">Register</Link>
        </p>
      </div>
      <div className="hidden basis-1/2 lg:block">
        <img className="max-h-screen w-full" src={loginImg} />
      </div>
    </div>
  );
};
