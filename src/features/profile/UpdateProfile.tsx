import { Pen } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FieldValues, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const divisions = {
  Dhaka: "DHAKA",
  Chittagong: "CHITTAGONG",
  Khulna: "KHULNA",
  Rajshahi: "RAJSHAHI",
  Barisal: "BARISAL",
  Sylhet: "SYLHET",
  Rangpur: "RANGPUR",
  Mymensingh: "MYMENSINGH",
};
const UpdateProfile = () => {
  Object.entries(divisions).map(([key, value]) => console.log(key, value));
  const { user } = useAuth();
  const form = useForm();
  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="cursor-pointer bg-green-700 hover:bg-green-600">
          <Pen />
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Name"
                      defaultValue={user?.name}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex items-center gap-3 *:basis-1/2">
              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Division</FormLabel>
                    <Select
                      defaultValue={user?.address?.division}
                      onValueChange={field.onChange}
                    >
                      <FormControl className="w-[80%]">
                        <SelectTrigger>
                          <SelectValue placeholder="Select a verified email to display" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.entries(divisions).map(([key, value]) => (
                          <SelectItem key={key} value={value}>
                            {key}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
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
                      <Input
                        placeholder="district"
                        defaultValue={user?.address?.district}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex items-center gap-3 *:basis-1/2">
              <FormField
                control={form.control}
                name="subDistrict"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sub District</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Sub District"
                        defaultValue={user?.address?.subDistrict}
                        {...field}
                      />
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
                      <Input
                        type="number"
                        placeholder="Name"
                        defaultValue={user?.address?.zip}
                        {...field}
                      />
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
                    <Input
                      placeholder="streetAddress"
                      defaultValue={user?.address?.streetAddress}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
export default UpdateProfile;
