export interface iReview {
	$key: any;
	bookTitle: string;
	bookAuthor: string;
	bookDescription?: string;
	bookPicture?: string;
	//reviewCategory?: string;
	reviewComment?: string;
	reviewRating?: number;
	reviewDate?: string;
}