export const navLinks = [
  {
    route: '/',
    label: 'Home',
  },
  {
    route: '/services',
    label: 'Services',
  },
  {
    route: '/contact',
    label: 'Contact',
  },
  {
    route: '/blog',
    label: 'Blog',
  },
  {
    route: '/about',
    label: 'About',
  },
  {
    route: '/portfolio',
    label: 'Portfolio',
  },
];

export const sidebarLinks = [
  {
    header: '',
    children: [
      {
        imgURL: '/assets/dashboard/image/switch.png',
        route: '/dashboard/organization',
        label: 'Switch Organization',
        chevron: '/assets/dashboard/chevrondown.svg',
      },
      {
        imgURL: '/assets/dashboard/image/dashboard.png',
        route: '/dashboard/dashboard',
        label: 'Dashboard',
      },
    ],
  },
  {
    header: 'Customers',
    children: [
      {
        imgURL: '/assets/dashboard/image/users.png',
        route: '/dashboard/users',
        label: 'Users',
      },
      {
        imgURL: '/assets/dashboard/image/guarantors.png',
        route: '/dashboard/gurantors',
        label: 'Guarantors',
      },
      {
        imgURL: '/assets/dashboard/image/sack 1.png',
        route: '/dashboard/loans',
        label: 'Loans',
      },
      {
        imgURL: '/assets/dashboard/image/decision.png',
        route: '/dashboard/decision',
        label: 'Decision Models',
      },
      {
        imgURL: '/assets/dashboard/image/savings.png',
        route: '/dashboard/savings',
        label: 'Savings',
      },
      {
        imgURL: '/assets/dashboard/image/loan.png',
        route: '/dashboard/loan-request',
        label: 'Loan Requests',
      },
      {
        imgURL: '/assets/dashboard/image/whitelist.png',
        route: '/dashboard/whitelist',
        label: 'Whitelist',
      },
      {
        imgURL: '/assets/dashboard/image/karma.png',
        route: '/dashboard/karma',
        label: 'Karma',
      },
    ],
  },
  {
    header: 'Business',
    children: [
      {
        imgURL: '/assets/dashboard/image/loan.png',
        route: '/dashboard/loan-products',
        label: 'Loan Products',
      },
      {
        imgURL: '/assets/dashboard/image/bank.png',
        route: '/dashboard/saving-products',
        label: 'Saving Products',
      },
      {
        imgURL: '/assets/dashboard/image/coins.png',
        route: '/dashboard/fees',
        label: 'Fees and Charges',
      },
      {
        imgURL: '/assets/dashboard/image/transactions.png',
        route: '/dashboard/transactions',
        label: 'Transactions',
      },
      {
        imgURL: '/assets/dashboard/image/services.png',
        route: '/dashboard/services',
        label: 'Services',
      },
      {
        imgURL: '/assets/dashboard/image/service account.png',
        route: '/dashboard/service-account',
        label: 'Service Account',
      },
      {
        imgURL: '/assets/dashboard/image/settlements.png',
        route: '/dashboard/settlements',
        label: 'Settlements',
      },
      {
        imgURL: '/assets/dashboard/image/reports.png',
        route: '/dashboard/reports',
        label: 'Reports',
      },
    ],
  },
  {
    header: 'Business',
    children: [
      {
        imgURL: '/assets/dashboard/image/preferences.png',
        route: '/dashboard/preferences',
        label: 'Preferences',
      },
      {
        imgURL: '/assets/dashboard/image/fees.png',
        route: '/dashboard/fees-pricing',
        label: 'Fees and Pricing',
      },
      {
        imgURL: '/assets/dashboard/image/clipboard-list 1.png',
        route: '/dashboard/fees-charge',
        label: 'Fees and Charges',
      },
    ],
  },
];

export const usersInfoCardDetails = [
  {
    imgURL: '/assets/dashboard/image/users (card).png',
    title: 'Users',
    total: 2453,
  },
  {
    imgURL: '/assets/dashboard/image/active users (card).png',
    title: 'Active users',
    total: 2453,
  },
  {
    imgURL: '/assets/dashboard/image/users with loans (card).png',
    title: 'Users with loans',
    total: 12453,
  },
  {
    imgURL: '/assets/dashboard/image/users with savings (card).png',
    title: 'Users with savings',
    total: 102453,
  },
];
