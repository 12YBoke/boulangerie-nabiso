"use client";
import { Button } from "@/shadcnui/components/ui/button";
import { Container } from "@/ui/components/container/container";
import { Typography } from "@/ui/components/typography/typography";
import clsx from "clsx";
import { eachDayOfInterval, endOfMonth, format } from "date-fns";
import { useEffect, useState } from "react";
import { addMonths, subMonths } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { fr } from "date-fns/locale";
import useExtensionIdStore from "@/store/extension-id-store";
import useStore from "@/hooks/useStore";

interface Props {
  data: {
    id: string;
    name: string;
    startingStock: string;
    endingStock: string;
    date: Date;
    income?: string | null;
    dayProduction: string;
    agent: string;
  }[];
  userData: {
    id: string;
    extensionId: string;
    role: "ADMIN" | "USER";
  }[];
}

export const Filter = ({ data, userData }: Props) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filteredData, setFilteredData] = useState<
    {
      id: string;
      name: string;
      startingStock: string;
      endingStock: string;
      date: Date;
      income?: string | null;
      dayProduction: string;
      agent: string;
    }[]
  >([]);

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
    const filteredData: {
      id: string;
      name: string;
      startingStock: string;
      endingStock: string;
      date: Date;
      dayProduction: string;
      agent: string;
      income?: string | null;
    }[] = data.filter(
      (s) => s.date && format(s.date, "yyyy-MM-dd") === formattedDate
    ); // Type Guard pour éliminer les `null`

    setFilteredData(filteredData);
  }, [data, selectedDate]);

  const flowByDay = (day: Date) => {
    return (
      data.filter((flow) => {
        const isflowDateMatching =
          format(flow.date, "yyyy-MM-dd") === format(day, "yyyy-MM-dd");

        return isflowDateMatching;
      }).length > 0
    );
  };

  const filteredDataWithIsDate = filteredData.map((s) => ({
    id: s.id,
    name: s.name,
    startingStock: s.startingStock,
    date: s.date,
    endingStock: s.endingStock,
    agent: s.agent,
    dayProduction: s.dayProduction,
    income: s.income,
    isDate: format(s.date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd"),
  }));

  const extensionid = useStore(
    useExtensionIdStore,
    (state) => state.extensionId
  );

  const filterUser = userData.find((user) => user.extensionId === extensionid);

  return (
    <Container className="flex flex-col gap-4">
      <Container className="flex flex-row justify-between ">
        <Container className="flex flex-col gap-8 w-[60%]">
          <Container>
            <Typography variant="title-lg">Liste des transactions</Typography>
          </Container>
          <Container className="flex flex-row gap-2 items-center">
            <Typography>Date</Typography>
            <Typography className="bg-primary-100 p-2 rounded-lg text-primary-800">
              {format(selectedDate, "dd-MM-yyyy", { locale: fr })}
            </Typography>
          </Container>
        </Container>
        <Container className="w-[36%] p-4 border rounded-md">
          <Container className="text-center mb-2 flex justify-between items-center">
            <Button
              onClick={handlePreviousMonth}
              variant={"ghost"}
              className="hover:bg-neutral-100"
            >
              <ChevronLeft />
            </Button>
            <Typography variant="title-base">
              {months.find((x) => x.id === "" + month + "")?.name || ""} {year}
            </Typography>
            <Button
              onClick={handleNextMonth}
              variant={"ghost"}
              className="hover:bg-neutral-100"
            >
              <ChevronRight />
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
                    "h-4 w-4 p-4 hover:bg-primary-100 hover:text-primary-800",
                    selectedDate?.toDateString() === day.toDateString() &&
                      "bg-primary-100 text-primary-800", // Fond bleu pour la date sélectionnée
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
                      !flowByDay(day) ? "bg-neutral-200" : "bg-primary-400"
                    )}
                  ></span>
                </Container>
              </Container>
            ))}
          </Container>
        </Container>
      </Container>
      <Container>
        <DataTable
          columns={columns}
          userData={filterUser}
          data={filteredDataWithIsDate}
        />
      </Container>
    </Container>
  );
};
