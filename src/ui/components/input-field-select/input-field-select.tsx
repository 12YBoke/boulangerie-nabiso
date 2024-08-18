"use client"

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shadcnui/components/ui/form"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/shadcnui/components/ui/select"
import { Options } from "@/types/options"
import { Container } from "../container/container"
import clsx from "clsx"

interface Props {
  control: any,
  name: string,
  label?: string,
  placeholder: string,
  description?: string,
  options: Options[]
  children?: React.ReactNode
}

export const InputFieldSelect = ({
  control,
  name,
  label,
  placeholder,
  description,
  options,
  children
}: Props) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {
            label ?
            <FormLabel>{label}</FormLabel>
            :
            null
          }
          <Select onValueChange={field.onChange} defaultValue={field.value} name={name}>
            <FormControl>
              <SelectTrigger
                className={clsx(
                  "rounded-lg focus:ring-primary-Default",
                )}
              >
                <Container className="w-full relative flex  items-center">
                  {
                    children?
                      children
                    :
                    null
                  }
                  <Container
                    className={clsx(
                      children? "pl-8 pr-4" : "",
                    )}
                  >
                    <SelectValue 
                      placeholder={placeholder}
                    />
                  </Container>
                </Container>
              </SelectTrigger>
            </FormControl>
            <SelectContent className="max-h-[40vh] overflow-auto rounded-lg bg-white">
              {
                options.map(({id, courses, name, Icon}) => 
                  !courses ?
                    <SelectItem key={id} value={id!} className="focus:bg-primary-50">{name}</SelectItem>
                  :
                    <SelectGroup key={id}>
                      {
                        Icon ? <SelectLabel className="flex flex-row items-center"><Icon className='w-4 h-4 mr-2'/> {name}</SelectLabel> : <SelectLabel> {name}</SelectLabel>
                      }
                      {
                        courses?.map(({id, name}) =>
                          <SelectItem key={id} value={id!} className="focus:bg-primary-50">{name}</SelectItem>
                        )
                      }
                    </SelectGroup>
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
