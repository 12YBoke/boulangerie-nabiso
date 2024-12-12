"use client";
import { Button as ButtonShadcn } from "@/shadcnui/components/ui/button";
import clsx from "clsx";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import { Typography } from "@/ui/components/typography/typography";

interface Props {
  action?: () => Promise<void>;
  target?: "_blank" | "_self";
  baseUrl?: string;
  variant?: "primary" | "secondary" | "accent" | "ghost";
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  isLoading?: boolean;
  buttonType?: "link" | "anchor" | "action" | undefined;
  outline?: "outline" | "default";
  width?: "default";
  Icon?: React.ElementType;
  CustomIcon?: StaticImageData;
  type?: "submit" | "reset" | "button";
}

export const Button = ({
  target = "_self",
  action = async () => {},
  baseUrl,
  buttonType = undefined,
  children,
  className,
  disabled = false,
  isLoading = false,
  Icon,
  CustomIcon,
  outline = "default",
  variant = "primary",
  width = "default",
  type = "button",
}: Props) => {
  let colorStyles: string = "";
  let txt_colorStyles: string = "";

  switch (variant) {
    case "accent":
      colorStyles = "bg-accent hover:bg-accent";
      txt_colorStyles = "text-white";
      break;
    case "ghost":
      colorStyles = "bg-white hover:bg-white";
      txt_colorStyles = "text-primary-500 hover:text-primary-600";
  }

  if (outline === "default") {
    switch (variant) {
      case "primary": //Default
        colorStyles = "bg-primary-100 hover:bg-primary-200";
        txt_colorStyles = "text-primary-800";
        break;
    }
  } else {
    switch (variant) {
      case "primary":
        colorStyles =
          "bg-white hover:text-primary-500 hover:bg-white border-white hover:border-primary-500 border-2";
        txt_colorStyles = "text-primary-500";
        break;
    }
  }

  const handleClick = async () => {
    if (action) {
      await action();
    }
  };

  const buttonLink = (
    <>
      <ButtonShadcn
        variant={outline}
        className={clsx(
          "animate",
          children ? "rounded-md" : "rounded-full",
          colorStyles,
          txt_colorStyles,
          className
        )}
        size={children ? width : "icon"}
        disabled={isLoading ? isLoading : disabled}
        asChild
        type={type}
      >
        <Link href={baseUrl!} target={target}>
          {isLoading ? (
            <Loader2
              className={
                children ? "mr-2 h-6 w-6 animate-spin" : "h-6 w-6 animate-spin"
              }
            />
          ) : Icon ? (
            <Icon className={children ? "mr-2 h-6 w-6" : "h-6 w-6"} />
          ) : CustomIcon ? (
            <Image
              src={CustomIcon}
              alt={CustomIcon + " icon"}
              className={children ? "mr-2 h-6 w-6" : "h-6 w-6"}
            />
          ) : null}
          <Typography className="text-current">{children}</Typography>
        </Link>
      </ButtonShadcn>
    </>
  );

  const buttonAction = (
    <>
      <ButtonShadcn
        variant={outline}
        className={clsx(
          "animate",
          children ? "rounded-md" : "rounded-full",
          txt_colorStyles,
          colorStyles,
          className
        )}
        size={children ? width : "icon"}
        disabled={isLoading ? isLoading : disabled}
        onClick={handleClick}
        type={type}
      >
        {isLoading ? (
          <Loader2
            className={
              children ? "mr-2 h-6 w-6 animate-spin" : "h-6 w-6 animate-spin"
            }
          />
        ) : Icon ? (
          <Icon className={children ? "mr-2 h-6 w-6" : "h-6 w-6"} />
        ) : CustomIcon ? (
          <Image
            src={CustomIcon}
            alt={CustomIcon + " icon"}
            className={clsx(children ? "mr-2 h-6 w-6" : "h-6 w-6")}
          />
        ) : null}
        <Typography className="text-current">{children}</Typography>
      </ButtonShadcn>
    </>
  );

  const buttonDefault = (
    <>
      <ButtonShadcn
        variant={outline}
        className={clsx(
          "animate",
          children ? "rounded-md" : "rounded-full",
          txt_colorStyles,
          colorStyles,
          className
        )}
        size={children ? width : "icon"}
        disabled={isLoading ? isLoading : disabled}
        type={type}
      >
        {isLoading ? (
          <Loader2
            className={
              children ? "mr-2 h-6 w-6 animate-spin" : "h-6 w-6 animate-spin"
            }
          />
        ) : Icon ? (
          <Icon className={children ? "mr-2 h-6 w-6" : "h-6 w-6"} />
        ) : CustomIcon ? (
          <Image
            src={CustomIcon}
            alt={CustomIcon + " icon"}
            className={clsx(children ? "mr-2 h-6 w-6" : "h-6 w-6")}
          />
        ) : null}
        <Typography className="text-current">{children}</Typography>
      </ButtonShadcn>
    </>
  );

  const buttonElement = (
    <>
      {buttonType === "link"
        ? buttonLink
        : buttonType === "action"
        ? buttonAction
        : buttonDefault}
    </>
  );

  return <>{buttonElement}</>;
};
