import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { HttpClient } from '@angular/common/http';
import { BookService } from '../../services/book.service';
import { CommonModule } from '@angular/common';
import { log } from 'console';
import { RouterModule } from '@angular/router';
import { COVER_PLACEHOLDER } from '../../Constants/cover';

@Component({
  selector: 'app-homepage',
  standalone: true,
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
  imports: [NavbarComponent, CommonModule, RouterModule],
})
export class HomepageComponent {
  readonly coverPlaceholder = COVER_PLACEHOLDER;
  quote: string = '';
  author: string = '';
  books: any[] = [];
  filteredBooks: any[] = [];
  allBooks: any[] = [];
  recommendedBooks: any[] = [];
  randomBook: any;
  constructor(private http: HttpClient, private bookService: BookService) {}

  ngOnInit(): void {
    this.fetchQuote();
    this.fetchRecommendedBooks();
    this.bookService.getBooks().subscribe(
      (data) => {
        this.books = data;
        this.getRandomBook();
      },
      (error) => {
        console.error('Error fetching books:', error);
      }
    );
  
  }

  fetchQuote() {
    this.http.get<any>('https://api.quotable.io/random').subscribe(
      (response) => {
        this.quote = response.content;
        this.author = response.author;
        console.log("Quote:",this.quote);
        
      },
      (error) => {
        console.error('Error fetching quote:', error);
      }
    );
  }

  generateRatingArray(averageRating: number): number[] {
    const ratingArray = [];
    for (let i = 0; i < averageRating; i++) {
      ratingArray.push(1);
    }
    const totalStars = ratingArray.length;
    for (let i = totalStars; i < averageRating; i++) {
      ratingArray.push(0);
    }
    return ratingArray;
  }

  fetchRecommendedBooks(): void {
    const authToken = localStorage.getItem('token');
    if (authToken) {
      this.http
        .get<any>('http://localhost:3000/api/users/me', {
          headers: { Authorization: `${authToken}` },
        })
        .subscribe((userData) => {
          const userId = userData._id;
          this.bookService.getSimilarBooks(userId).subscribe(
            (books) => {
              this.recommendedBooks = books;
            },
            (error) => {
              console.error('Error fetching recommended books:', error);
            }
          );
        });
    } else {
      console.error('Authentication token not found');
    }
  }
  getRandomBook(): any {
    const randomIndex = Math.floor(Math.random() * this.books.length);
    this.randomBook = this.books[randomIndex]
    console.log(this.randomBook);
    
    
  
   
  }
}
