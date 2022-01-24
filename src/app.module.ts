import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [PostsModule], //import in app module so PostModule can be imported outside app module
  // automatically imported when text nest generate module post
  // single instance of a service is shared across our entire application
})
export class AppModule {}
