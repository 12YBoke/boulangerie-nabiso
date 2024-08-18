'use client'
import { Button } from "@/ui/components/button/button"
import { MoveLeft } from "lucide-react"

interface Props {
  backTo : string,
}

export const BackButton = ({backTo} : Props) => {
  return(
    <>
      <Button Icon={MoveLeft} variant="secondary" buttonType="link" baseUrl={backTo} className=""/>
    </>
  )
}