import { APIGatewayProxyEvent } from 'aws-lambda';
import { CustomersService } from '../service/CustomersService';
import { Customer } from '../domain/Customer';

export class CustomersController {
  constructor(private service: CustomersService) {}

  async findByFilter(event: APIGatewayProxyEvent) {
    if (!event.queryStringParameters?.name) {
      return this.apiResponseBadRequestError();
    }
    const { name } = event.queryStringParameters;

    const lastName = '';

    if (name && lastName) {
      return this.apiResponseOk(
        await this.service.findByFilterNameLastname(
          new Customer({ name, lastName })
        )
      );
    }

    if (lastName) {
      return this.apiResponseOk(
        await this.service.findByFilterLastname(new Customer({ lastName }))
      );
    }

    return this.apiResponseOk(
      await this.service.findByFilter(new Customer({ name }))
    );
  }

  apiResponseBadRequestError() {
    return {
      statusCode: 400,
      isBase64Encoded: false,
    };
  }

  apiResponseOk(customers: Customer[]) {
    return {
      statusCode: 200,
      isBase64Encoded: false,
      body: JSON.stringify(customers),
    };
  }
}
