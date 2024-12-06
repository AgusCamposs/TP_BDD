import { useMovie } from "../hooks/useMovie"
import styles from "./common.module.css"

const CreateMovie = () => {
	const { handleActorChange, handleChange, handleSubmit, movie, addActor, isDisabled } =
		useMovie()
	return (
		<main className={styles.main}>
			<h1>Create a Movie!</h1>
			<form onSubmit={handleSubmit}>
				<div className={styles.inputContainer}>
					<label>Title:</label>
					<input
						type="text"
						name="title"
						value={movie.title}
						onChange={handleChange}
						className={styles.input}
						required
					/>
				</div>
				<div className={styles.inputContainer}>
					<label>Genre:</label>
					<input
						type="text"
						name="genre"
						value={movie.genre}
						onChange={handleChange}
						className={styles.input}
						required
					/>
				</div>
				<div className={styles.inputContainer}>
					<label>Year:</label>
					<input
						type="number"
						name="year"
						value={movie.year}
						onChange={handleChange}
						className={styles.input}
						required
						min={1900}
						max={new Date().getFullYear()}
					/>
				</div>
				<div className={styles.inputContainer}>
					<label>Director:</label>
					<input
						type="text"
						name="director"
						value={movie.director}
						onChange={handleChange}
						className={styles.input}
						required
					/>
				</div>
				<div className={styles.inputContainer}>
					<label>Rating:</label>
					<input
						type="number"
						name="rating"
						value={movie.rating}
						onChange={handleChange}
						className={styles.input}
						min="0"
						max="5"
						required
					/>
				</div>

				<h3>Actors:</h3>
				{movie.actors.map((actor, index) => (
					<div className={styles.inputContainer} key={index}>
						<input
							type="text"
							placeholder="First Name"
							value={actor.name}
							onChange={(e) => handleActorChange(index, "name", e.target.value)}
							className={styles.input}
							required
						/>
						<input
							type="text"
							placeholder="Last Name"
							value={actor.lastname}
							onChange={(e) => handleActorChange(index, "lastname", e.target.value)}
							className={styles.input}
							required
						/>
						<input
							type="number"
							placeholder="Age"
							value={actor.age}
							onChange={(e) => handleActorChange(index, "age", e.target.value)}
							className={styles.input}
							required
						/>
					</div>
				))}

				<div className={styles.buttonsContainer}>
					<button
						className={styles.button + " " + styles.secondary}
						type="button"
						onClick={addActor}>
						Add Actor
					</button>

					<button className={styles.button} disabled={isDisabled(movie)} type="submit">
						Save
					</button>
				</div>
			</form>
		</main>
	)
}

export default CreateMovie
