import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TagsModule } from './tags/tags.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TagsController } from './tags/tags.controller';


@Module({
  imports: [ ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DB_URI),
    TagsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}