import { Users, Roles } from '@casper-api/api-interfaces';

const users: Users = [
  {
    role: Roles.Buyer,
    activePublicKey:
      '012a26ca82bdeff340e7792fcb4df54ccb18adfe3a33811996b6343ad0af056b36',
  },
  {
    role: Roles.Escrow,
    activePublicKey:
      '01a6d9e117ddbf442cb5c9118e90db0a3d9c2fd91a5a28c2b55e9c5bf24893fe9e',
  },
  {
    role: Roles.Postman,
    activePublicKey:
      '0184332ebac05f9f3b03166e45923218b9f10328f376813914dfa8310788ef81d9',
  },
  {
    role: Roles.Seller,
    activePublicKey:
      '01d535ea6095790c8439c075f8af4079a23e97e59a5aed59d902e04bf5e691fe09',
  },
];

export const environment = { production: false, users };
