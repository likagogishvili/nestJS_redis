import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SendEmailService } from './send-email.service';
import { CreateSendEmailDto } from './dto/create-send-email.dto';

@Controller()
export class SendEmailController {
  constructor(private readonly sendEmailService: SendEmailService) {}

  @MessagePattern('createSendEmail')
  create(@Payload() dto: CreateSendEmailDto) {
    return this.sendEmailService.create(dto);
  }

  @MessagePattern('createCustomer')
  async handleCreateCustomer(@Payload() customer: any) {
    const data = customer.data;

    const email: CreateSendEmailDto = {
      to: `${data.name.toLowerCase()}@example.com`,
      subject: `Welcome to our platform, ${data.name}!`,
      body: `Hello ${data.name},\n\nThanks for joining us!\n\nBest,\nTeam`,
      customerId: data.id,
    };

    return this.sendEmailService.create(email);
  }
}
