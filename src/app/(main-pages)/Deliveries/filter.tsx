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

interface Props {
  data: _DeliveryTypes[];
  userData: {
    id: string;
    extensionId: string;
  }[];
}

export const Filter = ({ userData, data }: Props) => {
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
    const filteredData = data.filter((order) => {
      return (
        format(order.dateOrdered, "yyyy-MM-dd") ===
          format(date, "yyyy-MM-dd") ||
        (order.deliveries.length > 0 &&
          order.deliveries[0].dateDelivered &&
          format(order.deliveries[0].dateDelivered, "yyyy-MM-dd") ===
            format(date, "yyyy-MM-dd"))
      );
    });

    setFilteredData(filteredData);
  }, [data, selectedDate]);

  const orderByDay = (day: Date) => {
    return (
      data.filter((order) => {
        return (
          format(order.dateOrdered, "yyyy-MM-dd") ===
            format(day, "yyyy-MM-dd") ||
          (order.deliveries.length > 0 &&
            order.deliveries[0].dateDelivered &&
            format(order.deliveries[0].dateDelivered, "yyyy-MM-dd") ===
              format(day, "yyyy-MM-dd"))
        );
      }).length > 0
    );
  };

  return (
    <Container>
      <Container className="flex flex-row justify-between">
        <Container>
          <Typography variant="title-lg">Liste des livraisons</Typography>
          rapport
        </Container>
        <Container className="p-4 border rounded-md">
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
        <DataTable columns={columns} data={filteredData} userData={userData} />
      </Container>
    </Container>
  );
};
