package com.darshan.response;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.tomcat.util.codec.binary.Base64;

import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
public class RoomResponse {
    private Long id;
    private String roomType;
    private BigDecimal roomPrice;
    private boolean isBooked;
    private String roomDesc;
    private String photo; // Base64 encoded photo string
    private List<BookingResponse> bookings;

    // Minimal constructor for simple responses
    public RoomResponse(Long id, String roomType, BigDecimal roomPrice) {
        this.id = id;
        this.roomType = roomType;
        this.roomPrice = roomPrice;
    }

    // Full constructor with photo and booking info
    public RoomResponse(Long id,
                        String roomType,
                        BigDecimal roomPrice,
                        boolean isBooked,
                        String roomDesc,
                        byte[] photoBytes,
                        List<BookingResponse> bookings) {
        this.id = id;
        this.roomType = roomType;
        this.roomPrice = roomPrice;
        this.isBooked = isBooked;
        this.roomDesc = roomDesc;
        this.photo = (photoBytes != null && photoBytes.length > 0)
                ? Base64.encodeBase64String(photoBytes)
                : null;
        this.bookings = bookings;
    }
}
