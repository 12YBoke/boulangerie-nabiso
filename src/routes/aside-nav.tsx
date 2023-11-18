import { Container } from "@/ui/components/container/container"
import { AsideActiveLink } from "./aside-active-link"
import { AsideRoutes } from "@/lib/page-routes/page-routes"
import { Typography } from "@/ui/components/typography/typography"

export const AsideNav = () => {
  return (
    <Container className="h-full w-full ">
      <Container className="w-full text-center py-8">
        <Typography component="h4" variant="title-sm" className="text-primary-Default">
          BOULANGERIE NA BISO
        </Typography>
      </Container>
      <Container className="p-4">
        {
          AsideRoutes.map(({children}) => (
            children!.map(({title, baseUrl, Icon}) => (
              <Container key={title}>
              <Typography variant="body-base" component="p" className="w-full text-black/60">
                <AsideActiveLink href={baseUrl!}>
                  {
                    Icon ?
                    <span className="flex flex-row items-center">
                      <Icon  className="mr-4"/> {title}
                    </span>
                    :
                    <>
                      {title}
                    </>
                  }
                  
                </AsideActiveLink>
              </Typography>
              </Container>
            ))
          ))
        }
      </Container>
      <Container>

      </Container>
    </Container>
  )
}