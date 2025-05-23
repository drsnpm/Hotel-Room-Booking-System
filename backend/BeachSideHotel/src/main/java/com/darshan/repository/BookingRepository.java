package com.darshan.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.darshan.model.BookedRoom;

import java.util.List;
import java.util.Optional;



public interface BookingRepository extends JpaRepository<BookedRoom, Long> {

    List<BookedRoom> findByRoomId(Long roomId);

 Optional<BookedRoom> findByBookingConfirmationCode(String confirmationCode);

    List<BookedRoom> findByGuestEmail(String email);
}
