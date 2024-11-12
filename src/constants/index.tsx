// import test from '/assets/dashboard/image/test.png';
import switchImage from '/assets/dashboard/image/switch.png';
import users from '/assets/dashboard/image/users.png';
import dashboard from '/assets/dashboard/image/dashboard.png';
import guarantors from '/assets/dashboard/image/guarantors.png';
import loans from '/assets/dashboard/image/sack_1.png';
import savings from '/assets/dashboard/image/savings.png';
import fees from '/assets/dashboard/image/fees.png';
import decision from '/assets/dashboard/image/decision.png';
import loan from '/assets/dashboard/image/loan.png';
import whitelist from '/assets/dashboard/image/whitelist.png';
import karma from '/assets/dashboard/image/karma.png';
import bank from '/assets/dashboard/image/bank.png';
import coins from '/assets/dashboard/image/coins.png';
import transaction from '/assets/dashboard/image/transactions.png';
import services from '/assets/dashboard/image/services.png';
import account from '/assets/dashboard/image/service account.png';
import settlements from '/assets/dashboard/image/settlements.png';
import reports from '/assets/dashboard/image/reports.png';
import preferences from '/assets/dashboard/image/preferences.png';
import clipboardList from '/assets/dashboard/image/clipboard-list.png';
import usersCard from '/assets/dashboard/image/users_card.png';
import activeUsers from '/assets/dashboard/image/active_users_card.png';
import usersLoan from '/assets/dashboard/image/users_with_loans_card.png'; // Renamed
import usersSavings from '/assets/dashboard/image/users_with_savings_card.png'; // Renamed

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
        imgURL: switchImage,
        route: '/dashboard/organization',
        label: 'Switch Organization',
        chevron: '/assets/dashboard/chevrondown.svg',
      },
      {
        imgURL: dashboard,
        route: '/dashboard/dashboard',
        label: 'Dashboard',
      },
    ],
  },
  {
    header: 'Customers',
    children: [
      {
        imgURL: users,
        route: '/dashboard/users',
        label: 'Users',
      },
      {
        imgURL: guarantors,
        route: '/dashboard/gurantors',
        label: 'Guarantors',
      },
      {
        imgURL: loans,
        route: '/dashboard/loans',
        label: 'Loans',
      },
      {
        imgURL: decision,
        route: '/dashboard/decision',
        label: 'Decision Models',
      },
      {
        imgURL: savings,
        route: '/dashboard/savings',
        label: 'Savings',
      },
      {
        imgURL: loan,
        route: '/dashboard/loan-request',
        label: 'Loan Requests',
      },
      {
        imgURL: whitelist,
        route: '/dashboard/whitelist',
        label: 'Whitelist',
      },
      {
        imgURL: karma,
        route: '/dashboard/karma',
        label: 'Karma',
      },
    ],
  },
  {
    header: 'Business',
    children: [
      {
        imgURL: loan,
        route: '/dashboard/loan-products',
        label: 'Loan Products',
      },
      {
        imgURL: bank,
        route: '/dashboard/saving-products',
        label: 'Saving Products',
      },
      {
        imgURL: coins,
        route: '/dashboard/fees',
        label: 'Fees and Charges',
      },
      {
        imgURL: transaction,
        route: '/dashboard/transactions',
        label: 'Transactions',
      },
      {
        imgURL: services,
        route: '/dashboard/services',
        label: 'Services',
      },
      {
        imgURL: account,
        route: '/dashboard/service-account',
        label: 'Service Account',
      },
      {
        imgURL: settlements,
        route: '/dashboard/settlements',
        label: 'Settlements',
      },
      {
        imgURL: reports,
        route: '/dashboard/reports',
        label: 'Reports',
      },
    ],
  },
  {
    header: 'Business',
    children: [
      {
        imgURL: preferences,
        route: '/dashboard/preferences',
        label: 'Preferences',
      },
      {
        imgURL: fees,
        route: '/dashboard/fees-pricing',
        label: 'Fees and Pricing',
      },
      {
        imgURL: clipboardList,
        route: '/dashboard/fees-charge',
        label: 'Fees and Charges',
      },
    ],
  },
];

export const usersInfoCardDetails = [
  {
    imgURL: usersCard,
    title: 'Users',
    total: 2453,
  },
  {
    imgURL: activeUsers,
    title: 'Active users',
    total: 2453,
  },
  {
    imgURL: usersLoan,
    title: 'Users with loans',
    total: 12453,
  },
  {
    imgURL: usersSavings,
    title: 'Users with savings',
    total: 102453,
  },
];
