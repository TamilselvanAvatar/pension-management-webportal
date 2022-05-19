interface Pensioner {
  name: string;
  aadhaar: number;
  dob: string;
  salaryEarned: number;
  allowances: number;
  typeofPension: string;
  bankDetail: {
    name: string;
    accountNumber: number;
    bankType: string;
  };
  pan: string;
}

export class GlobalComponent {
  public static token: string = '';
  public static pensioner: Pensioner ;
}
