import { AppLinks } from "@/types/app-links";
import { BookUser, CandlestickChart, Coins, Landmark, PackageCheck, PackageOpen, Presentation, Settings, Shield, Zap } from "lucide-react";

export const AsideRoutes: AppLinks[] = [
  {
    title: 'Dashboard',
    children: [
      {
        title: 'Tableau de bord',
        baseUrl: '/',
        Icon: Presentation
      }
    ]
  },
  {
    title: 'Activités',
    children: [
      {
        title: 'Commandes',
        baseUrl: '/Orders',
        Icon: Coins
      },
      {
        title: 'Livraisons',
        baseUrl: '/Deliveries',
        Icon: PackageCheck
      },
    ]
  },
  {
    title: 'Gestion des cartes',
    children: [
      {
        title: 'Clients',
        baseUrl: '/Customers',
        Icon: BookUser
      },
    ]
  },
  {
    title: 'Finances',
    children: [
      {
        title: 'Etat financier',
        baseUrl: '/Financial-statement',
        Icon: CandlestickChart
      },
    ]
  },
  {
    title: 'Administration',
    children: [
      {
        title: 'Configuration',
        baseUrl: '/Setting',
        Icon: Settings
      }
    ]
  },
]