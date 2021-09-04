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
public class TransTicketDto {
    //여기엔 entity에 있는 것 중에 우리가 실제로 dto에 담아서 넘겨줄것만 있으면 되는거 맞죠..?
    //변수명은 entity랑 동일하게!
    //아직 일부만 넣어놨습니다!
    private Long ticketId;

    @Size(max = 100)
    private String ticketDate;

    @Size(max = 100)
    private String ticketNickname;

    @Size(max=100)
    private String departPlace;

    @Size(max=100)
    private String arrivePlace;

    @Size(max=100)
    private String departCountry;

    @Size(max=100)
    private String arriveCountry;

    @Size(max=100)
    private String departTime;

    @Size(max=100)
    private String arriveTime;

    @Size(max=100)
    private String departDate;

    @Size(max=100)
    private String arriveDate;


    @Size(max=100)
    private String ticketPrice;

    @NotNull
    @Size(max=100)
    private String username;

    @ColumnDefault("1")
    @Size(max=100)
    private String tripId;

    @ColumnDefault("0")
    @Size(max=45)
    private String transportId;

    @Size(max=100)
    private String memo;

    @Size(max=1000)
    private String menu;

    @ColumnDefault("1")
    @Size(max=100)
    private String ticketType;

}
