import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shadcnui/components/ui/form";
import { Textarea } from "@/shadcnui/components/ui/textarea";
import { Input } from "@/shadcnui/components/ui/input";
import { Container } from "../container/container";
import clsx from "clsx";
import { Typography } from "../typography/typography";

interface Props {
  control: any;
  name: string;
  label?: string | React.ReactNode;
  placeholder?: string;
  description?: string | React.ReactNode;
  type?: "text" | "email" | "file" | "password" | "textarea" | "number";
  autocompletion?: boolean;
  children?: React.ReactNode;
  required?: boolean;
  disabled?: boolean;
}

export const InputField = ({
  control,
  name,
  label,
  placeholder,
  description,
  type = "text",
  autocompletion = true,
  children,
  required = false,
  disabled = false,
}: Props) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label ? (
            required ? (
              <FormLabel>
                <Typography variant="title-sm" className="">
                  {label} <span className="text-red-500">*</span>
                </Typography>
              </FormLabel>
            ) : (
              <FormLabel>
                <Typography variant="title-sm" className="">
                  {label}
                </Typography>
              </FormLabel>
            )
          ) : null}
          <FormControl>
            <Container className="relative flex justify-center items-center">
              {type === "textarea" ? (
                <Textarea
                  disabled={disabled}
                  placeholder={placeholder}
                  className={clsx(
                    "resize-none rounded-lg h-48 focus:ring-primary-500 w-full",
                    children ? "px-12" : ""
                  )}
                  {...field}
                />
              ) : (
                <Input
                  disabled={disabled}
                  className={clsx(
                    "rounded-lg focus:ring-primary-500 w-full",
                    children ? "px-12" : ""
                  )}
                  placeholder={placeholder}
                  {...field}
                  type={type}
                  name={name}
                  id={name}
                  onChange={(e) => {
                    const value = e.target.value;
                    field.onChange(type === "number" ? parseInt(value) : value);
                  }}
                />
              )}
              {children ? children : null}
            </Container>
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
