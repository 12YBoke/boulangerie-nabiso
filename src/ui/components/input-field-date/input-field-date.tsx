"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/shadcnui/components/ui/calendar";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shadcnui/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shadcnui/components/ui/popover";
import { Button } from "@/shadcnui/components/ui/button";

interface Props {
  control: any;
  name: string;
  label: string;
  description?: string;
  placeholder?: string;
}

export const InputFieldDate = ({
  control,
  name,
  label,
  description,
  placeholder = "Selectionnez une date",
}: Props) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false); // État pour contrôler l'ouverture du popover

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <br />
          <Popover
            open={isPopoverOpen}
            onOpenChange={setIsPopoverOpen} // Synchroniser l'état avec le popover
          >
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full pl-3 text-left font-normal rounded-lg focus:ring-primary-500",
                    !field.value && "text-muted-foreground"
                  )}
                  onClick={() => setIsPopoverOpen(!isPopoverOpen)} // Basculer l'état
                >
                  {field.value ? (
                    format(field.value, "dd MMMM yyyy", { locale: fr })
                  ) : (
                    <span>{placeholder}</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-white" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={(date) => {
                  field.onChange(date); // Met à jour la valeur sélectionnée
                  setIsPopoverOpen(false); // Ferme le popover après sélection
                }}
                disabled={(date: Date) => {
                  const today = new Date();
                  today.setHours(0, 0, 0, 0); // Normaliser la date courante

                  const tomorrow = new Date(today);
                  tomorrow.setDate(today.getDate() + 1); // Ajouter un jour à today

                  const minDate = new Date("2020-01-01");
                  minDate.setHours(0, 0, 0, 0); // Normaliser la date minimale

                  const currentDate = new Date(date);
                  currentDate.setHours(0, 0, 0, 0); // Normaliser la date sélectionnée

                  return currentDate > tomorrow || currentDate < minDate;
                }}
                initialFocus
                locale={fr}
              />
            </PopoverContent>
          </Popover>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
