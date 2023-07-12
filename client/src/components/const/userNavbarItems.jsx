import DashboardIcon from "@mui/icons-material/Dashboard";
import CategoryIcon from "@mui/icons-material/Category";

export const userNavbarItems = [
  {
    id: 0,
    icon: <DashboardIcon />,
    label: "Dashboard",
    route: "dashboard",
  },
  {
    id: 1,
    icon: <CategoryIcon />,
    label: "Ajouter un produit",
    route: "route",
  },
];
