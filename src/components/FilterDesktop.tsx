"use client";

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

const formSchema = z.object({
  categories: z.array(z.string()).optional(),
});

const FilterDesktop = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { categories: [] },
  });

  const categories = useWatch({
    control: form.control,
    name: "categories",
  });
  useEffect(() => {}, [categories]);
  return (
    <Form {...form}>
      <form className="space-y-4">
        <div className="space-y-2">
          {Object.entries(plantCategories).map(([label, value]) => (
            <FormField
              key={value}
              control={form.control}
              name="categories"
              render={({ field }) => {
                return (
                  <FormItem
                    key={value}
                    className="flex flex-row items-center space-x-2"
                  >
                    <FormControl>
                      <Checkbox
                        checked={field.value?.includes(value)}
                        onCheckedChange={(checked) => {
                          return checked
                            ? field.onChange([...field.value, value])
                            : field.onChange(
                                field.value?.filter((v: string) => v !== value),
                              );
                        }}
                      />
                    </FormControl>
                    <FormLabel className="font-normal">{label}</FormLabel>
                  </FormItem>
                );
              }}
            />
          ))}
        </div>
      </form>
    </Form>
  );
};
export default FilterDesktop;
