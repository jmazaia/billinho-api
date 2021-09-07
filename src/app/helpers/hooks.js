import moment from 'moment';
import Bill from '../models/Bill';

const createBills = async instance => {
  const { installments, due_day, amount } = instance;

  const now = moment();

  const billAmount = amount / installments;

  const dueDate = moment({ day: due_day });

  const firstPayment = dueDate <= now ? dueDate.add(1, 'month') : dueDate;

  const bills = [];

  for (let i = 0; i < installments; i += 1) {
    bills[i] = {
      amount: billAmount,
      enrollment_id: instance.id,
      due_date: firstPayment.clone().add(i, 'month'),
    };
  }
  await Bill.bulkCreate(bills);
};

export default createBills;
