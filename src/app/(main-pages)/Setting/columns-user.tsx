"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Container } from "@/ui/components/container/container";
import { Typography } from "@/ui/components/typography/typography";
import { Update } from "./actions-user/update";
import clsx from "clsx";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { ToggleRole } from "./actions-user/toggle-role";
import { Delete } from "./actions-user/delete";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type User = {
  id: string;
  name: string;
  role: "USER" | "ADMIN";
  createdAt: Date;
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Nom",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <Container>
          <Typography>{user.name}</Typography>
        </Container>
      );
    },
  },
  {
    accessorKey: "role",
    header: "Rôle",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <Container className="flex">
          <Container
            className={clsx(
              "p-2 rounded-lg",
              user.role === "USER" ? "bg-neutral-100" : "bg-primary-100"
            )}
          >
            <Typography
              className={clsx(
                user.role === "USER" ? "text-neutral-800" : "text-primary-800"
              )}
            >
              {user.role === "USER" ? "Admin" : "Super admin"}
            </Typography>
          </Container>
        </Container>
      );
    },
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <Container>
          <Typography>
            {format(user.createdAt, "dd-MM-yyyy", { locale: fr })}
          </Typography>
        </Container>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <>
          {user.name != "Default admin" && (
            <Container className="flex flex-row gap-2 justify-end">
              <Container>
                <Update user={user} />
              </Container>
              <Container>
                <ToggleRole user={user} />
              </Container>
              {user.role === "ADMIN" ? null : (
                <Container>
                  <Delete id={user.id} name={user.name} />
                </Container>
              )}
            </Container>
          )}
        </>
      );
    },
  },
];
