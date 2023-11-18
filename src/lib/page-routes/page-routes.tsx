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
        title: 'Vente cash',
        baseUrl: '/Cash-sale',
        Icon: Zap
      },
      {
        title: 'Livraison',
        baseUrl: '/Delivery',
        Icon: PackageCheck
      },
    ]
  },
  {
    title: 'Gestion des cartes',
    children: [
      {
        title: 'Cartes clients',
        baseUrl: '/Customer-cards',
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
      {
        title: 'Paiement',
        baseUrl: '/Payment',
        Icon: Landmark
      },
    ]
  },
  {
    title: 'Administration',
    children: [
      {
        title: 'Personnel',
        baseUrl: '/Staff-management',
        Icon: Shield
      },
      {
        title: 'Archives',
        baseUrl: '/Archives',
        Icon: PackageOpen
      },
      {
        title: 'Configuration',
        baseUrl: '/Setting',
        Icon: Settings
      }
    ]
  },
]