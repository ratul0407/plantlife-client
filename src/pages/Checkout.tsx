import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Spinner } from "@/components/ui/spinner";
import {
  useDeleteCartMutation,
  useLazyMyCartQuery,
} from "@/features/cart/api/cart.api";
import { clearCart } from "@/features/cart/slices/cartSlice";
import { useAuth } from "@/hooks/useAuth";
import { usePlaceOrderMutation } from "@/redux/features/order.api";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { CreditCard, Truck } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { IoWarning } from "react-icons/io5";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const Checkout = () => {
  const navigate = useNavigate();
  const [placeOrder, { isLoading: orderPlacingLoading }] =
    usePlaceOrderMutation();
  const { user } = useAuth();
  const [getCart, { data: cartData, isLoading }] =
    useLazyMyCartQuery(undefined);
  const [deleteCart] = useDeleteCartMutation();
  const dispatch = useAppDispatch();
  const cartStore = useAppSelector((state) => state.cart.items);
  const form = useForm();
  const onSubmit = (data) => {};

  const cart = cartData?.data;
  useEffect(() => {
    if (cartStore) {
      getCart(cartStore);
    }
  }, [cartStore, getCart]);

  const handlePlaceOrder = async () => {
    if (!user) {
      return navigate("/login");
    }

    console.log(cart);
    const orderData = {
      items: cart.map((item) => ({
        plantId: item.plantId,
        quantity: item.quantity,
        sku: item.sku,
      })),
      totalPrice: cart
        .reduce((acc: number, item) => acc + item.price * item.quantity, 0)
        .toFixed(2),
    };
    try {
      const res = await placeOrder(orderData).unwrap();
      if (res.success) {
        toast.success("Order placed successfully");
        dispatch(clearCart());
        await deleteCart({});
        navigate("/orders");
      }
    } catch (error) {
      toast.error("Failed to place order");
    }
  };

  const total = cart
    ?.reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner className="size-8" />
      </div>
    );
  }
  return (
    <main className="relative space-y-24 px-24 py-20">
      <div>
        <h3 className="text-4xl font-bold">Checkout</h3>
      </div>
      <div className="flex items-start gap-10">
        {/* left side */}
        <div className="space-y-6 md:w-1/2">
          <div>
            <h3 className="text-3xl font-bold">Shipping Information</h3>
          </div>

          <RadioGroup defaultValue="option-one" className="flex items-center">
            <div className="flex items-center space-x-2 rounded-xl border border-gray-200 pl-4">
              <RadioGroupItem value="option-one" id="option-one" />
              <Label htmlFor="option-one">
                <div className="flex items-center justify-center gap-4 p-4">
                  <Truck />
                  <p>Cash on Delivery</p>
                </div>
              </Label>
            </div>
            {/* <div className="flex items-center space-x-2 rounded-xl border border-gray-200 pl-4">
              <RadioGroupItem value="option-two" id="option-two" />
              <Label htmlFor="option-two">
                <div className="flex items-center justify-center gap-4 p-4">
                  <CreditCard />
                  <p>Pay Via Card</p>
                </div>
              </Label>      
            </div> */}
          </RadioGroup>
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-6"
              >
                <FormField
                  control={form.control}
                  name="fullname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter full name" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                {/* email address */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter email address" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                {/* phone number */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter phone number" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="flex items-center gap-4">
                  <FormField
                    control={form.control}
                    name="division"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Division</FormLabel>
                        <FormControl>
                          <Input placeholder="Select division" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="district"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>District</FormLabel>
                        <FormControl>
                          <Input placeholder="Select District" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="zip"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Zip</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter ZIP code" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter full address" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="flex items-center gap-3">
                  <Checkbox id="terms" />
                  <Label htmlFor="terms">
                    I have read and agree to the{" "}
                    <span className="text-blue-500 underline">
                      Terms and Conditions
                    </span>
                  </Label>
                </div>
              </form>
            </Form>
          </div>
        </div>
        {/* right side */}
        <div className="flex flex-col items-stretch justify-between gap-6 md:w-1/2">
          <p className="flex items-center justify-between text-xl font-bold">
            Review Your Cart{" "}
            <span className="text-lg">
              Total <span className="text-green-600"> ${total}</span>
            </span>
          </p>
          <div className="space-y-4">
            {cart?.map((item: any, index: string) => (
              <div
                key={index}
                className="flex gap-4 rounded-sm border border-gray-200 p-4 shadow-sm"
              >
                <div>
                  <img
                    className="size-32 rounded-md object-cover"
                    src={item?.image}
                    alt={item?.name}
                  />
                </div>
                <div className="flex flex-col justify-between">
                  <div>
                    <p className="font-metal text-2xl text-green-900">
                      {item?.name}
                    </p>
                    <p className="text-gray-700">{item?.quantity}x</p>
                  </div>
                  <p className="text-xl font-bold">${item?.price}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="grid gap-4">
            <p className="flex items-center gap-2 text-gray-600">
              <IoWarning /> Delivery Generally takes 7-8 Days
            </p>
            <Button onClick={handlePlaceOrder}>Place order</Button>
          </div>
        </div>
      </div>
      <div
        className={`${orderPlacingLoading ? "min-h-grid absolute inset-0 flex items-center justify-center bg-black/50" : "hidden"}`}
      >
        <Spinner className="size-10" />
      </div>
    </main>
  );
};

export default Checkout;
