/* eslint-disable react/no-unescaped-entities */
import { Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shadcnui/components/ui/dialog";
import { Typography } from "@/ui/components/typography/typography";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Container } from "@/ui/components/container/container";

interface Props {
  stock: {
    id: String;
    name: String;
    startingStock: String;
    endingStock: String;
    date: Date;
    dayProduction: String;
    agent: String;
  };
}

export const See = ({ stock }: Props) => {
  return (
    <Dialog>
      <DialogTrigger
        asChild
        className="p-2 flex flex-row items-center text-primary-500 cursor-pointer bg-primary-50 hover:bg-primary-100 rounded-full animate"
      >
        <span className="p-2">
          <Eye className="h-5 w-5" />
        </span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="flex flex-col gap-4">
          <DialogTitle>
            <Typography variant="title-lg">Rapport</Typography>
          </DialogTitle>
          <DialogDescription className="h-full w-full">
            Détails du rapport sélectionnée
          </DialogDescription>
          <Container className="flex flex-col gap-4">
            <Container className="flex flex-row gap-4 items-center">
              <Container className="flex flex-col gap-1">
                <Typography variant="body-sm" className="text-black/50">
                  Produit
                </Typography>
                <Typography variant="title-lg">{stock.name}</Typography>
              </Container>
            </Container>
            <Typography>
              {format(stock.date, "dd-MM-yyyy", { locale: fr })}
            </Typography>
            <Container className="flex flex-row gap-4">
              <Container className="flex flex-col gap-1">
                <Typography variant="body-sm" className="text-black/50">
                  Stock de depart
                </Typography>
                <Typography variant="title-base">
                  {stock.startingStock}
                </Typography>
              </Container>
              <Container className="flex flex-col gap-1">
                <Typography variant="body-sm" className="text-black/50">
                  Production du jour
                </Typography>
                <Typography variant="title-base">
                  {stock.dayProduction}
                </Typography>
              </Container>
              <Container className="flex flex-col gap-1">
                <Typography variant="body-sm" className="text-black/50">
                  Stock final
                </Typography>
                <Typography variant="title-base">
                  {stock.endingStock}
                </Typography>
              </Container>
            </Container>
            <Container className="flex flex-col gap-1">
              <Typography variant="body-sm" className="text-black/50">
                Agent
              </Typography>
              <Typography variant="title-base">{stock.agent}</Typography>
            </Container>
          </Container>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
