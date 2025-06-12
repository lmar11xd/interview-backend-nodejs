import { Customer } from '../domain/Customer';

export interface CustomersRepository {
  findByFilter(customer: Customer): Promise<Customer[]>;
  findByFilterLastname(customer: Customer): Promise<Customer[]>;
  findByFilterNameLastname(customer: Customer): Promise<Customer[]>;
}
