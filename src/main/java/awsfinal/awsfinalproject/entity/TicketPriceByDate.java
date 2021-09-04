package awsfinal.awsfinalproject.entity;

import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TicketPriceByDate {
    private String username;
    private Long tripId;
    private String ticketDate;
    private Long ticketPrice;
}
