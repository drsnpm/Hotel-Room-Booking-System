# 🏨 Hotel Room Booking System

## Overview
The **Hotel Room Booking System** is a full-stack web application that allows users to:
- Browse available hotel rooms
- Make bookings
- View current and past reservations
- Cancel bookings

Administrators can:
- Manage room inventory
- Update room details
- Control all bookings via a dedicated admin panel

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

Ensure the following are installed:

- [Java JDK](https://www.oracle.com/java/technologies/javase-downloads.html)  
- [Node.js and npm](https://nodejs.org/)  
- [Spring Boot CLI](https://docs.spring.io/spring-boot/docs/current/reference/html/getting-started.html#getting-started-installing-the-cli) or an IDE like IntelliJ IDEA / Eclipse  
- [MySQL](https://www.mysql.com/)  
- [Postman](https://www.postman.com/) *(optional, for API testing)*

---

## ⚙️ Project Setup

### 1. Clone the Repository

```bash
   git clone https://github.com/drsnpm/hotel-room-booking-system.git
```

### 2. 📂 Frontend Setup
1. Navigate to the frontend directory:
```bash
   cd frontend/Hotel-booking-application
````

3. Install the dependencies:
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

## Snapshots
### Home Page
![Image](https://github.com/user-attachments/assets/1ef3d0d6-14a3-4f09-a2ce-2ed9f53704b4)

### Register Page
![Image](https://github.com/user-attachments/assets/9f1132c4-e116-4b7c-8cc2-53668b477c2d)

### Login Page
![Image](https://github.com/user-attachments/assets/935925e7-0173-4a6d-af1a-961e2d90b4ec)

### Available Rooms Page
![Image](https://github.com/user-attachments/assets/1533c715-3e71-4367-9a16-6e1a39c83fd3)

### Room Booking Page
![Image](https://github.com/user-attachments/assets/3730799c-f11b-42a7-a504-4a5c9eac609f)

### Cancel Booking Page
![Image](https://github.com/user-attachments/assets/51d04d5a-4f50-418b-8fe7-400b0203d96a)

### User Profile Page
![Image](https://github.com/user-attachments/assets/f3b9db60-c11c-4c9a-8af7-a7afd8ee77f9)

### Admin Manage Room Page
![Image](https://github.com/user-attachments/assets/d82590b4-4781-41f4-b4be-61798ed6a18f)

### Admin Add Room Page
![Image](https://github.com/user-attachments/assets/912f7943-2da7-43f7-82c1-6be43594e7c6)

### Admin Manage Bookings Page
![Image](https://github.com/user-attachments/assets/ccdbc396-098c-47f3-b962-822cc351d3b1)

### Admin Profile Page
![Image](https://github.com/user-attachments/assets/618ce3a6-9ed3-4c97-b316-a0463f4828f5)
