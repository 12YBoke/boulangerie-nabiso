"use client";
import { Button } from "@/shadcnui/components/ui/button";
import { Container } from "@/ui/components/container/container";
import { Typography } from "@/ui/components/typography/typography";
import clsx from "clsx";
import { eachDayOfInterval, endOfMonth, format } from "date-fns";
import { useEffect, useState } from "react";
import { addMonths, subMonths } from "date-fns";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { _DeliveryTypes } from "@/types/_delivery-types";
import { FormatNumberWithCurrency } from "@/lib/format-number-with-currency";
import { fr } from "date-fns/locale";

interface Props {
  data: _DeliveryTypes[];
}

export const Filter = ({ data }: Props) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date()); // Initialise avec la date actuelle
  const [filteredData, setFilteredData] = useState<_DeliveryTypes[]>([]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;

  let currentMonth = new Date(year, month - 1);
  let days = eachDayOfInterval({
    start: currentMonth,
    end: endOfMonth(currentMonth),
  });

  const isDayPresent = (date: Date) => {
    return days.some(
      (presentDate: Date) => presentDate.toDateString() === date.toDateString()
    );
  };

  const DaysOfWeek = [
    { id: 1, name: "Lun." },
    { id: 2, name: "Mar." },
    { id: 3, name: "Mer." },
    { id: 4, name: "Jeu." },
    { id: 5, name: "Ven." },
    { id: 6, name: "Sam." },
    { id: 7, name: "Dim." },
  ];

  const months = [
    { id: "1", name: "Janvier" },
    { id: "2", name: "Février" },
    { id: "3", name: "Mars" },
    { id: "4", name: "Avril" },
    { id: "5", name: "Mai" },
    { id: "6", name: "Juin" },
    { id: "7", name: "Juillet" },
    { id: "8", name: "Août" },
    { id: "9", name: "Septembre" },
    { id: "10", name: "Octobre" },
    { id: "11", name: "Novembre" },
    { id: "12", name: "Décembre" },
  ];

  const handlePreviousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    const date = selectedDate || new Date();
    const formattedDate = format(date, "yyyy-MM-dd");

    // Filtrage des commandes
    const filteredData: _DeliveryTypes[] = data
      .map((order) => {
        // Filtrage des livraisons par date sélectionnée
        const filteredDeliveries = order.deliveries.filter(
          (delivery) =>
            delivery?.dateDelivered &&
            format(delivery.dateDelivered, "yyyy-MM-dd") === formattedDate
        );

        // Vérification si la commande ou ses livraisons correspondent
        const isOrderSelected =
          format(order.dateOrdered, "yyyy-MM-dd") === formattedDate ||
          filteredDeliveries.length > 0;

        if (isOrderSelected) {
          // Retourne la commande avec les livraisons filtrées
          return {
            ...order,
            deliveries: filteredDeliveries,
          };
        }

        return null; // Si la commande ne correspond pas, retourne null
      })
      .filter((order): order is _DeliveryTypes => order !== null); // Type Guard pour éliminer les `null`

    setFilteredData(filteredData);
  }, [data, selectedDate]);

  const orderByDay = (day: Date) => {
    return (
      data.filter((order) => {
        // Vérifie si la date de commande correspond
        const isOrderDateMatching =
          format(order.dateOrdered, "yyyy-MM-dd") === format(day, "yyyy-MM-dd");

        // Vérifie si au moins une livraison correspond à la date
        const isDeliveryDateMatching =
          order.deliveries.length > 0 &&
          order.deliveries.some(
            (delivery) =>
              delivery.dateDelivered &&
              format(delivery.dateDelivered, "yyyy-MM-dd") ===
                format(day, "yyyy-MM-dd")
          );

        // Retourne true si une des deux conditions est remplie
        return isOrderDateMatching || isDeliveryDateMatching;
      }).length > 0
    );
  };

  console.log(
    filteredData
      .filter((data) => {
        return data.deliveries.length > 0;
      })
      .map((data) => data.deliveries)
      .flat()
  );

  return (
    <Container>
      <Container className="flex flex-row justify-between ">
        <Container className="flex flex-col gap-8 w-[60%]">
          <Container>
            <Typography variant="title-lg">Liste des livraisons</Typography>
          </Container>
          <Container className="flex flex-row gap-2 items-center">
            <Typography>Date</Typography>
            <Typography className="bg-primary-200 p-2 rounded-lg text-primary-800">
              {format(selectedDate, "dd-MM-yyyy", { locale: fr })}
            </Typography>
          </Container>
          <Container className="flex flex-col gap-4">
            <Container
              className="
          grid grid-cols-3 gap-4 
          *:bg-primary-200 *:flex *:flex-col *:gap-4 *:p-4 *:rounded-lg *:w-full
          "
            >
              <Container className="flex flex-col gap-2">
                <Typography className="text-primary-800">
                  Total montant payé
                </Typography>
                <Typography variant="title-lg" className="text-primary-800">
                  {FormatNumberWithCurrency(
                    filteredData
                      .filter((data) => {
                        return data.type === "ORDER";
                      })
                      .filter((data) => {
                        return (
                          format(data.dateOrdered!, "yyyy-MM-dd") ===
                          format(selectedDate, "yyyy-MM-dd")
                        );
                      })
                      .reduce((acc, curr) => {
                        return acc + (curr.amountPaid || 0);
                      }, 0) +
                      filteredData
                        .filter((data) => {
                          return data.type != "ORDER";
                        })
                        .filter((data) => {
                          return (
                            format(data.dateOrdered!, "yyyy-MM-dd") ===
                            format(selectedDate, "yyyy-MM-dd")
                          );
                        })
                        .reduce((acc, curr) => {
                          return acc + (curr.amount || 0);
                        }, 0)
                  )}
                </Typography>
              </Container>
              <Container className="flex flex-col gap-2">
                <Typography className="text-primary-800">
                  Total commande
                </Typography>
                <Typography variant="title-lg" className="text-primary-800">
                  {FormatNumberWithCurrency(
                    filteredData
                      .filter((data) => {
                        return data.type === "ORDER";
                      })
                      .filter((data) => {
                        return (
                          format(data.dateOrdered!, "yyyy-MM-dd") ===
                          format(selectedDate, "yyyy-MM-dd")
                        );
                      })
                      .reduce((acc, curr) => {
                        return acc + (curr.amount || 0);
                      }, 0) +
                      filteredData
                        .filter((data) => {
                          return data.type != "ORDER";
                        })
                        .filter((data) => {
                          return (
                            format(data.dateOrdered!, "yyyy-MM-dd") ===
                            format(selectedDate, "yyyy-MM-dd")
                          );
                        })
                        .reduce((acc, curr) => {
                          return acc + (curr.amountToBeDelivered || 0);
                        }, 0)
                  )}
                </Typography>
              </Container>
              <Container className="flex flex-col gap-2">
                <Typography className="text-primary-800">
                  Total livraison
                </Typography>
                <Typography variant="title-lg" className="text-primary-800">
                  {FormatNumberWithCurrency(
                    filteredData
                      .filter((data) => {
                        return data.deliveries.length === 0;
                      })
                      .filter((data) => {
                        return data.type === "ORDER";
                      })
                      .reduce((acc, curr) => {
                        return acc + (curr.amount || 0);
                      }, 0) +
                      filteredData
                        .filter((data) => {
                          return data.deliveries.length === 0;
                        })
                        .filter((data) => {
                          return data.type != "ORDER";
                        })
                        .reduce((acc, curr) => {
                          return acc + (curr.amountToBeDelivered || 0);
                        }, 0) +
                      filteredData
                        .filter((data) => {
                          return data.deliveries.length > 0;
                        })
                        .map((data) => data.deliveries)
                        .flat()
                        .reduce((acc, curr) => {
                          return acc + (curr.amountDelivered || 0);
                        }, 0)
                  )}
                </Typography>
              </Container>
            </Container>
            <Container
              className="
          grid grid-cols-4 gap-4 *:flex *:flex-col *:gap-4 *:p-4 *:rounded-lg *:w-full
          "
            >
              <Container className="flex flex-col gap-2 bg-emerald-100">
                <Typography className="text-emerald-800">
                  Nombre de commande
                </Typography>
                <Typography variant="title-lg" className="text-emerald-800">
                  {
                    filteredData.filter((data) => {
                      return (
                        format(data.dateOrdered, "yyyy-MM-dd") ===
                        format(selectedDate, "yyyy-MM-dd")
                      );
                    }).length
                  }
                </Typography>
              </Container>
              <Container className="flex flex-col gap-2 bg-emerald-100">
                <Typography className="text-emerald-800">
                  Commandes avec carte
                </Typography>
                <Typography variant="title-lg" className="text-emerald-800">
                  {
                    filteredData
                      .filter((data) => {
                        return (
                          format(data.dateOrdered, "yyyy-MM-dd") ===
                          format(selectedDate, "yyyy-MM-dd")
                        );
                      })
                      .filter((data) => {
                        return data.type === "ORDER";
                      }).length
                  }
                </Typography>
              </Container>
              <Container className="flex flex-col gap-2 bg-emerald-100">
                <Typography className="text-emerald-800">
                  Commandes sans carte
                </Typography>
                <Typography variant="title-lg" className="text-emerald-800">
                  {
                    filteredData
                      .filter((data) => {
                        return (
                          format(data.dateOrdered, "yyyy-MM-dd") ===
                          format(selectedDate, "yyyy-MM-dd")
                        );
                      })
                      .filter((data) => {
                        return data.type != "ORDER";
                      }).length
                  }
                </Typography>
              </Container>
              <Container className="flex flex-col gap-2 bg-red-200">
                <Typography className="text-red-800">
                  Commandes précédentes
                </Typography>
                <Typography variant="title-lg" className="text-red-800">
                  {
                    filteredData.filter((data) => {
                      return (
                        format(data.dateOrdered, "yyyy-MM-dd") !=
                        format(selectedDate, "yyyy-MM-dd")
                      );
                    }).length
                  }
                </Typography>
              </Container>
            </Container>
          </Container>
        </Container>
        <Container className="w-[36%] p-4 border rounded-md">
          <Container className="text-center mb-2 flex justify-between items-center">
            <Button
              onClick={handlePreviousMonth}
              variant={"ghost"}
              className="hover:bg-neutral-100"
            >
              <ArrowLeft />
            </Button>
            <Typography variant="title-base">
              {months.find((x) => x.id === "" + month + "")?.name || ""} {year}
            </Typography>
            <Button
              onClick={handleNextMonth}
              variant={"ghost"}
              className="hover:bg-neutral-100"
            >
              <ArrowRight />
            </Button>
          </Container>
          <Container className="grid grid-cols-7">
            {DaysOfWeek.map((dayofWeek) => (
              <div key={dayofWeek.id} className="text-center p-1">
                <Typography>{dayofWeek.name}</Typography>
              </div>
            ))}
          </Container>
          <Container className={clsx("grid grid-cols-7")}>
            {days.map((day, index) => (
              <Container
                key={day.toString()}
                className={clsx(
                  "p-1 text-center col-span-1 flex flex-col items-center gap-1",
                  index === 0 && day.getDay() === 0
                    ? "col-start-7"
                    : day.getDay() === 1
                    ? "col-start-1"
                    : day.getDay() === 2
                    ? "col-start-2"
                    : day.getDay() === 3
                    ? "col-start-3"
                    : day.getDay() === 4
                    ? "col-start-4"
                    : day.getDay() === 5
                    ? "col-start-5"
                    : day.getDay() === 6
                    ? "col-start-6"
                    : "col-start-7"
                )}
              >
                <Button
                  onClick={() => handleDateClick(day)}
                  variant={"ghost"}
                  className={clsx(
                    "h-4 w-4 p-4 hover:bg-primary-Default hover:text-white",
                    selectedDate?.toDateString() === day.toDateString() &&
                      "bg-primary-Default text-white", // Fond bleu pour la date sélectionnée
                    !isDayPresent(day) &&
                      "bg-white text-black hover:bg-white hover:text-black"
                  )}
                >
                  <time dateTime={format(day, "yyyy-MM-dd")}>
                    {format(day, "d")}
                  </time>
                </Button>
                <Container className="w-full flex flex-row items-center justify-center gap-2">
                  <span
                    className={clsx(
                      "h-2 w-2 rounded-full",
                      !orderByDay(day) ? "bg-neutral-200" : "bg-primary-Default"
                    )}
                  ></span>
                </Container>
              </Container>
            ))}
          </Container>
        </Container>
      </Container>
      <Container>
        <DataTable columns={columns} data={filteredData} />
      </Container>
    </Container>
  );
};
