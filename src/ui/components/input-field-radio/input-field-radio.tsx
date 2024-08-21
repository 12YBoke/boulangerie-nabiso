import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shadcnui/components/ui/form"
import { Container } from "../container/container"
import clsx from "clsx"
import { Typography } from "../typography/typography"
import { RadioGroup, RadioGroupItem } from "@/shadcnui/components/ui/radio-group"

interface Props {
  control: any
  name: string
  label?: string | React.ReactNode
  description? : string | React.ReactNode
  required? : boolean
  items: {
    label: string
    value: string
  }[]
}

export const InputFieldRadio = ({
  control,
  name,
  label,
  description,
  required = false,
  items,
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
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex flex-col space-y-1"
            >
              {items.map(({value, label}, index) => (
                <FormItem key={index} className="flex items-center space-x-3 space-y-0">
                 <FormControl>
                    <RadioGroupItem
                      value={value}
                    />
                  </FormControl>
                  <FormLabel>
                    {label}
                  </FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormDescription>
            {description}
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}