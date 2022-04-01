import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { IPost } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private _posts: BehaviorSubject<IPost[]> = new BehaviorSubject<IPost[]>([]);
  private _selectedPostIndex: BehaviorSubject<number> = new BehaviorSubject<number>(-1);

  constructor(private httpClient: HttpClient) { }

  fetchData() {
    this.httpClient.get<IPost[]>('https://s3-ap-southeast-1.amazonaws.com/he-public-data/instaf913f18.json')
    .pipe(map(data => {
      return data.sort(this.sortOnLikes);
    }))
    .subscribe(data => this.addPosts(data));
  }

  likePost(post: IPost) {
    const likedPosts = this._posts.value as IPost[];
    var foundIndex = likedPosts.findIndex(x => x === post);
    likedPosts[foundIndex] = {
      ...post,
      likes: post.likes + 1,
      liked: true
    }
    this.addPosts(likedPosts);
  }

  unLikePost(post: IPost) {
    const likedPosts = this._posts.value as IPost[];
    var foundIndex = likedPosts.findIndex(x => x === post);
    likedPosts[foundIndex] = {
      ...post,
      likes: post.likes - 1,
      liked: false
    }
    this.addPosts(likedPosts);
  }

  addPosts(posts: IPost[]) {
    this._posts.next(posts);
  }

  get posts(): Observable<IPost[]> {
    return this._posts.asObservable();
  }

  selectPost(postIndex: number) {
    this._selectedPostIndex.next(postIndex);
  }

  get selectedPost(): IPost {
    return this._posts.value[this._selectedPostIndex.value];
  }


  private sortOnLikes( a: IPost, b: IPost ) {
    if ( a.likes > b.likes ){
      return -1;
    }
    if ( a.likes < b.likes ){
      return 1;
    }
    return 0;
  }

}
