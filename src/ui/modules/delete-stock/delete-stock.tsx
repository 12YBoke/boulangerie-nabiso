/* eslint-disable react/no-unescaped-entities */
import UseLoading from "@/hooks/use-loading";
import { useToast } from "@/shadcnui/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Container } from "@/ui/components/container/container";
import { Button } from "@/ui/components/button/button";
import { Typography } from "@/ui/components/typography/typography";
import { Trash } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shadcnui/components/ui/dialog";
import { useEffect, useState } from "react";
interface Props {
  id: string;
}

export const DeleteStock = ({ id }: Props) => {
  const [isLoading, startLoading, stopLoading] = UseLoading();
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    startLoading();
    const delete_customer = await fetch(`/api/stock/${id}`, {
      method: "DELETE",
    });

    if (delete_customer.status === 200) {
      toast({
        title: "Supprimé",
        description: (
          <Typography variant="body-sm">
            Le rapport a été supprimé avec succès.
          </Typography>
        ),
      });
      stopLoading();
      setOpen(false); // Fermer la dialog après succès
      router.refresh();
    } else {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: (
          <Typography variant="body-sm">
            Une erreur est survenue durant le processus de suppression. Veuillez
            récommencer. stock
          </Typography>
        ),
      });
      stopLoading();
    }
    stopLoading();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        asChild
        className="cursor-pointer hover:bg-red-100 animate flex flex-row items-center text-red-500 rounded-full bg-red-50"
      >
        <span className="p-2">
          <Trash className="h-5 w-5" />
        </span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="flex flex-col gap-4">
          <DialogTitle>
            <Typography variant="title-lg">Suppression</Typography>
          </DialogTitle>
          <DialogDescription className="h-full w-full">
            Vous étes sur le point de supprimer les informations de ce rapport.
          </DialogDescription>
          <Container className="flex flex-col gap-4">
            <Typography>
              Êtes-vous sûr de vouloir supprimer ce rapport de la liste des
              rapports de stock ?
            </Typography>
            <Container>
              <Button
                isLoading={isLoading}
                Icon={Trash}
                buttonType="action"
                action={handleDelete}
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                Supprimer
              </Button>
            </Container>
          </Container>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
