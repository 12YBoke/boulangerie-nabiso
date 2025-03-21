"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shadcnui/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/shadcnui/components/ui/select";
import { Options } from "@/types/options";
import { Container } from "../container/container";
import clsx from "clsx";
import { useState } from "react";

interface Props {
  control: any;
  name: string;
  label?: string;
  placeholder: string;
  description?: string;
  options: Options[];
  children?: React.ReactNode;
  disabled?: boolean;
}

export const InputFieldSelect = ({
  control,
  name,
  label,
  placeholder,
  description,
  options,
  children,
  disabled,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label ? <FormLabel>{label}</FormLabel> : null}
          <Select
            onValueChange={(value) => {
              field.onChange(value);
              setIsOpen(false); // Ferme le menu après sélection
            }}
            defaultValue={field.value}
            name={name}
            open={isOpen} // Contrôle l'état ouvert/fermé
            onOpenChange={(open) => setIsOpen(open)} // Met à jour l'état
          >
            <FormControl>
              <SelectTrigger
                className={clsx("rounded-lg focus:ring-primary-500")}
                disabled={disabled}
              >
                <Container className="w-full relative flex items-center">
                  {children ? children : null}
                  <Container className={clsx(children ? "pl-8 pr-4" : "")}>
                    <SelectValue placeholder={placeholder} />
                  </Container>
                </Container>
              </SelectTrigger>
            </FormControl>
            <SelectContent className="max-h-[40vh] overflow-auto rounded-lg bg-white">
              {options.map(({ value, label }) => (
                <SelectItem
                  key={value}
                  value={value!}
                  className="focus:bg-primary-50"
                >
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
