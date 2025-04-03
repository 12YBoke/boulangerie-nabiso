"use client";
import { Button } from "@/shadcnui/components/ui/button";
import { Container } from "@/ui/components/container/container";
import { Typography } from "@/ui/components/typography/typography";
import clsx from "clsx";
import { eachDayOfInterval, endOfMonth, format, set } from "date-fns";
import { useEffect, useState } from "react";
import { addMonths, subMonths } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { columns } from "./columns";
import { columnsAgent } from "./columns-agent";
import { DataTable } from "./data-table";
import { fr } from "date-fns/locale";
import { _FinancialFlowTypes } from "@/types/_financial-flow-types";
import { FormatNumberWithCurrency } from "@/lib/format-number-with-currency";
import useExtensionIdStore from "@/store/extension-id-store";
import useStore from "@/hooks/useStore";
import { DataTableAgent } from "./data-table-agent";
import { DataTableCard } from "./data-table-card";

interface Props {
  data: _FinancialFlowTypes[];
  userData: {
    id: string;
    extensionId: string;
    role: "ADMIN" | "USER";
  }[];
  amountOrdersGenerated: {
    amount: number | null;
    amountPaid: number | null;
    voucherPaid: number | null;
    dateOrdered: Date;
    type: string;
    typeLabel: string;
    isDate: boolean;
  }[];
}

export const Filter = ({ data, userData, amountOrdersGenerated }: Props) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date()); // Initialise avec la date actuelle
  const [filteredData, setFilteredData] = useState<_FinancialFlowTypes[]>([]);
  const [filterIncome, setFilterIncome] = useState<_FinancialFlowTypes[]>([]);
  const [filterExpense, setFilterExpense] = useState<_FinancialFlowTypes[]>([]);
  const [filterIncomeUntilTheDate, setFilterIncomeUntilTheDate] = useState<
    _FinancialFlowTypes[]
  >([]);
  const [filterIncomeUntilCurrentDate, setFilterIncomeUntilCurrentDate] =
    useState<_FinancialFlowTypes[]>([]);
  const [filterExpenseUntilTheDate, setFilterExpenseUntilTheDate] = useState<
    _FinancialFlowTypes[]
  >([]);
  const [filterExpenseUntilCurrentDate, setFilterExpenseUntilCurrentDate] =
    useState<_FinancialFlowTypes[]>([]);
  const [filteredAmountOrdersGenerated, setFilteredAmountOrdersGenerated] =
    useState<
      {
        amount: number | null;
        amountPaid: number | null;
        voucherPaid: number | null;
        dateOrdered: Date;
        type: string;
        typeLabel: string;
        isDate: boolean;
      }[]
    >([]);
  const [
    filteredAmountOrdersGeneratedUntilTheDate,
    setFilteredAmountOrdersGeneratedUntilTheDate,
  ] = useState<
    {
      amount: number | null;
      amountPaid: number | null;
      voucherPaid: number | null;
      dateOrdered: Date;
      type: string;
      typeLabel: string;
      isDate: boolean;
    }[]
  >([]);
  const [
    filteredAmountOrdersGeneratedUntilCurrentDate,
    setFilteredAmountOrdersGeneratedUntilCurrentDate,
  ] = useState<
    {
      amount: number | null;
      amountPaid: number | null;
      voucherPaid: number | null;
      dateOrdered: Date;
      type: string;
      typeLabel: string;
      isDate: boolean;
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
    const filteredData: _FinancialFlowTypes[] = data.filter(
      (flow) => flow.date && format(flow.date, "yyyy-MM-dd") === formattedDate
    ); // Type Guard pour éliminer les `null`

    const filteredAmountOrdersGenerated = amountOrdersGenerated.filter(
      (a) =>
        a.dateOrdered && format(a.dateOrdered, "yyyy-MM-dd") === formattedDate
    );

    const filteredAmountOrdersGeneratedUntilTheDate =
      amountOrdersGenerated.filter(
        (a) =>
          a.dateOrdered && format(a.dateOrdered, "yyyy-MM-dd") < formattedDate
      );

    const filteredAmountOrdersGeneratedUntilCurrentDate =
      amountOrdersGenerated.filter(
        (a) =>
          a.dateOrdered && format(a.dateOrdered, "yyyy-MM-dd") <= formattedDate
      );

    const filteredIncome = data.filter(
      (flow) =>
        flow.flowType === "INCOME" &&
        format(flow.date, "yyyy-MM-dd") === formattedDate
    );

    const filteredExpense = data.filter(
      (flow) =>
        flow.flowType === "EXPENSE" &&
        format(flow.date, "yyyy-MM-dd") === formattedDate
    );

    const filteredIncomeUntilTheDate = data.filter(
      (flow) =>
        flow.flowType === "INCOME" &&
        format(flow.date, "yyyy-MM-dd") < formattedDate
    );

    const filteredIncomeUntilCurrentDate = data.filter(
      (flow) =>
        flow.flowType === "INCOME" &&
        format(flow.date, "yyyy-MM-dd") <= formattedDate
    );

    const filteredExpenseUntilTheDate = data.filter(
      (flow) =>
        flow.flowType === "EXPENSE" &&
        format(flow.date, "yyyy-MM-dd") < formattedDate
    );

    const filteredExpenseUntilCurrentDate = data.filter(
      (flow) =>
        flow.flowType === "EXPENSE" &&
        format(flow.date, "yyyy-MM-dd") <= formattedDate
    );

    setFilterIncomeUntilCurrentDate(filteredIncomeUntilCurrentDate);
    setFilterExpenseUntilCurrentDate(filteredExpenseUntilCurrentDate);
    setFilteredAmountOrdersGeneratedUntilCurrentDate(
      filteredAmountOrdersGeneratedUntilCurrentDate
    );
    setFilterIncome(filteredIncome);
    setFilterExpense(filteredExpense);
    setFilterIncomeUntilTheDate(filteredIncomeUntilTheDate);
    setFilterExpenseUntilTheDate(filteredExpenseUntilTheDate);
    setFilteredAmountOrdersGeneratedUntilTheDate(
      filteredAmountOrdersGeneratedUntilTheDate
    );
    setFilteredAmountOrdersGenerated(filteredAmountOrdersGenerated);
    setFilteredData(filteredData);
  }, [amountOrdersGenerated, data, selectedDate]);

  const flowByDay = (day: Date) => {
    return (
      data.filter((flow) => {
        const isflowDateMatching =
          format(flow.date, "yyyy-MM-dd") === format(day, "yyyy-MM-dd");

        return isflowDateMatching;
      }).length > 0
    );
  };

  const filteredDataWithIsDate = filteredData.map((flow) => ({
    id: flow.id,
    amount: flow.amount,
    reason: flow.reason,
    date: flow.date,
    flowType: flow.flowType,
    agent: flow.agent,
    isDate:
      format(flow.date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd"),
    agentSalary: flow.agentSalary,
    cardPayment: flow.cardPayment,
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
          <Container className="flex flex-col gap-4">
            <Container
              className="
                    grid grid-cols-3 gap-4 
                    *:rounded-lg *:w-full *:justify-between
                    "
            >
              <Container className="flex flex-col gap-4 p-4 bg-primary-100">
                <Typography className="text-primary-800">
                  Total montant commande
                </Typography>
                <Typography variant="title-base" className="text-primary-800">
                  {FormatNumberWithCurrency(
                    filteredAmountOrdersGenerated.reduce((acc, curr) => {
                      return acc + (curr.voucherPaid || 0);
                    }, 0) +
                      filteredAmountOrdersGenerated
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
                      filteredAmountOrdersGenerated
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
              <Container className="flex flex-col gap-4 p-4 bg-green-100">
                <Typography className="text-green-800">
                  Total revenu du jour
                </Typography>
                <Typography variant="title-base" className="text-green-800">
                  {FormatNumberWithCurrency(
                    filterIncome.reduce((acc, curr) => {
                      return acc + (curr.amount || 0);
                    }, 0)
                  )}
                </Typography>
              </Container>
              <Container className="flex flex-col gap-4 p-4 bg-red-100">
                <Typography className="text-red-800">
                  Total depense du jour
                </Typography>
                <Typography variant="title-base" className="text-red-800">
                  {FormatNumberWithCurrency(
                    filterExpense.reduce((acc, curr) => {
                      return acc + (curr.amount || 0);
                    }, 0)
                  )}
                </Typography>
              </Container>
              <Container className="col-span-3 grid grid-cols-2 gap-4 *:flex *:flex-col *:gap-4 *:p-4 *:rounded-lg *:w-full *:justify-between">
                <Container className="flex flex-col gap-2 bg-neutral-100">
                  <Typography className="text-neutral-800">
                    Total solde précédant
                  </Typography>
                  <Typography variant="title-base" className="text-neutral-800">
                    {FormatNumberWithCurrency(
                      filteredAmountOrdersGeneratedUntilTheDate.reduce(
                        (acc, curr) => {
                          return acc + (curr.voucherPaid || 0);
                        },
                        0
                      ) +
                        filteredAmountOrdersGeneratedUntilTheDate
                          .filter((data) => {
                            return data.type === "ORDER";
                          })
                          .reduce((acc, curr) => {
                            return acc + (curr.amountPaid || 0);
                          }, 0) +
                        filteredAmountOrdersGeneratedUntilTheDate
                          .filter((data) => {
                            return data.type != "ORDER";
                          })
                          .reduce((acc, curr) => {
                            return acc + (curr.amount || 0);
                          }, 0) +
                        (filterIncomeUntilTheDate.reduce((acc, curr) => {
                          return acc + (curr.amount || 0);
                        }, 0) -
                          filterExpenseUntilTheDate.reduce((acc, curr) => {
                            return acc + (curr.amount || 0);
                          }, 0))
                    )}
                  </Typography>
                </Container>
                <Container className="flex flex-col gap-2 bg-neutral-100">
                  <Typography className="text-neutral-800">
                    Total solde de la journée
                  </Typography>
                  <Typography variant="title-base" className="text-neutral-800">
                    {FormatNumberWithCurrency(
                      filteredAmountOrdersGenerated.reduce((acc, curr) => {
                        return acc + (curr.voucherPaid || 0);
                      }, 0) +
                        filteredAmountOrdersGenerated
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
                        filteredAmountOrdersGenerated
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
                          }, 0) +
                        filterIncome.reduce((acc, curr) => {
                          return acc + (curr.amount || 0);
                        }, 0) -
                        filterExpense.reduce((acc, curr) => {
                          return acc + (curr.amount || 0);
                        }, 0)
                    )}
                  </Typography>
                </Container>
              </Container>
              <Container className="flex flex-col gap-4 p-4 bg-primary-100 col-span-3">
                <Typography className="text-primary-800">
                  Total montant entré
                </Typography>
                <Typography variant="title-base" className="text-primary-800">
                  {FormatNumberWithCurrency(
                    filteredAmountOrdersGeneratedUntilCurrentDate.reduce(
                      (acc, curr) => {
                        return acc + (curr.voucherPaid || 0);
                      },
                      0
                    ) +
                      filteredAmountOrdersGeneratedUntilCurrentDate
                        .filter((data) => {
                          return data.type === "ORDER";
                        })
                        .reduce((acc, curr) => {
                          return acc + (curr.amountPaid || 0);
                        }, 0) +
                      filteredAmountOrdersGeneratedUntilCurrentDate
                        .filter((data) => {
                          return data.type != "ORDER";
                        })
                        .reduce((acc, curr) => {
                          return acc + (curr.amount || 0);
                        }, 0) +
                      (filterIncomeUntilCurrentDate.reduce((acc, curr) => {
                        return acc + (curr.amount || 0);
                      }, 0) -
                        filterExpenseUntilCurrentDate.reduce((acc, curr) => {
                          return acc + (curr.amount || 0);
                        }, 0))
                  )}
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
      <Container>
        <DataTableAgent
          columns={columnsAgent}
          userData={filterUser}
          data={filteredDataWithIsDate.filter((data) => data.agentSalary)}
        />
      </Container>
      {/* <Container>
        <DataTableCard
          columns={columnsAgent}
          userData={filterUser}
          data={filteredDataWithIsDate.filter((data) => data.cardPayment)}
        />
      </Container> */}
    </Container>
  );
};
