package awsfinal.awsfinalproject.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TripDto {
    private Long tripId;

    @NotNull
    @Size(min = 1, max = 100)
    private String username;

    @NotNull
    @Size(min = 1, max = 100)
    private String tripName;

    @ColumnDefault("0")
    private String targetPrice;

    @ColumnDefault("0")
    private String curPrice;
}