import { Container } from "@/ui/components/container/container"
import { CashIn } from "../cash-in/cash-in"
import { Disburse } from "../disburse/disburse"
import { Highlight } from "../highlight/highlight"

export const CashFlow = () => {
  return(
    <Container className="flex flex-col gap-4">
      <Container>
        <Highlight/>
      </Container>
      <Container className="flex flex-row gap-4 [&>*]:basis-1/2 h-[90vh] rounded">
        <CashIn/>
        <Disburse/>
      </Container>
    </Container>
  )
}