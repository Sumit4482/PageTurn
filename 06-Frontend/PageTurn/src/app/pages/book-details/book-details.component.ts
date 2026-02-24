import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/register.service';
import { ReviewService } from '../../services/review.service';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { COVER_PLACEHOLDER } from '../../Constants/cover';

@Component({
  selector: 'app-book-details',
  standalone: true,
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css',
  imports: [NavbarComponent, CommonModule, FormsModule],
})
export class BookDetailsComponent {
  readonly coverPlaceholder = COVER_PLACEHOLDER;
  bookId!: string;
  bookDetails: any;
  token!: string;
  newReview: any = { rating: 1, content: '' };
  reviews: any[] = [];
  userId!: string;
  userReviewId: string | undefined;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService,
    private authService: AuthService,
    private userService: UserService,
    private reviewService: ReviewService,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.bookId = this.route.snapshot.params['id'];
    this.token = this.authService.getToken()!;
    if (!this.token) {
      this.router.navigate(['/login']);
    } else {
      this.getBookDetails();
      this.getReviews();
    }

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0); 
    });
  }

  getBookDetails(): void {
    this.bookService.getBookById(this.bookId, this.token).subscribe(
      (response) => {
        this.bookDetails = response;
      },
      (error) => {
        console.error('Error fetching book details:', error);
      }
    );
  }

  getReviews(): void {
    this.bookService.getBookReviews(this.bookId).subscribe(
      (response) => {
        this.reviews = response;
        this.fetchUsernamesForReviewsAndComments();
      },
      (error) => {
        console.error('Error fetching reviews:', error);
        // Handle error
      }
    );
  }

  generateRatingArray(rating: number): number[] {
    const result = [];
    const whole = Math.floor(rating);
    const remainder = rating - whole;
    for (let i = 0; i < whole; i++) {
      result.push(1);
    }
    if (remainder >= 0.5) {
      result.push(0.5);
    }
    return result;
  }

  addToCurrentlyReading(): void {
    this.userService.addToCurrentlyReading(this.bookId, this.token).subscribe(
      () => {
        console.log('Added to Currently Reading');
        this.showSnackbar('Added to Currently Reading');
        
      },
      (error) => {
        console.error('Error adding to Currently Reading:', error);
      }
    );
  }

  addToWantToRead(): void {
    this.userService.addToWantToRead(this.bookId, this.token).subscribe(
      () => {
        // Handle success
        console.log('Added to Want to Read');
        this.showSnackbar('Added to Want to Read');
      },
      (error) => {
        console.error('Error adding to Want to Read:', error);
      }
    );
  }

  addToRead(): void {
    this.userService.addToRead(this.bookId, this.token).subscribe(
      () => {
        // Handle success
        console.log('Added to Read');
        this.showSnackbar('Added to Read');
      },
      (error) => {
        console.error('Error adding to Read:', error);
      }
    );
  }

  submitReview(
    star1: HTMLInputElement,
    star2: HTMLInputElement,
    star3: HTMLInputElement,
    star4: HTMLInputElement,
    star5: HTMLInputElement,
    review: string
  ): void {
    let rating: string;
    if (star1.checked) rating = star1.value;
    else if (star2.checked) rating = star2.value;
    else if (star3.checked) rating = star3.value;
    else if (star4.checked) rating = star4.value;
    else if (star5.checked) rating = star5.value;
    else {
      console.error('No rating selected');
      return;
    }
    this.postReview(this.bookId, rating, review);

    review ='';
    star1.checked = false;
    star2.checked = false;
    star3.checked = false;
    star4.checked = false;
    star5.checked = false;
  }

  postReview(bookId: string, rating: string, content: string) {
    this.reviewService.postReview(bookId, rating, content).subscribe(
      () => {
        console.log('Review posted successfully');
        this.getReviews();
        this.ngOnInit();
        // Optionally, you can handle success response here
      },
      (error) => {
        console.error('Error posting review:', error);
        // Optionally, you can handle error response here
      }
    );
  }
  fetchUsernamesForReviewsAndComments(): void {
    // Iterate over each review
    for (let review of this.reviews) {
      // Fetch username for the review's user ID
      this.userService.getUserById(review.user).subscribe(
        (user) => {
          review.username = user.username;
        },
        (error) => {
          console.error('Error fetching user:', error);
        }
      );

      // Iterate over each comment in the review
      for (let comment of review.comments) {
        // Fetch username for the comment's user ID
        this.userService.getUserById(comment.user).subscribe(
          (user) => {
            comment.username = user.username;
          },
          (error) => {
            console.error('Error fetching user:', error);
          }
        );
      }
    }
  }

  toggleCommentBox(review: any): void {
    review.showCommentBox = !review.showCommentBox; 
    review.newComment =''; 
  }

  postComment(review: any): void {
    this.reviewService
      .addCommentToReview(
        review._id,
        review.userId,
        review.newComment,
        this.token
      )
      .subscribe(
        (response) => {
          console.log('Comment posted successfully:', response);
          this.ngOnInit();
          review.showCommentBox = false;
        },
        (error) => {
          // Handle error
          console.error('Error posting comment:', error);
        }
      );
  }
  likeReview(review: any): void {
    review.likes = review.likes ? review.likes + 1 : 1;
    this.reviewService.likeReview(review._id, this.token).subscribe(
      (response) => {
        // Handle success
        console.log('Review liked successfully:', response);
        this.ngOnInit();
      },
      (error) => {
        // Handle error
        console.error('Error liking review:', error);
      }
    );
  }
  toggleComments(review: any) {
    review.showComments = !review.showComments;
  }
  unlikeReview(review: any): void {
    const authToken = localStorage.getItem('token');
    if (authToken) {
      this.http
        .get<any>('http://localhost:3000/api/users/me', {
          headers: { Authorization: `${authToken}` },
        })
        .subscribe((userData) => {
          this.userId = userData._id; // Replace with the actual user ID
          console.log('User data:', this.userId);
        });
    }

    this.reviewService.unlikeReview(review._id, this.token).subscribe(
      (response) => {
        // Handle success
        console.log('Review unliked successfully:', response);
        this.ngOnInit(); // Refresh data after unliking review
      },
      (error) => {
        // Handle error
        console.error('Error unliking review:', error);
      }
    );
  }

  checkUserReview(): void {
    const authToken = localStorage.getItem('token');
  
    if (authToken) {
      this.http
        .get<any>('http://localhost:3000/api/users/me', {
          headers: { Authorization: `${authToken}` },
        })
        .subscribe(
          (userData) => {
            this.userId = userData._id;
            console.log("Logged-in User ID:", this.userId);
            console.log("Reviews:", this.reviews);
  
            const userReview = this.reviews.find(
              (review) => review.user === this.userId
            );
  
            console.log("User Review:", userReview);
  
            if (userReview) {
              this.userReviewId = userReview._id;
              console.log("User Review ID:", this.userReviewId);
              this.deleteReview();
            } else {
              console.log("User has not reviewed this book.");
            }
          },
          (error) => {
            console.error('Error fetching user data:', error);
          }
        );
    } else {
      console.error('Authentication token not found');
    }
  }
  
  deleteReview(): void {
    if (this.userReviewId) {
      this.bookService.deleteReview(this.userReviewId).subscribe(
        () => {
          console.log('Review deleted successfully');
          
          this.ngOnInit();
        },
        (error) => {
          console.error('Error deleting review:', error);
        }
      );
    } else {
      console.error('User review ID not found');
    }
  }
  
  recalculateAverageRating(): void {
    // Calculate new average rating based on remaining reviews
    const totalRatings = this.reviews.reduce((acc, review) => acc + review.rating, 0);
    const newAverageRating = totalRatings / this.reviews.length;
    // Update bookDetails with the new average rating
    this.bookDetails.averageRating = newAverageRating;
  }

  
  generateStarRating(rating: number): string {
    const fullStars = Math.floor(rating);
    const halfStars = Math.ceil(rating - fullStars);
    const emptyStars = 5 - fullStars - halfStars;
  
    let starsHTML = '';
  
    
    for (let i = 0; i < fullStars; i++) {
      starsHTML += '<span class="star">&#9733;</span>'; 
    }
    for (let i = 0; i < halfStars; i++) {
      starsHTML += '<span class="star">&#9734;</span>';
    }
  
  
    for (let i = 0; i < emptyStars; i++) {
      starsHTML += '<span class="star">&#9734;</span>'; 
    }
  
    return starsHTML;
  }
  private showSnackbar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000, // 3 seconds
    });
  }
}
