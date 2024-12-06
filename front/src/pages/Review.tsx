import { useReview } from "../hooks/useReview"
import styles from "./common.module.css"

interface ReviewProps {
	url?: string
}

const Review = ({ url }: ReviewProps) => {
	const { handleSubmit, handleChange, handleDelete, reviewData } = useReview(url)

	return (
		<main className={styles.main}>
			<h1>{url ? "Edit Review" : "Add Review"}</h1>
			<form onSubmit={handleSubmit}>
				<div className={styles.inputContainer}>
					<label>Movie ID:</label>
					<input
						type="text"
						name="movieId"
						value={reviewData.movieId}
						onChange={handleChange}
						required
						disabled={!!url}
						className={styles.input}
					/>
				</div>
				<div className={styles.inputContainer}>
					<label>Reviewer Name:</label>
					<input
						type="text"
						name="reviewerName"
						value={reviewData.reviewerName}
						onChange={handleChange}
						required
						className={styles.input}
					/>
				</div>
				<div className={styles.inputContainer}>
					<label>Review:</label>
					<textarea
						name="review"
						value={reviewData.review}
						onChange={handleChange}
						required
						className={styles.input}
					/>
				</div>
				<div className={styles.inputContainer}>
					<label>Rating (0-5):</label>
					<input
						type="number"
						name="rating"
						value={reviewData.rating}
						onChange={handleChange}
						min="0"
						max="5"
						step="0.1"
						required
						className={styles.input}
					/>
				</div>
				<div className={styles.buttonsContainer}>
					{url && (
						<button
							className={styles.button + " " + styles.secondary}
							type="button"
							onClick={handleDelete}>
							Delete Review
						</button>
					)}
					<button
						className={styles.button}
						type="submit"
						disabled={
							!reviewData.movieId ||
							!reviewData.rating ||
							!reviewData.review ||
							!reviewData.reviewerName
						}>
						{url ? "Update Review" : "Add Review"}
					</button>
				</div>
			</form>
		</main>
	)
}

export default Review
