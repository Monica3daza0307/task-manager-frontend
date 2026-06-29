import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

import { PublicApiService } from '../../services/public-api';

@Component({
  selector: 'app-public-api',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule
  ],
  templateUrl: './public-api.html',
  styleUrl: './public-api.scss'
})
export class PublicApiComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    'title'
  ];

  posts: any[] = [];

  constructor(private publicApiService: PublicApiService) {}

  ngOnInit(): void {
    this.publicApiService.getPosts().subscribe({
      next: (data) => {
        this.posts = data.slice(0, 10);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

}