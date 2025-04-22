import React, { useEffect, useState } from "react"
import moment from "moment"
import { Form, FormControl } from "react-bootstrap"
import BookingSummary from "./BookingSummary"
import { bookRoom, getRoomById, getUser } from "../utils/ApiFunctions"
import { useNavigate, useParams } from "react-router-dom"

const BookingForm = () => {
  const [validated, setValidated] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [roomPrice, setRoomPrice] = useState(0)

  const userId = localStorage.getItem("userId")
  const token = localStorage.getItem("token")

  const [booking, setBooking] = useState({
    guestFullName: "",
    guestEmail: userId, // Email assumed as ID
    guestPhNo: "",
    checkInDate: "",
    checkOutDate: "",
    numOfAdults: "",
    numOfChildren: ""
  })

  const { roomId } = useParams()
  const navigate = useNavigate()

  // ✅ Fetch user data and populate fullname & phone
  const fetchUserDetails = async () => {
    try {
      const user = await getUser(userId, token)
      setBooking(prev => ({
        ...prev,
        guestFullName: `${user.firstName} ${user.lastName}`,
        guestPhNo: user.phNo,
        guestEmail: user.email
      }))
    } catch (error) {
      console.error("Error fetching user details:", error)
    }
  }

  const getRoomPriceById = async (roomId) => {
    try {
      const response = await getRoomById(roomId)
      setRoomPrice(response.roomPrice)
    } catch (error) {
      throw new Error(error)
    }
  }

  useEffect(() => {
    getRoomPriceById(roomId)
    fetchUserDetails()
  }, [roomId])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setBooking({ ...booking, [name]: value })
    setErrorMessage("")
  }

  const calculatePayment = () => {
    const checkInDate = moment(booking.checkInDate)
    const checkOutDate = moment(booking.checkOutDate)
    const diffInDays = checkOutDate.diff(checkInDate, "days")
    const paymentPerDay = roomPrice ? roomPrice : 0
    return diffInDays * paymentPerDay
  }

  const isGuestCountValid = () => {
    const adultCount = parseInt(booking.numOfAdults)
    const childrenCount = parseInt(booking.numOfChildren) || 0
    const totalCount = adultCount + childrenCount
    return totalCount >= 1 && adultCount >= 1
  }

  const isCheckOutDateValid = () => {
    if (!moment(booking.checkOutDate).isSameOrAfter(moment(booking.checkInDate))) {
      setErrorMessage("Check-out date must be after check-in date")
      return false
    } else {
      setErrorMessage("")
      return true
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.currentTarget
    if (form.checkValidity() === false || !isGuestCountValid() || !isCheckOutDateValid()) {
      e.stopPropagation()
    } else {
      setIsSubmitted(true)
    }
    setValidated(true)
  }

  const handleFormSubmit = async () => {
    try {
      const confirmationCode = await bookRoom(roomId, booking)
      setIsSubmitted(true)
      navigate("/booking-success", { state: { message: confirmationCode } })
    } catch (error) {
      const errorMessage = error.message
      console.log(errorMessage)
      navigate("/booking-success", { state: { error: errorMessage } })
    }
  }

  return (
    <div className="container mb-5">
      <div className="row">
        <div className="col-md-6">
          <div className="card card-body mt-5">
            <h4 className="card-title">Reserve Room</h4>

            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label htmlFor="guestFullName">Fullname</Form.Label>
                <FormControl
                  required
                  type="text"
                  id="guestFullName"
                  name="guestFullName"
                  value={booking.guestFullName}
                  onChange={handleInputChange}
                  disabled
                />
              </Form.Group>

              <Form.Group>
                <Form.Label htmlFor="guestEmail">Email</Form.Label>
                <FormControl
                  required
                  type="email"
                  id="guestEmail"
                  name="guestEmail"
                  value={booking.guestEmail}
                  onChange={handleInputChange}
                  disabled
                />
              </Form.Group>

              <Form.Group>
                <Form.Label htmlFor="guestPhNo">Mobile</Form.Label>
                <FormControl
                  required
                  type="text"
                  id="guestPhNo"
                  name="guestPhNo"
                  value={booking.guestPhNo}
                  onChange={handleInputChange}
                  disabled
                />
              </Form.Group>

              <fieldset>
                <div className="row">
                  <div className="col-6">
                    <Form.Label htmlFor="checkInDate">Check-in date</Form.Label>
                    <FormControl
                      required
                      type="date"
                      id="checkInDate"
                      name="checkInDate"
                      value={booking.checkInDate}
                      min={moment().format("YYYY-MM-DD")}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-6">
                    <Form.Label htmlFor="checkOutDate">Check-out date</Form.Label>
                    <FormControl
                      required
                      type="date"
                      id="checkOutDate"
                      name="checkOutDate"
                      value={booking.checkOutDate}
                      min={moment().format("YYYY-MM-DD")}
                      onChange={handleInputChange}
                    />
                  </div>
                  {errorMessage && <p className="text-danger">{errorMessage}</p>}
                </div>
              </fieldset>

              <fieldset>
                <div className="row">
                  <div className="col-6">
                    <Form.Label htmlFor="numOfAdults">Adults</Form.Label>
                    <FormControl
                      required
                      type="number"
                      id="numOfAdults"
                      name="numOfAdults"
                      value={booking.numOfAdults}
                      min={1}
                      placeholder="1"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-6">
                    <Form.Label htmlFor="numOfChildren">Children (Optional)</Form.Label>
                    <FormControl
                      type="number"
                      id="numOfChildren"
                      name="numOfChildren"
                      value={booking.numOfChildren}
                      placeholder="0"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </fieldset>

              <div className="form-group mt-2 mb-2">
                <button type="submit" className="btn btn-hotel">
                  Continue
                </button>
              </div>
            </Form>
          </div>
        </div>

        <div className="col-md-4">
          {isSubmitted && (
            <BookingSummary
              booking={booking}
              payment={calculatePayment()}
              onConfirm={handleFormSubmit}
              isFormValid={validated}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default BookingForm
