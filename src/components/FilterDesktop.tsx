import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { plantCategories } from "@/constants/plantCategories";
import { useEffect } from "react";
import { SetURLSearchParams } from "react-router-dom"; // Note the change here

const formSchema = z.object({
  categories: z.array(z.string()).optional(),
});

const FilterDesktop = ({
  searchParams,
  setSearchParams,
}: {
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categories: searchParams.getAll("category") || [], // Initialize with existing categories from URL
    },
  });

  const categories = useWatch({
    control: form.control,
    name: "categories",
  });

  // Sync URL with selected categories
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.delete("category"); // Clear existing category params
    categories.forEach((category) => {
      params.append("category", category); // Append each selected category
    });
    setSearchParams(params, { replace: true }); // Update URL without page reload
  }, [categories, setSearchParams, searchParams]);

  return (
    <Form {...form}>
      <form className="space-y-4">
        <div className="space-y-2">
          {Object.entries(plantCategories).map(([label, value]) => (
            <FormField
              key={value}
              control={form.control}
              name="categories"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value?.includes(value)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          // Add category to the form state
                          field.onChange([...(field.value || []), value]);
                        } else {
                          // Remove category from the form state
                          field.onChange(
                            field.value?.filter((v: string) => v !== value),
                          );
                        }
                      }}
                    />
                  </FormControl>
                  <FormLabel className="font-normal">{label}</FormLabel>
                </FormItem>
              )}
            />
          ))}
        </div>
      </form>
    </Form>
  );
};

export default FilterDesktop;
