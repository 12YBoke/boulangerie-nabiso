'use client'

import { Container } from "@/ui/components/container/container"
import { AsideActiveLink } from "./aside-active-link"
import { AsideRoutes } from "@/lib/page-routes/page-routes"
import { Typography } from "@/ui/components/typography/typography"
import { Button } from "@/ui/components/buttons/button"
import { LocateFixed, LogOut, MapPin, UserCircle } from "lucide-react"

export const AsideNav = () => {
  return (
    <Container className="h-full w-full flex flex-col justify-between">
      <Container className="w-full px-6 py-4">
        <Typography component="h4" variant="title-base" className="text-primary-Default">
          BOULANGERIE
        </Typography>
        <Typography component="h4" variant="title-base" className="text-primary-Default">
          NA BISO
        </Typography>
      </Container>
      <Container className="px-4">
        {
          AsideRoutes.map(({children}) => (
            children!.map(({title, baseUrl, Icon}) => (
              <Container key={title}>
              <Typography variant="body-base" component="p" className="w-full text-black/60">
                <AsideActiveLink href={baseUrl!}>
                  {
                    Icon ?
                    <span className="flex flex-row items-center">
                      <Icon  className="mr-4 h-5 w-5"/>{title}
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
      <Container className="p-4 flex flex-col items-center gap-2">
        <Container className="bg-primary-Default w-full p-4 text-white rounded flex flex-col gap-2">
            <Typography component="p" variant="body-sm">YVES BOKE NGOY</Typography>
            <Typography component="p" variant="body-sm">Impok</Typography>
        </Container>
        <Button outline="outline" Icon={LogOut} className="w-full">Déconnexion</Button>
      </Container>
    </Container>
  )
}