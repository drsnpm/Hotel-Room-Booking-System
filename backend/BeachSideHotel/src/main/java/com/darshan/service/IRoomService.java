package com.darshan.service;

import com.darshan.model.Room;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface IRoomService {

   
    Room addNewRoom(MultipartFile photo, String roomType, BigDecimal roomPrice, String roomDesc)
            throws SQLException, IOException;
    Room updateRoom(Long roomId, String roomType, BigDecimal roomPrice, String roomDesc, byte[] photoBytes);

    List<String> getAllRoomTypes();

    List<Room> getAllRooms();

    Optional<Room> getRoomById(Long roomId);

    void deleteRoom(Long roomId);

    List<Room> getAvailableRooms(LocalDate checkInDate, LocalDate checkOutDate, String roomType);

    byte[] getRoomPhotoByRoomId(Long roomId) throws SQLException;
}
