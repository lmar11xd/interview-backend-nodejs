import { Customer } from '../domain/Customer';

export interface CustomersService {
  findByFilter(customer: Customer): Promise<Customer[]>;
  findByFilterLastname(customer: Customer): Promise<Customer[]>;
  findByFilterNameLastname(customer: Customer): Promise<Customer[]>;
}
