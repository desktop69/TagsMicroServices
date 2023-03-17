  /* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions,Transport    } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {


  
  // microservice #1
  const microserviceTcp = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule,{
    transport: Transport.TCP,
    options: {
      
      host: '0.0.0.0',
      port: 3004,
    },
  });
  await microserviceTcp.listen();
}
bootstrap();
