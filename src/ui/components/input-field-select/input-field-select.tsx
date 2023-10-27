"use client"

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shadcnui/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shadcnui/ui/select"

interface Props {
  control: any,
  name: string,
  label: string,
  placeholder: string,
  description?: string,
  options: { id: number, name: string }[]
}

export const InputFieldSelect = ({
  control,
  name,
  label,
  placeholder,
  description,
  options
}: Props) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="rounded" >
                <SelectValue placeholder={placeholder}/>
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {
                options.map(option => 
                  <SelectItem key={option.id} value={option.name}>{option.name}</SelectItem>
                )
              }
            </SelectContent>
          </Select>
          <FormDescription>
            {description}
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
