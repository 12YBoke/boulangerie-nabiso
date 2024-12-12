import UseLoading from "@/hooks/use-loading";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/shadcnui/components/ui/dialog";
import { useToast } from "@/shadcnui/components/ui/use-toast";
import { Button } from "@/ui/components/button/button";
import { Container } from "@/ui/components/container/container";
import { Typography } from "@/ui/components/typography/typography";
import clsx from "clsx";
import { useRouter } from "next/navigation";

interface Props {
  id: string;
  cardNumber: number;
  disabled: boolean;
  customerid: string;
  extensionid: string;
}

export const ValidatePayment = ({
  id,
  cardNumber,
  disabled,
  customerid,
  extensionid,
}: Props) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, startLoading, stopLoading] = UseLoading();

  async function validatePayment() {
    startLoading();
    const validatePayment = await fetch(`/api/card/${id}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        updateType: "Payment",
      }),
    });

    if (validatePayment.status === 200) {
      toast({
        title: "Paiement validé",
        description: (
          <Typography variant="body-sm">
            Paiement validé avec succès.
          </Typography>
        ),
      });
      router.refresh();
      stopLoading();
    } else {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: (
          <Typography variant="body-sm">
            Une erreur est survenue durant le processus de cloture. Veuillez
            récommencer.
          </Typography>
        ),
      });
      router.refresh();
      stopLoading();
    }
    stopLoading();
  }

  return (
    <Dialog>
      <DialogTrigger
        disabled={disabled}
        className={clsx(
          "text-body-base p-2 cursor-pointer animate flex flex-row items-center rounded-lg animate",
          disabled
            ? "bg-gray-300 cursor-not-allowed text-white"
            : "bg-primary-100 hover:bg-primary-200 text-primary-800"
        )}
      >
        Valider le paiement
      </DialogTrigger>
      <DialogContent>
        {disabled ? (
          <DialogHeader className="flex flex-col gap-4">
            <DialogTitle>
              <Typography variant="title-lg">
                Validation du paiement Carte {cardNumber}
              </Typography>
            </DialogTitle>
            <DialogDescription className="h-full w-full gap-4 flex flex-row">
              <Container>
                <Typography variant="title-lg">
                  Le paiement de la Carte {cardNumber} à été validé avec succès
                </Typography>
              </Container>
            </DialogDescription>
          </DialogHeader>
        ) : (
          <DialogHeader className="flex flex-col gap-4">
            <DialogTitle>
              <Typography variant="title-lg">
                Validation du paiement Carte {cardNumber}
              </Typography>
            </DialogTitle>
            <DialogDescription className="h-full w-full gap-4 flex flex-row">
              <Container>
                <Typography variant="title-sm">
                  Voulez-vous vraiment valider le paiement cette carte ?
                </Typography>
              </Container>
              <Container>
                <Button
                  buttonType="action"
                  disabled={disabled}
                  isLoading={isLoading}
                  action={validatePayment}
                >
                  Valider le paiement
                </Button>
              </Container>
            </DialogDescription>
          </DialogHeader>
        )}
      </DialogContent>
    </Dialog>
  );
};
