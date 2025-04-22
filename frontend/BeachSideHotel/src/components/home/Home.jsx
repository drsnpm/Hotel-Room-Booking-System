import React, { useEffect, useState } from "react"
import MainHeader from "../layout/MainHeader"
import HotelService from "../common/HotelService"
import Parallax from "../common/Parallax"
import RoomCarousel from "../common/RoomCarousel"
import RoomSearch from "../common/RoomSearch"
import { useLocation } from "react-router-dom"

const Home = () => {
	const location = useLocation()
	const messageFromLocation = location.state && location.state.message
	const currentUser = localStorage.getItem("userId")

	const [showMessage, setShowMessage] = useState(!!messageFromLocation)
	const [message, setMessage] = useState(messageFromLocation)
	const [showLoginMessage, setShowLoginMessage] = useState(!!currentUser)

	useEffect(() => {
		if (messageFromLocation) {
			const timer = setTimeout(() => {
				setShowMessage(false)
			}, 3000)
			return () => clearTimeout(timer)
		}
	}, [messageFromLocation])

	useEffect(() => {
		if (currentUser) {
			const loginTimer = setTimeout(() => {
				setShowLoginMessage(false)
			}, 3000)
			return () => clearTimeout(loginTimer)
		}
	}, [currentUser])

	return (
		<section>
			{showMessage && <p className="text-warning px-5">{message}</p>}
			{showLoginMessage && (
				<h6 className="text-success text-center">You are logged-In as {currentUser}</h6>
			)}

			<MainHeader />
			<div className="container">
				<RoomSearch />
				<RoomCarousel />
				<Parallax />
				<RoomCarousel />
				<HotelService />
				<Parallax />
				<RoomCarousel />
			</div>
		</section>
	)
}

export default Home