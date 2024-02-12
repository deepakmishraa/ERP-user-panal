export interface IMenuItem {
  id: number;
  name: string;
  iconify: string;
  path?: string;
  list?: IMenuItem[];
}

export const shopManager: IMenuItem[] = [
  {
    id: 1,
    name: "Dashboard",
    path: "/",
    iconify: "streamline:dashboard-3-solid",
  },
  {
    id: 2,
    name: "Place Order",
    iconify: "lets-icons:order-light",
    list: [
      {
        id: 1,
        name: "View Order",
        iconify: "lets-icons:view-light",
        path: "/place-order/view",
      },
      {
        id: 2,
        name: "Add Order",
        iconify: "mingcute:add-fill",
        path: "/place-order/add",
      },
    ],
  },
];

export const purchaseManager: IMenuItem[] = [
  {
    id: 1,
    name: "Dashboard",
    path: "/",
    iconify: "streamline:dashboard-3-solid",
  },
  {
    id: 2,
    name: "Buy Order",
    path: "/buy-order",
    iconify: "lets-icons:order-light",
  },
];

export const procurementManager: IMenuItem[] = [
  {
    id: 1,
    name: "Dashboard",
    path: "/",
    iconify: "streamline:dashboard-3-solid",
  },
  {
    id: 2,
    name: "Check Order",
    path: "/check-order",
    iconify: "lets-icons:order-light",
  },
];

export const allocationManager: IMenuItem[] = [
  {
    id: 1,
    name: "Dashboard",
    path: "/",
    iconify: "streamline:dashboard-3-solid",
  },
  {
    id: 2,
    name: "Confirm Order",
    path: "/Confirm-order",
    iconify: "lets-icons:order-light",
  },
];

export const isAllNav: IMenuItem[] = [
  {
    id: 1,
    name: "Product",
    path: "/product",
    iconify: "icon-park-outline:ad-product",
  },
  {
    id: 2,
    name: "Category",
    path: "/category",
    iconify: "carbon:category-new",
  },

  {
    id: 3,
    name: "Profile",
    path: "/profile",
    iconify: "iconamoon:profile-fill",
  },
  {
    id: 4,
    name: "Logout",
    path: "/login",
    iconify: "humbleicons:logout",
  },
];

export const navigationData = {
  shopManager,
  purchaseManager,
  procurementManager,
  allocationManager,
};
