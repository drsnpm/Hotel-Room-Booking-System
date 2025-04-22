import React, { useEffect, useState } from "react";
import moment from "moment";
import { getBookingsByUserId, cancelBooking } from "../utils/ApiFunctions";

const FindBooking = () => {
	const [bookings, setBookings] = useState([]);
	const [filteredBookings, setFilteredBookings] = useState([]);
	const [error, setError] = useState(null);
	const [successMessage, setSuccessMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [isDeleted, setIsDeleted] = useState(false);

	const userId = localStorage.getItem("userId"); // Assuming user ID is stored in local storage
	const token = localStorage.getItem("token");

	useEffect(() => {
		const fetchBookings = async () => {
			setIsLoading(true);
			try {
				// Fetch all bookings for the logged-in user
				const data = await getBookingsByUserId(userId, token);
				setBookings(data);
				setFilteredBookings(data); // Set filtered bookings to all bookings initially
				setError(null);
			} catch (error) {
				setBookings([]);
				setError(error.message);
			}
			setIsLoading(false);
		};

		if (userId && token) {
			fetchBookings();
		}
	}, [userId, token]);

	const handleBookingCancellation = async (bookingId) => {
		const confirmed = window.confirm("Do you really want to cancel this booking?");
		if (!confirmed) return; // Exit if user cancels
	
		try {
			await cancelBooking(bookingId);
			console.log(`Booking with ID ${bookingId} was successfully cancelled.`);
			setIsDeleted(true);
			setSuccessMessage("Booking has been cancelled successfully!");
			setBookings((prevBookings) => prevBookings.filter((booking) => booking.id !== bookingId));
			setFilteredBookings((prevBookings) => prevBookings.filter((booking) => booking.id !== bookingId)); // Also update filtered list
		} catch (error) {
			console.error("Cancellation failed:", error.message);
			setError(error.message);
		}
		setTimeout(() => {
			setSuccessMessage("");
			setIsDeleted(false);
		}, 2000);
	};
	
	

	const handleSearch = () => {
		// Filter bookings based on search query (e.g., confirmation code or guest name)
		const searchLowerCase = searchQuery.toLowerCase();
		const filtered = bookings.filter(
			(booking) =>
				booking.bookingConfirmationCode.toLowerCase().includes(searchLowerCase) ||
				booking.guestName.toLowerCase().includes(searchLowerCase)
		);
		setFilteredBookings(filtered);
	};

	const handleInputChange = (event) => {
		setSearchQuery(event.target.value);
	};

	return (
		<>
			<div className="container mt-5 d-flex flex-column justify-content-center align-items-center">
				<h2 className="text-center mb-4">My Bookings</h2>

				<div className="col-md-6 mb-3">
					<div className="input-group">
						<input
							type="text"
							className="form-control"
							placeholder="Search by confirmation code or guest name"
							value={searchQuery}
							onChange={handleInputChange}
						/>
						<button className="btn btn-hotel" onClick={handleSearch}>
							Search
						</button>
					</div>
				</div>

				{isLoading ? (
					<div>Loading your bookings...</div>
				) : error ? (
					<div className="text-danger">Error: {error}</div>
				) : filteredBookings.length > 0 ? (
					<>
						<h3>Your Bookings</h3>
						<table className="table table-bordered table-hover shadow">
							<thead>
								<tr>
									<th>S/N</th>
									<th>Room Type</th>
									<th>Check-In Date</th>
									<th>Check-Out Date</th>
									<th>Guest Name</th>
									<th>Guest Email</th>
									<th>Adults</th>
									<th>Children</th>
									<th>Confirmation Code</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody className="text-center">
								{filteredBookings.map((booking, index) => (
									<tr key={booking.id}>
										<td>{index + 1}</td>
										<td>{booking.room.roomType}</td>
										<td>{moment(booking.checkInDate).format("MMM Do, YYYY")}</td>
										<td>{moment(booking.checkOutDate).format("MMM Do, YYYY")}</td>
										<td>{booking.guestName}</td>
										<td>{booking.guestEmail}</td>
										<td>{booking.numOfAdults}</td>
										<td>{booking.numOfChildren}</td>
										<td>{booking.bookingConfirmationCode}</td>
										<td>
											{!isDeleted && (
												<button
													onClick={() => handleBookingCancellation(booking.id)}
													className="btn btn-danger">
													Cancel Booking
												</button>
											)}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</>
				) : (
					<div>No bookings found for your account.</div>
				)}

				{isDeleted && <div className="alert alert-success mt-3 fade show">{successMessage}</div>}
			</div>
		</>
	);
};

export default FindBooking;
