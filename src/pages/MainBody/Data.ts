export interface IMenuItem {
  id: number;
  name: string;
  iconify: string;
  path?: string;
  list?: IMenuItem[];
}

export const shopManager: IMenuItem[] = [
  {
    id: 2,
    name: "Place Order",
    iconify: "lets-icons:order-light",
    list: [
      {
        id: 1,
        name: "View Order",
        iconify: "lets-icons:view-light",
        path: "/shopmanager/view",
      },
      {
        id: 2,
        name: "Add Order",
        iconify: "mingcute:add-fill",
        path: "/shopmanager/add",
      },
    ],
  },
];

export const purchaseManager: IMenuItem[] = [
  {
    id: 2,
    name: "Buy Order",
    path: "/buy-order",
    iconify: "lets-icons:order-light",
  },
];

export const procurementManager: IMenuItem[] = [
  {
    id: 2,
    name: "Check Order",
    path: "/check-order",
    iconify: "lets-icons:order-light",
  },
];

export const allocationManager: IMenuItem[] = [
  {
    id: 2,
    name: "Confirm Order",
    path: "/Confirm-order",
    iconify: "lets-icons:order-light",
  },
];

export const isAllNav: IMenuItem[] = [
  {
    id: 3,
    name: "Profile",
    path: "/profile",
    iconify: "iconamoon:profile-fill",
  },
];

export const navigationData = {
  shopManager,
  purchaseManager,
  procurementManager,
  allocationManager,
};
