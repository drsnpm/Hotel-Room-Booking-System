# Hotel Room Booking System

## 🏨 Overview
The **Hotel Room Booking System** is a full-stack web application that allows users to browse available hotel rooms, make bookings, view their current and past reservations, and cancel them if needed. Administrators can manage room inventory, update room details, and control all bookings via a dedicated admin panel.

---

## 🛠️ Tools Used
- IntelliJ IDEA / Eclipse
- MySQL Workbench
- Spring Boot
- React.js
- Axios
- Bootstrap / Material UI (for styling)

---

## 💻 Tech Stack
- **Frontend**: React.js, HTML, CSS, JavaScript  
- **Backend**: Spring Boot (Java), Spring Data JPA, REST APIs  
- **Database**: MySQL  
- **Server**: Embedded Tomcat (via Spring Boot)

---

## 🚀 Installation

### ✅ Prerequisites
Make sure the following are installed:
- [Java JDK](https://www.oracle.com/java/technologies/javase-downloads.html)
- [Node.js and npm](https://nodejs.org/)
- [Spring Boot CLI or an IDE like IntelliJ IDEA / Eclipse](https://spring.io/tools)
- [MySQL](https://www.mysql.com/)
- [Postman](https://www.postman.com/) *(optional, for API testing)*

## ⚙️ Project Setup

#### 1. Clone the Repository
```bash
git clone https://github.com/drsnpm/hotel-room-booking-system.git
```

### 2. 📂 Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend/Hotel-booking-application
   ````

2. Install the dependencies:
```bash
  npm install
````

3. Start the development server
```bash
  npm run dev
```

### 3. 🖥️ Backend Setup
1. Navigate to the backend directory
```bash
  cd backend/HotelBookingApplication
```
2. Configure the database connection in
```bash
  src/main/resources/application.properties
```
3. Update the following properties with your local MySQL credentials
```bash
  spring.datasource.url=jdbc:mysql://localhost:3306/hotel_booking
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
````

4. Run the Spring Boot application using your IDE (IntelliJ/Eclipse) or via terminal
```bash
./mvnw spring-boot:run
```
or
```bash
  mvn spring-boot:run
```

### Features for User
1. **User Registration** – New users can sign up with valid credentials and email verification for added security.
2. **User Login & Authentication** – Secure login system with username/email and password for authenticated access.
3. **Profile Management** – Users can view profile information such as name, email, and contact details.
4. **Browse Available Rooms** – Users can search and filter rooms by type, availability, and price.
5. **Book Room** – Users can book a room by selecting the room type, date range, and number of guests.
6. **View Booking Details** – Users can view complete booking information details.
7. **Cancel Booking** – Users can cancel a reservation within the cancellation policy timeframe.
8. **Logout Securely** – Secure logout to prevent unauthorized access to the user's account.

### Features for Admin
1. **Admin Login** – Secure login system to ensure only authorized administrators can access the admin panel.
2. **Manage Bookings** – Admin can view all bookings, filter by date or user.
3. **Cancel Any Booking** – Admin has authority to cancel any booking in case of emergency or maintenance.
4. **Add New Rooms** – Admin can add new rooms by specifying room type, number, price, and features.
5. **Update Room Details** – Admin can edit room descriptions, pricing, capacity, and availability.
6. **Delete Rooms** – Admin can delete rooms that are no longer in service or under maintenance.
7. **Secure Logout** – Admin can log out securely to terminate the session and prevent unauthorized access.
