/* eslint-disable react/no-unescaped-entities */
import UseLoading from "@/hooks/use-loading";
import { useToast } from "@/shadcnui/components/ui/use-toast";
import { useRouter } from "next/navigation"
import { Container } from "@/ui/components/container/container"
import { Button } from "@/ui/components/button/button";
import { Typography } from "@/ui/components/typography/typography";
import { Trash } from "lucide-react";

interface Props {
  id: string
  name: string
}

export const DeleteCustomerForm = ({ id, name } : Props) => {
  const [isLoading, startLoading, stopLoading] = UseLoading();
  const router = useRouter();
  const { toast } = useToast();
  
  const handleDelete = async () => {
    startLoading();
    const delete_customer = await fetch(`/api/customer/${id}`, {
      method: "DELETE"
    })

    if (delete_customer.status === 200) {
      toast({
        title: "Supprimé",
        description: <Typography variant="body-sm">L'employé a été supprimé avec succès</Typography>,
      })
      stopLoading()
      router.refresh()
    } else {
      toast({
        title: "Erreur",
        description: <Typography variant="body-sm">Une erreur est survenue durant le processus de suppression. Veuillez récommencer.</Typography>,
      })
      stopLoading()
    }
    stopLoading()
  }

  return (
    <Container className="flex flex-col gap-4">
      <Typography>Êtes-vous sûr de vouloir supprimer "<span className="text-title-sm text-black">{name}</span>" de la liste de clients ?</Typography>
      <Container>
        <Button 
          isLoading={isLoading} 
          Icon={Trash} 
          buttonType="action" 
          action={handleDelete} 
          className="bg-red-500 hover:bg-red-600"
        >
          Supprimer
        </Button>
      </Container>
    </Container>
  )
}