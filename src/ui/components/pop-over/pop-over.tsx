'use client'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shadcnui/ui/popover"
import { clsx } from "clsx"

interface Props {
  TriggerIcon?: React.ElementType
  children?: React.ReactNode
  variant?: 
    'primary'                  |
    'secondary'                |
    'accent'                   |
    'ghost'
  className?: string
  classNameItems?: string
  outline?: 'outline' | 'default'
  items?: {id: string, ItemIcon?: React.ElementType, content: string}[]
}

export const PopOver = ({
  TriggerIcon,
  children,
  variant = 'primary',
  className,
  classNameItems,
  outline = 'default',
  items
}: Props, ) => {

  let colorStyles: string = ''
  let txt_colorStyles: string = ''

  switch (variant) {
    case 'accent':
      colorStyles = 'bg-accent hover:bg-accent'
      txt_colorStyles = 'text-white'
      break;  
    case 'ghost':
      colorStyles = 'bg-gray-100 hover:bg-gray-50'
      txt_colorStyles = 'text-primary-Default'
  }

  if (outline === 'default') {
    switch (variant) {
      case "primary": //Default
        colorStyles = 'bg-primary-Default hover:bg-primary-600'
        txt_colorStyles = 'text-white'
        break;
      case "secondary":
        colorStyles = 'bg-secondary-Default hover:bg-secondary-600'
        txt_colorStyles = 'text-white'
        break;
    }
  } else {
    switch (variant) {
      case "primary":
        colorStyles = 'bg-white hover:text-primary-Default hover:bg-primary-50 border-primary-Default'
        txt_colorStyles = 'text-primary-Default'
        break;
      case "secondary":
        colorStyles = 'bg-white hover:text-secondary-Default hover:bg-secondary-50 border-secondary-Default'
        txt_colorStyles = 'text-secondary-Default'
        break;
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild
        className={
          clsx(
            "p-2 cursor-pointer",
            children? "rounded" : "rounded-full",
            colorStyles,
            txt_colorStyles,
            className
          )
        }
      >
        <span className="flex flex-row justify-center items-center">
          {
            TriggerIcon ?
              <TriggerIcon className={children ? "mr-2 h-5 w-5" :"h-5 w-5"}/>
            :
              null
          }
          {
            children ?
              children
            :
              null
          }
        </span>
      </PopoverTrigger>
      <PopoverContent
        className={
          clsx(
            "cursor-pointer rounded",
            classNameItems
          )
        }
      >
        {
          items?.map(item =>
            <span key={item.id} className="rounded p-2 hover:bg-gray-50 flex flex-row items-center">
              {
                item.ItemIcon ?
                  <item.ItemIcon className="mr-4 h-4 w-4"/>
                :
                  null
              }
              {item.content}
            </span>
          )
        }
      </PopoverContent>
    </Popover>
  )
}