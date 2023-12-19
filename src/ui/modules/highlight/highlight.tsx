import { Container } from "@/ui/components/container/container"
import { Typography } from "@/ui/components/typography/typography"
import clsx from "clsx"

export const Highlight = () => {
  return(
    <Container 
      className={clsx(
        "flex flex-row gap-4 w-full",
        "[&>*]:p-4 [&>*]:rounded [&>*]:h-40"
      )}
    >
      <Container className="bg-primary-400 text-white basis-1/4">
        <Typography variant="title-sm" component="h4">Recettes brutes</Typography>
      </Container>
      <Container className="bg-red-400 text-white basis-1/4">
        <Typography variant="title-sm" component="h4">Recettes nettes</Typography>
      </Container>
      <Container className="bg-secondary-400 text-white basis-2/4">
        <Typography variant="title-sm" component="h4">Trésorerie disponible</Typography>
      </Container>
    </Container>
  )
}