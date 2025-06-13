import axios from 'axios';
import { CustomersRepository } from './CustomersRepository';
import { Customer } from '../domain/Customer';

type RandomUser = {
  id: {
    value: string;
  };
  name: {
    first: string;

    last: string;
  };
};

type Pagination = {
  page: number;
  gender: string;
};

type Response = {
  page: number;
  total: number;
  data: Customer[];
};

const mapToCustomer = (user: RandomUser): Customer =>
  new Customer({
    id: user.id?.value ?? '',
    name: user.name?.first ?? '',
    lastName: user.name?.last ?? '',
  });

export class CustomersRepositoryImpl implements CustomersRepository {
  async findByFilter(customer: Customer): Promise<Customer[]> {
    const { data } = await axios.get('https://randomuser.me/api/?results=100');

    const users: RandomUser[] = data?.results ?? [];

    const nameFilter = customer.name?.toLowerCase() ?? '';
    const lastNameFilter = customer.lastName?.toLowerCase() ?? '';

    const filtered = users.filter((user) => {
      const firstName = user.name?.first.toLowerCase() ?? '';
      const lastName = user.name?.last.toLowerCase() ?? '';

      if (firstName && lastName) {
        return (
          firstName.startsWith(nameFilter) &&
          lastName.startsWith(lastNameFilter)
        );
      }

      if (lastNameFilter) {
        return lastName.startsWith(lastNameFilter);
      }

      if (nameFilter) {
        return firstName.startsWith(nameFilter);
      }

      return true;
    });

    return filtered.map(mapToCustomer);
  }

  async findByFilterGender(pagination: Pagination): Promise<Response> {
    const { data } = await axios.get(
      `https://randomuser.me/api/?page=${pagination.page}&results=10&gender=${pagination.gender}`
    );

    const users: RandomUser[] = data?.results ?? [];
    const customers = users.map(mapToCustomer);

    return {
      page: pagination.page,
      total: customers.length,
      data: customers,
    };
  }
}
