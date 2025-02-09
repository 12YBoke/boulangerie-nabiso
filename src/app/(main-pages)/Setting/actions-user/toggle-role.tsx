"use client";

/* eslint-disable react/no-unescaped-entities */
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shadcnui/components/ui/dialog";
import { Button } from "@/ui/components/button/button";
import { Container } from "@/ui/components/container/container";
import { Typography } from "@/ui/components/typography/typography";
import { MoveDown, MoveUp } from "lucide-react";
import UseLoading from "@/hooks/use-loading";
import { useToast } from "@/shadcnui/components/ui/use-toast";
import { useRouter } from "next/navigation";

interface Props {
  user: {
    id: string;
    name: string;
    role: "USER" | "ADMIN";
    createdAt: Date;
  };
}

export const ToggleRole = ({ user }: Props) => {
  const [isLoading, startLoading, stopLoading] = UseLoading();
  const { toast } = useToast();
  const router = useRouter();

  const toggleUserRole = async () => {
    startLoading();
    const newRole = user.role === "USER" ? "ADMIN" : "USER";
    const response = await fetch(`/api/user/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ role: newRole }),
    });

    if (response.status === 200) {
      toast({
        title: "Succès",
        description: (
          <Typography variant="body-sm">
            Les informations de l'administrateur ont été modifiées avec succès.
          </Typography>
        ),
      });

      stopLoading();
      router.refresh();
    } else {
      toast({
        variant: "destructive",
        title: "Erreur !",
        description: (
          <Typography variant="body-sm">
            Une erreur est survenue durant la modification des informations de
            l'administrateur. Veuillez recommencer l'opération.
          </Typography>
        ),
      });
      router.refresh();
      stopLoading();
    }
    stopLoading();
  };

  return (
    <Dialog>
      <DialogTrigger
        asChild
        className="cursor-pointer hover:bg-red-100 animate flex flex-row items-center text-red-500 rounded-full bg-red-50"
      >
        <span className="p-2">
          {user.role === "USER" ? (
            <MoveUp className="h-5 w-5" />
          ) : (
            <MoveDown className="h-5 w-5" />
          )}
        </span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="flex flex-col gap-4">
          <DialogTitle>
            <Typography variant="title-lg">Mofidication du rôle</Typography>
          </DialogTitle>
          <DialogDescription className="h-full w-full">
            Vous étes sur le point de modifier le rôle de cet administrateur{" "}
            {user.name}. cet administrateur est actuellement{" "}
            {user.role === "USER" ? "Admin" : "Super admin"} et vous êtes sur le
            point de le passer à{" "}
            {user.role === "USER" ? "Super admin" : "Admin"}.
          </DialogDescription>
          <Container>
            <Button
              isLoading={isLoading}
              buttonType="action"
              action={() => toggleUserRole()}
            >
              Modifier
            </Button>
          </Container>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
