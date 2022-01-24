import { Controller, Param, ParseIntPipe, Body } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Get, Post, Delete, Put } from '@nestjs/common';
import { PostModel } from 'src/posts.interface';
import {
  ApiTags,
  ApiResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import {
  ApiCreatedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger'; //for create

@Controller('posts')
@ApiTags('posts')
//indicate that this set of endpoints belongs to the posts feature model.
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  //get all posts  with method findall from service
  @Get()
  @ApiOkResponse({ description: 'Posts Retrieve Successfully' })
  @ApiNotFoundResponse({ description: 'Post Not Found' })
  public findAll(): Array<PostModel> {
    return this.postsService.findAll();
  }
  @Get(':id')
  public findOne(@Param('id', ParseIntPipe) id: number): PostModel {
    return this.postsService.findOne(id);
  }
  @Post()
  @ApiCreatedResponse({ description: 'Post Created Successfully' })
  @ApiUnprocessableEntityResponse({ description: 'Post title already exist.' }) // 422 UNPROCESSABLE ENTITY
  public create(@Body() post: PostModel): PostModel {
    return this.postsService.create(post);
  }
  @Delete(':id')
  @ApiOkResponse({ description: 'Post Deleted Successfully' })
  @ApiNotFoundResponse({ description: 'Post id Not Found' })
  public delete(@Param('id', ParseIntPipe) id: number): PostModel[] {
    return this.postsService.delete(id);
  }
  @Put(':id')
  @ApiOkResponse({ description: 'Post Updated Successfully' })
  @ApiNotFoundResponse({ description: 'Post id Not Found' })
  @ApiUnprocessableEntityResponse({ description: 'Post title already exist.' }) // 422 UNPROCESSABLE ENTITY
  public update(
    @Param('id', ParseIntPipe) id: number,
    @Body() post: PostModel,
  ): PostModel {
    return this.postsService.update(id, post);
  }
}
