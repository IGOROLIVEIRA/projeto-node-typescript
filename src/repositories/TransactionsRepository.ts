import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateAppointent {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const outcome = this.transactions.reduce((acumulator: number, current) => {
      if (current.type === 'outcome') return acumulator + current.value;
      return acumulator;
    }, 0);
    const income = this.transactions.reduce((acumulator: number, current) => {
      if (current.type === 'income') return acumulator + current.value;
      return acumulator;
    }, 0);
    const balance = {
      income,
      outcome,
      total: income - outcome,
    };
    return balance;
  }

  public create({ title, value, type }: CreateAppointent): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
