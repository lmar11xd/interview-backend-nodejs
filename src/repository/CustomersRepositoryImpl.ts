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

export class CustomersRepositoryImpl implements CustomersRepository {
  // https://randomuser.me/api/?results=100&gender=male
  async findByFilter(customer: Customer): Promise<Customer[]> {
    const result = await axios.get('https://randomuser.me/api/?results=100');
    if (!result.data.results) {
      return [];
    }

    return result.data.results
      .filter((item: RandomUser) =>
        item.name.first.toLowerCase().startsWith(customer.name.toLowerCase())
      )
      .map(
        (item: RandomUser) =>
          new Customer({
            id: item.id.value,
            name: item.name.first,
            lastName: item.name.last,
          })
      );
  }

  async findByFilterLastname(customer: Customer): Promise<Customer[]> {
    const result = await axios.get('https://randomuser.me/api/?results=100');
    if (!result.data.results) {
      return [];
    }

    return result.data.results
      .filter((item: RandomUser) =>
        item.name.last.toLowerCase().startsWith(customer.lastName.toLowerCase())
      )
      .map(
        (item: RandomUser) =>
          new Customer({
            id: item.id.value,
            name: item.name.first,
            lastName: item.name.last,
          })
      );
  }

  async findByFilterNameLastname(customer: Customer): Promise<Customer[]> {
    const result = await axios.get('https://randomuser.me/api/?results=100');
    if (!result.data.results) {
      return [];
    }

    return result.data.results
      .filter(
        (item: RandomUser) =>
          item.name.first
            .toLowerCase()
            .startsWith(customer.name.toLowerCase()) &&
          item.name.last
            .toLowerCase()
            .startsWith(customer.lastName.toLowerCase())
      )
      .map(
        (item: RandomUser) =>
          new Customer({
            id: item.id.value,
            name: item.name.first,
            lastName: item.name.last,
          })
      );
  }

  async findByFilterByGender(customer: Customer): Promise<Customer[]> {
    const result = await axios.get(
      `https://randomuser.me/api/?results=100&gender=${customer.gender}`
    );

    if (!result.data.results) {
      return [];
    }

    return result.data.results.map(
      (item: RandomUser) =>
        new Customer({
          id: item.id.value,
          name: item.name.first,
          lastName: item.name.last,
        })
    );
  }
}
