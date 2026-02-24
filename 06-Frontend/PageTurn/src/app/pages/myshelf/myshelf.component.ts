import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { BookService } from '../../services/book.service';
import { RouterModule } from '@angular/router';
import { COVER_PLACEHOLDER } from '../../Constants/cover';

@Component({
  selector: 'app-myshelf',
  standalone: true,
  templateUrl: './myshelf.component.html',
  styleUrl: './myshelf.component.css',
  imports: [NavbarComponent, CommonModule, RouterModule],
})
export class MyshelfComponent {
  readonly coverPlaceholder = COVER_PLACEHOLDER;
  userData: any;

  wantToReadBooks: any[] = [];
  readBooks: any[] = [];
  currentlyReadingBooks: any[] = [];

  constructor(
    private authService: AuthService,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    this.fetchUserData();
  }

  fetchUserData(): void {
    const token = this.authService.getToken();
    if (typeof token === 'string') {
      console.log('Fetching user data...');
      this.authService.getUserDetails(token).subscribe(
        (data) => {
          console.log('User data fetched successfully:', data);
          this.userData = data;
          this.loadBooks();
        },
        (error) => {
          console.error('Error fetching user data:', error);
        }
      );
    } else {
      console.error('Token is not a string.');
    }
  }

  loadBooks(): void {
    console.log('Loading books...');
    this.loadCurrentlyReadingBooks();
    this.loadWantToReadBooks();
    this.loadReadBooks();
  }

  loadCurrentlyReadingBooks(): void {
    const token = this.authService.getToken();
    if (typeof token === 'string') {
      if (this.userData && this.userData.currentlyReading) {
        console.log('Loading currently reading books...');
        this.userData.currentlyReading.forEach((bookId: string) => {
          this.bookService.getBookById(bookId, token).subscribe(
            (book) => {
              console.log('Currently reading book loaded:', book);
              this.currentlyReadingBooks.push(book);
            },
            (error) => {
              console.error('Error fetching currently reading book:', error);
            }
          );
        });
      } else {
        console.log('No currently reading books found.');
      }
    } else {
      console.error('Token is not a string.');
    }
  }

  loadWantToReadBooks(): void {
    const token = this.authService.getToken();
    if (typeof token === 'string') {
      if (this.userData && this.userData.wantToRead) {
        console.log('Loading want to read books...');
        this.userData.wantToRead.forEach((bookId: string) => {
          this.bookService.getBookById(bookId, token).subscribe(
            (book) => {
              console.log('Want to read book loaded:', book);
              this.wantToReadBooks.push(book);
            },
            (error) => {
              console.error('Error fetching want to read book:', error);
            }
          );
        });
      } else {
        console.log('No want to read books found.');
      }
    } else {
      console.error('Token is not a string.');
    }
  }

  loadReadBooks(): void {
    const token = this.authService.getToken();
    if (typeof token === 'string') {
      if (this.userData && this.userData.read) {
        console.log('Loading read books...');
        this.userData.read.forEach((bookId: string) => {
          this.bookService.getBookById(bookId, token).subscribe(
            (book) => {
              console.log('Read book loaded:', book);
              this.readBooks.push(book);
            },
            (error) => {
              console.error('Error fetching read book:', error);
            }
          );
        });
      } else {
        console.log('No read books found.');
      }
    } else {
      console.error('Token is not a string.');
    }
  }
}
