'use client'
import { Button } from "@/ui/components/button/button"
import { ArrowLeft, MoveLeft } from "lucide-react"

interface Props {
  backTo : string,
}

export const BackButton = ({backTo} : Props) => {
  return(
    <>
      <Button Icon={ArrowLeft} variant="primary" buttonType="link" baseUrl={backTo} className=""/>
    </>
  )
}