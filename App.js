const App = () => {
	return (
		<Routes>
			<Route path="/" element={<MovieList />} />
			<Route path="/movies" element={<MovieList />} />
			<Route path="/movies/create" element={<CreateMovie />} />
			<Route path="/movies/:id/edit" element={<EditMovie />} />
			<Route path="/movies/:id/details" element={<MovieDetails />} />
			<Route path="/reviews/create" element={<ReviewForm />} />
			<Route path="/reviews/:id/edit" element={<ReviewForm isEdit={true} />} />
		</Routes>
	);
};

export default App;
