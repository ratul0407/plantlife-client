import SingleImgUploader from "@/components/SingleImgUploader";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { plantCategories } from "@/constants/role";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import z from "zod";

const variantSchema = z.object({
  name: z.string(),
  price: z.string(),
  stock: z.string(),
  image: z.file(),
});
const plantSchema = z.object({
  name: z.string(),
  description: z.string(),
  category: z.enum(plantCategories),
  inStock: z.boolean(),
  variants: z.array(variantSchema),
});
const AddPlants = () => {
  const form = useForm<z.infer<typeof plantSchema>>({
    resolver: zodResolver(plantSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      inStock: true,
      variants: [],
    },
  });
  const {
    fields: variantFields,
    append: addVariant,
    // remove: removeVariant,
  } = useFieldArray({
    control: form.control,
    name: "variants",
  });
  const onSubmit = async (data: z.infer<typeof plantSchema>) => {
    console.log(data);
  };
  return (
    <div>
      <h1 className="mb-12 text-4xl font-bold">Add Plants</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="plant name" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified email to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.entries(plantCategories)?.map(([key, value]) => (
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
          </div>

          <div className="col-span-2">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Variants</h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  addVariant({
                    name: "",
                    price: 0,
                    stock: 0,
                    image: null,
                  })
                }
              >
                <PlusCircle className="mr-2 h-4 w-4" /> Add Variant
              </Button>
            </div>
          </div>

          {variantFields.map((item, index) => (
            <div key={item.id}>
              <p className="py-3 text-xl font-bold">Variant {index + 1}</p>
              <div className="grid min-w-full grid-cols-2 items-center justify-center gap-3">
                <div className="flex h-full flex-col justify-between">
                  <FormField
                    control={form.control}
                    name={`variants.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Variant Name</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Add variant name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`variants.${index}.price`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Variant Price</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Add variant name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`variants.${index}.stock`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Variant Stock</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Add variant name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name={`variants.${index}.image`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image</FormLabel>
                      <FormControl>
                        <SingleImgUploader
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          ))}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Add a plant description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button>Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default AddPlants;
