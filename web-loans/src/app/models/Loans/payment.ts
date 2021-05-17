export class Payment {
    idLoan: number;
    idType: number;
    capital: number;
    interest: number;
}

export class Payments {
    id: number;
    capital: number;
    interest: number;
    balance: number;
    paymentDate: string;
    idType: number;
    type: string;
}