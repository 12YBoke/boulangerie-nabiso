'use client'
import { Button as ButtonShadcn } from "@/shadcnui/components/ui/button"
import clsx from "clsx"
import Link from "next/link"
import { Loader2 } from "lucide-react"
import Image, { StaticImageData } from "next/image"
import { Typography } from "@/ui/components/typography/typography"

interface Props {
  action?: Function
  baseUrl?: string
  variant?: 
    'primary'                  |
    'secondary'                |
    'accent'                   |
    'ghost'
  className?: string
  children?: React.ReactNode
  disabled?: boolean
  isLoading?: boolean
  buttonType?: 'link' | 'anchor' | 'action' | undefined
  outline?: 'outline' | 'default'
  width?: 'lg' | 'default' | 'sm'
  Icon?: React.ElementType 
  CustomIcon?: StaticImageData
  type?: 'submit' | 'reset' | 'button'
}

export const Button = ({
  action = () => {},
  baseUrl,
  buttonType = undefined,
  children,
  className,
  disabled = false,
  isLoading = false,
  Icon,
  CustomIcon,
  outline = 'default',
  variant = 'primary',
  width = 'default',
  type = 'button'
}: Props) => {
  let colorStyles: string = ''
  let txt_colorStyles: string = ''

  switch (variant) {
    case 'accent':
      colorStyles = 'bg-accent hover:bg-accent'
      txt_colorStyles = 'text-white'
      break;  
    case 'ghost':
      colorStyles = 'bg-white hover:bg-white'
      txt_colorStyles = 'text-primary-Default hover:text-primary-600'
  }

  if (!disabled) {
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
          colorStyles = 'bg-gray-50 hover:text-primary-Default hover:bg-primary-50 border-primary-Default'
          txt_colorStyles = 'text-primary-Default'
          break;
        case "secondary":
          colorStyles = 'bg-gray-50 hover:text-secondary-Default hover:bg-secondary-50 border-secondary-Default'
          txt_colorStyles = 'text-secondary-Default'
          break;
      }
    }
  } else {
    if (outline === 'default') {
      switch (variant) {
        case "primary": //Default
          colorStyles = 'bg-primary-200'
          txt_colorStyles = 'text-primary-Default'
          break;
        case "secondary":
          colorStyles = 'bg-secondary-200'
          txt_colorStyles = 'text-secondary-Default'
          break;
      }
    } else {
      switch (variant) {
        case "primary":
          colorStyles = 'bg-gray-50 border-primary-300'
          txt_colorStyles = 'text-primary-300'
          break;
        case "secondary":
          colorStyles = 'bg-gray-50 border-secondary-300'
          txt_colorStyles = 'text-secondary-300'
          break;
      }
    }
  }

  const handleClick = async () => {
    if(action) {
      await action()
    }
  }
  
  const buttonLink = (
    <>
      <ButtonShadcn
        variant={outline}
        className={
          clsx(
            children? "rounded-lg" : "rounded-full",
            colorStyles,
            txt_colorStyles,
            className
          )
        }
        size={width}
        disabled = {isLoading ? isLoading : disabled}
        asChild
        type={type}
      >
        <Link href={baseUrl!}>
          {
            isLoading ? 
            <Loader2 className= {children? "mr-2 h-6 w-6 animate-spin":"h-6 w-6 animate-spin"}/>
            :
              Icon ?
              <Icon className= {children? "mr-2 h-6 w-6":"h-6 w-6"}/>
              :
              CustomIcon ?
              <Image src={CustomIcon} alt={CustomIcon + ' icon'} className= {children? "mr-2 h-6 w-6":"h-6 w-6"}/>
              :
            null
          }
          <Typography className="text-current">{children}</Typography>
        </Link>
      </ButtonShadcn>
    </>
  )

  const buttonAction = (
    <>
      <ButtonShadcn
        variant={outline}
        className={
          clsx(
            children? "rounded-lg" : "rounded-full",
            txt_colorStyles,
            colorStyles,
            className
          )
        }
        size={width}
        disabled = {isLoading ? isLoading : disabled}
        onClick={handleClick}
        type={type}
      >
        {
          isLoading ? 
          <Loader2 className= {children? "mr-2 h-6 w-6 animate-spin":"h-6 w-6 animate-spin"}/>
          :
            Icon ?
            <Icon className= {children? "mr-2 h-6 w-6":"h-6 w-6"}/>
            :
            CustomIcon ?
            <Image src={CustomIcon} alt={CustomIcon + ' icon'} className= {children? "mr-2 h-6 w-6":"h-6 w-6"}/>
            :
          null
        }
        <Typography className="text-current">{children}</Typography>
      </ButtonShadcn>
    </>
  )

  const buttonDefault = (
    <>
      <ButtonShadcn
        variant={outline}
        className={
          clsx(
            children? "rounded-lg" : "rounded-full",
            txt_colorStyles,
            colorStyles,
            className
          )
        }
        size={width}
        disabled = {isLoading ? isLoading : disabled}
        type={type}
      >
        {
          isLoading ? 
          <Loader2 className= {children? "mr-2 h-6 w-6 animate-spin":"h-6 w-6 animate-spin"}/>
          :
            Icon ?
            <Icon className= {children? "mr-2 h-6 w-6":"h-6 w-6"}/>
            :
            CustomIcon ?
            <Image src={CustomIcon} alt={CustomIcon + ' icon'} className= {children? "mr-2 h-6 w-6":"h-6 w-6"}/>
            :
          null
        }
        <Typography className="text-current">{children}</Typography>
      </ButtonShadcn>
    </>
  )

  const buttonElement = (
    <>
      {
        buttonType === 'link' ?
          buttonLink
          : buttonType === 'action' ?
            buttonAction
            : buttonDefault

      }
    </>
  )

  return (
    <>
      {buttonElement}
    </>
  )
}