import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const ReviewForm = ({ isEdit = false }) => {
    const { id } = useParams(); // ID de la reseña (en caso de editar)
    const navigate = useNavigate();

    const [reviewData, setReviewData] = useState({
        movie: '',
        reviewerName: '',
        review: '',
        rating: 0,
    });

    // Carga la reseña actual si está en modo edición
    useEffect(() => {
        if (isEdit) {
            axios.get(`http://localhost:8081/reviews/${id}`)
                .then(response => setReviewData(response.data))
                .catch(error => console.error('Error fetching review:', error));
        }
    }, [id, isEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setReviewData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = isEdit
            ? `http://localhost:8081/reviews/updateReview/${id}`
            : 'http://localhost:8081/reviews/create';

        const method = isEdit ? 'patch' : 'post';

        axios[method](url, reviewData)
            .then(() => {
                alert(isEdit ? 'Review updated successfully!' : 'Review added successfully!');
                navigate(`/movies/${reviewData.movie}/details`); // Redirige a los detalles de la película
            })
            .catch(error => console.error('Error saving review:', error));
    };

    const handleDelete = () => {
        axios.delete(`http://localhost:8081/reviews/delete/${id}`)
            .then(() => {
                alert('Review deleted successfully!');
                navigate(`/movies/${reviewData.movie}/details`); // Redirige a los detalles de la película
            })
            .catch(error => console.error('Error deleting review:', error));
    };

    return (
        <div>
            <h1>{isEdit ? 'Edit Review' : 'Add Review'}</h1>
            <form onSubmit={handleSubmit}>
                {!isEdit && (
                    <div>
                        <label>Movie ID:</label>
                        <input
                            type="text"
                            name="movie"
                            value={reviewData.movie}
                            onChange={handleChange}
                            required
                        />
                    </div>
                )}
                <div>
                    <label>Reviewer Name:</label>
                    <input
                        type="text"
                        name="reviewerName"
                        value={reviewData.reviewerName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Review:</label>
                    <textarea
                        name="review"
                        value={reviewData.review}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
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
                    />
                </div>
                <button type="submit">{isEdit ? 'Update Review' : 'Add Review'}</button>
                {isEdit && (
                    <button type="button" onClick={handleDelete} style={{ marginLeft: '10px' }}>
                        Delete Review
                    </button>
                )}
            </form>
        </div>
    );
};

export default ReviewForm;