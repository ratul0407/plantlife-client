import MultipleImgUploader from "@/components/MultipleImgUploader";
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
import { plantCategories } from "@/constants/plantCategories";

import { FileMetadata } from "@/hooks/use-file-upload";
import { useAddPlantsMutation } from "@/redux/features/plant.api";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const variantSchema = z.object({
  variantName: z.string(),
  price: z.coerce.number(),
  stock: z.coerce.number(),
  image: z.file(),
});
const plantSchema = z.object({
  name: z.string(),
  description: z.string(),
  category: z.enum(plantCategories),
  variants: z.array(variantSchema),
});
const AddPlants = () => {
  const [images, setImages] = useState<(File | FileMetadata)[]>([]);
  const [addPlant, { isLoading }] = useAddPlantsMutation();
  const form = useForm<z.infer<typeof plantSchema>>({
    defaultValues: {
      name: "",
      description: "",
      category: "",
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
    const formData = new FormData();

    // Basic fields
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("category", data.category);

    // Add variants (without the File objects)
    const variantsWithoutFiles = data.variants.map((v) => ({
      variantName: v.variantName,
      price: v.price,
      stock: v.stock,
    }));
    formData.append("variants", JSON.stringify(variantsWithoutFiles));

    // Attach variant images
    data.variants.forEach((variant) => {
      if (variant.image) {
        formData.append("variantImages", variant.image);
        // order matches variantsWithoutFiles[index]
      }
    });

    // Attach extra images
    images.forEach((img) => {
      formData.append("images", img);
    });

    // Send request
    try {
      const res = await addPlant(formData).unwrap();
      console.log(res);
      if (res.success) {
        toast.success("Plant created successfully!");
      }
    } catch (error) {
      console.log(error);
    }
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
                    variantName: "",
                    price: 0,
                    stock: 0,
                    image: "",
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
                    name={`variants.${index}.variantName`}
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
          <div>
            <h3>Add additional images</h3>
            <MultipleImgUploader onChange={setImages} />
          </div>
          <Button disabled={isLoading}>Add Plant</Button>
        </form>
      </Form>
    </div>
  );
};

export default AddPlants;
