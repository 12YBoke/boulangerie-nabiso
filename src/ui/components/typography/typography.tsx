import { clsx } from "clsx"

interface Props {
  children: React.ReactNode
  className?: string
  ref?: any
  variant?: 
    'display'     |
    'title-lg'    | 
    'title-base'  | 
    'title-sm'    | 
    'title-xs'    | 
    'body-lg'     | 
    'body-base'   | 
    'body-sm'     
}


export const Typography = ({
  variant = 'body-base',
  children, 
  className,
  ref
}: Props) => {
  
  let variantStyles: string = ''
  
  switch (variant) {
    case "display":
      variantStyles = 'text-title-lg lg:text-display'
      break;
    case "title-lg":
      variantStyles = 'text-title-lg'
      break;
    case "title-base":
      variantStyles = 'text-title-base'
      break;
    case "title-sm":
      variantStyles = 'text-title-sm'
      break;
    case "title-xs":
      variantStyles = 'text-title-xs'
      break;
    case "body-lg":
      variantStyles = 'text-body-base lg:text-body-lg'
      break;
    case "body-base": // Default
      variantStyles = 'text-body-base'
      break;
    case "body-sm":
      variantStyles = 'text-body-sm'
      break;
  }

  return (
    <>
      {
        variant === 'display' ? <h1 ref={ref} className={clsx(variantStyles, className)}>{children}</h1>
        : variant === 'title-lg' ? <h2 ref={ref} className={clsx(variantStyles, className)}>{children}</h2>
        : variant === 'title-base' ? <h3 ref={ref} className={clsx(variantStyles, className)}>{children}</h3>
        : variant === 'title-sm' ? <h4 ref={ref} className={clsx(variantStyles, className)}>{children}</h4>
        : variant === 'title-xs' ? <h5 ref={ref} className={clsx(variantStyles, className)}>{children}</h5>
        : <p ref={ref} className={clsx(variantStyles, className)}>{children}</p>
      }
    </>
  )
}