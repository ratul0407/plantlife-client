import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";

import { Checkbox } from "./ui/checkbox";
import { plantCategories } from "@/constants/plantCategories";

const FilterDesktop = () => {
  const form = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-2">
            {Object.entries(plantCategories).map(([key, value]) => (
              <FormField
                key={key}
                control={form.control}
                name="items"
                render={({ field }) => {
                  return (
                    <FormItem
                      key={key}
                      className="flex flex-row items-center gap-2"
                    >
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(key)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...field.value, key])
                              : field.onChange(
                                  field.value?.filter((value) => value !== key),
                                );
                          }}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">
                        {key}
                      </FormLabel>
                    </FormItem>
                  );
                }}
              />
            ))}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default FilterDesktop;
