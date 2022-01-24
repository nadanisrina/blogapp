import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
  Logger,
} from '@nestjs/common';
import { PostModel } from 'src/posts.interface';

@Injectable()
export class PostsService {
  private posts: Array<PostModel> = [];
  private readonly logger = new Logger();

  public findAll(): Array<PostModel> {
    this.logger.log('Returning all posts');
    return this.posts;
  }

  public findOne(id): PostModel {
    const post: PostModel = this.posts.find((post) => post.id === id);
    if (post) {
      throw new NotFoundException('Post not found.');
    }
    return post;
  }

  public create(post: PostModel): PostModel {
    //find exist title
    const titleExists: boolean = this.posts.some(
      (item) => item.title === post.title,
    );
    if (titleExists)
      throw new UnprocessableEntityException('Post title already exists.');

    //find the next id for new blog
    let arrId = this.posts.map((post) => post.id);
    let maxId: number = Math.max(...arrId);

    const id: number = arrId.length === 0 ? 1 : maxId + 1;

    const blogPost: PostModel = {
      ...post,
      id: id,
    };

    this.posts.push(blogPost);

    return blogPost;
  }

  public delete(id: number): PostModel[] {
    //find id
    const postId = this.posts.findIndex((item) => item.id === id);

    //delete post
    this.posts.splice(postId, 1);

    return this.posts;
  }

  public update(id: number, post: PostModel): PostModel {
    const postId = this.posts.findIndex((item) => item.id === id);

    const blogPost = {
      ...post,
      id: id,
    };

    this.posts[postId] = blogPost;
    return blogPost;
  }
}
