export class Consults {
    pages: number;
    loans: Loan[];
}

export class Loan {
    id: string;
    client: string;
    name: string;
    borrowedValue: number;
    paidValue: string;
    pendingValue: string;
    interestPaid: string;
    idStatus: string;
    status: string;
}

export class Search {
    fullname: string;
}