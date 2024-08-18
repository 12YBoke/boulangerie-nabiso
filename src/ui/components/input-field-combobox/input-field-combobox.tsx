"use client"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/shadcnui/components/ui/command"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shadcnui/components/ui/form"
import clsx from "clsx"
import { Check, ChevronsUpDown } from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shadcnui/components/ui/popover"
import { Typography } from "../typography/typography"
import { Container } from "../container/container"
import { Button as ShadBtn } from "@/shadcnui/components/ui/button"

interface Props {
  control: any,
  name: string,
  label?: string | React.ReactNode,
  description? : string | React.ReactNode,
  items?: {
    label: string
    value: string
  }[]
  children? : React.ReactNode
  required? : boolean
  placeholder? : string
}


export const InputFieldCombobox = ({
  control,
  name,
  label,
  description,
  items,
  children,
  required = true,
  placeholder,
}: Props) => {

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {
            label ?
              required ?
              <FormLabel>
                <Typography variant="title-sm" className="">
                  {label}{' '}<span className="text-red-500">*</span>
                </Typography>
              </FormLabel>
              :
              <FormLabel>
                <Typography variant="title-sm" className="">
                  {label}
                </Typography>
              </FormLabel>
            :
            null
          }
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <ShadBtn
                  variant="outline"
                  role="combobox"
                  className={clsx(
                    "w-full relative justify-between hover:bg-none bg-white",
                    !field.value && "text-muted-foreground",
                  )}
                >
                  <span
                    className={clsx(
                      children && "pl-8",
                    )}
                  >
                    {
                      field.value
                      ? items!.find(
                          (item) => item.value === field.value
                        )?.label
                      : placeholder ? placeholder : ""
                    }
                  </span>
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  {
                    children?
                      children
                    :
                    null
                  }
                </ShadBtn>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">    
              <Command>
                <CommandInput placeholder={placeholder} />
                <CommandList>
                  <CommandEmpty>Aucune données trouvées</CommandEmpty>
                  <CommandGroup>
                    {items!.map((item) => (
                      <CommandItem
                        value={item.label}
                        key={item.value}
                        onSelect={() => {
                          field.onChange(item.value);
                        }}
                      >
                        <Check
                          className={clsx(
                            "mr-2 h-4 w-4",
                            item.value === field.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {item.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormDescription>
            {description}
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}