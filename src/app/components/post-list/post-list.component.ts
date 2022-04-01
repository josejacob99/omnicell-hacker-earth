import { Component, OnInit } from '@angular/core';
import { IPost } from 'src/app/core/interfaces';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  posts: IPost[] = [];

  constructor(public dataService: DataService) { }

  ngOnInit() {
    this.dataService.fetchData();
  }

  likePost(post: IPost) {
    this.dataService.likePost(post);
  }

  unLikePost(post: IPost) {
   this.dataService.unLikePost(post);
  }

  selectPost(index: number) {
    this.dataService.selectPost(index);
  }
}
