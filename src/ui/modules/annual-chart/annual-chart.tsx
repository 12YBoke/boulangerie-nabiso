/* eslint-disable react/no-unescaped-entities */
"use client";

import { FormatNumberWithCurrency } from "@/lib/format-number-with-currency";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/shadcnui/components/ui/chart";
import { ScrollArea } from "@/shadcnui/components/ui/scroll-area";
import { Container } from "@/ui/components/container/container";
import { Typography } from "@/ui/components/typography/typography";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, TooltipProps } from "recharts";

interface Props {
  data: Record<
    number,
    {
      month: string;
      totalAmount: number;
      totalAmountWithCard: number;
      totalAmountWithoutCard: number;
      orderNumberRegistered: number;
    }[]
  >;
}

export const AnnualChart = ({ data }: Props) => {
  const arrayOfYears = Object.keys(data);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const [chartData, setChartData] = useState<
    {
      month: string;
      totalAmount: number;
      totalAmountWithCard: number;
      totalAmountWithoutCard: number;
      orderNumberRegistered: number;
    }[]
  >(data[selectedYear]);

  const chartConfig = {
    totalAmount: {
      label: "Total",
      color: "#9046CF",
    },
    totalAmountWithCard: {
      label: "Avec carte",
      color: "#CC59D2",
    },
    totalAmountWithoutCard: {
      label: "Sans carte",
      color: "#F487B6",
    },
    orderNumberRegistered: {
      label: "Nombre commande",
      color: "#D2F898",
    },
  } satisfies ChartConfig;

  const months = [
    { id: "Janvier", name: "Jan." },
    { id: "Février", name: "Fév." },
    { id: "Mars", name: "Mars" },
    { id: "Avril", name: "Avril" },
    { id: "Mai", name: "Mai" },
    { id: "Juin", name: "Juin" },
    { id: "Juillet", name: "Juil." },
    { id: "Août", name: "Août" },
    { id: "Septembre", name: "Sept." },
    { id: "Octobre", name: "Oct." },
    { id: "Novembre", name: "Nov." },
    { id: "Décembre", name: "Déc." },
  ];

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-black p-4 rounded-lg flex flex-col gap-2">
          <p className="text-white">Commande {label}</p>
          <Container>
            <span className="text-white rounded-lg">
              Total : {FormatNumberWithCurrency(payload[0].value!)}
            </span>
          </Container>
          <Container>
            <span className="text-white rounded-lg">
              Avec carte : {FormatNumberWithCurrency(payload[1].value!)}
            </span>
          </Container>
          <Container>
            <span className="text-white rounded-lg">
              Sans carte : {FormatNumberWithCurrency(payload[2].value!)}
            </span>
          </Container>
        </div>
      );
    }

    return null;
  };

  useEffect(() => {
    setChartData(data[selectedYear]);
  }, [data, selectedYear]);

  return (
    <Container className="flex flex-row gap-8">
      <Container className="basis-1/4 rounded-lg flex flex-col gap-8">
        <Typography>Selectionnez une année</Typography>

        <ScrollArea className="h-[80vh] pr-4 whitespace-nowrap rounded-lg">
          <Container className="flex flex-col gap-2">
            {arrayOfYears.reverse().map((year, index) => (
              <div
                key={index}
                className={clsx(
                  "cursor-pointer flex flex-row justify-between items-center gap-2 p-2 rounded-lg border-2 hover:border-primary-100 animate",
                  selectedYear === parseInt(year)
                    ? "border-primary-100 bg-primary-100"
                    : ""
                )}
                onClick={() => setSelectedYear(parseInt(year))}
              >
                {year}
              </div>
            ))}
          </Container>
        </ScrollArea>
      </Container>
      <Container className="basis-3/4 p-8 rounded-lg bg-primary-100 flex flex-col gap-8">
        <Container className="flex flex-row justify-between w-full">
          <Container className="basis-2/3 flex flex-col gap-2">
            <Typography>Commande de l'année</Typography>
            <Typography variant="title-lg" className="text-primary-800">
              {FormatNumberWithCurrency(
                chartData.reduce(
                  (acc, curr) => acc + (curr.totalAmount || 0),
                  0
                )
              )}
            </Typography>
          </Container>
          <Container className="basis-1/3 flex flex-col gap-2 items-end">
            <Typography>
              Avec carte :{" "}
              {FormatNumberWithCurrency(
                chartData.reduce(
                  (acc, curr) => acc + (curr.totalAmountWithCard || 0),
                  0
                )
              )}
            </Typography>
            <Typography>
              Sans carte :{" "}
              {FormatNumberWithCurrency(
                chartData.reduce(
                  (acc, curr) => acc + (curr.totalAmountWithoutCard || 0),
                  0
                )
              )}
            </Typography>
          </Container>
        </Container>
        <ChartContainer config={chartConfig} className="min-h-[100px] w-full">
          <BarChart accessibilityLayer data={chartData}>
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={4}
              axisLine={false}
              tickFormatter={(value) =>
                months.find((x) => x.id === "" + value + "")!.name
              }
            />
            <ChartTooltip
              content={<CustomTooltip />}
              cursor={{ fill: "#fffbeb" }}
            />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="totalAmount"
              fill="var(--color-totalAmount)"
              radius={0}
            />
            <Bar
              dataKey="totalAmountWithCard"
              stackId={"a"}
              fill="var(--color-totalAmountWithCard)"
              radius={0}
            />
            <Bar
              dataKey="totalAmountWithoutCard"
              stackId={"a"}
              fill="var(--color-totalAmountWithoutCard)"
              radius={0}
            />
          </BarChart>
        </ChartContainer>
      </Container>
    </Container>
  );
};
