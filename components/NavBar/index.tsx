import NavBarItem from "../NavBarItem";

const navbarItems = [
  {
    id: 1,
    title: "Home",
    path: "/",
  },
  {
    id: 2,
    title: "Commodities",
    path: "/commodities",
    children: [
      {
        id: 1,
        title: "Crude Oil (WTI)",
        path: "/wti",
      },
      {
        id: 2,
        title: "Crude Oil (Brent)",
        path: "/brent",
      },
      {
        id: 3,
        title: "Natural Gas",
        path: "/natural_gas",
      },
      {
        id: 4,
        title: "Copper",
        path: "/copper",
      },
      {
        id: 5,
        title: "Aluminum",
        path: "/aluminum",
      },
      {
        id: 6,
        title: "Wheat",
        path: "/wheat",
      },
      {
        id: 7,
        title: "Corn",
        path: "/corn",
      },
      {
        id: 8,
        title: "Cotton",
        path: "/cotton",
      },
      {
        id: 9,
        title: "Sugar",
        path: "/sugar",
      },
      {
        id: 10,
        title: "Coffee",
        path: "/coffee",
      },
    ],
  },
  {
    id: 3,
    title: "Forex (FX)",
    path: "/forex",
    children: [
      {
        id: 2,
        title: "Daily",
        path: "/fx_daily",
      },
      {
        id: 3,
        title: "Weekly",
        path: "/fx_weekly",
      },
      {
        id: 4,
        title: "Monthly",
        path: "/fx_monthly",
      },
    ],
  },
];

export default function NavBar() {
  return (
    <div className="hidden w-full md:block md:w-auto">
      <div className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:mt-0 md:border-0 md:bg-white">
        {navbarItems.map((navbarItem) => (
          <NavBarItem key={navbarItem.id} {...navbarItem} />
        ))}
      </div>
    </div>
  );
}
