package awsfinal.awsfinalproject.entity;

import lombok.*;

import javax.persistence.*;

@Entity // 데이터베이스의 테이블과 일대일 매칭 객체
@Table(name = "transticket")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TransTicket {
    
    @Id //이게 primary key 표시
    @Column(name = "ticket_id",nullable = false, unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY) //auto-increment용
    private Long ticketId;

    @Column(name = "username",nullable = false, length = 100)
    private String username;

    @Column(name = "trip_id",nullable = false, length = 100)
    private String tripId;


    @Column(name = "ticket_date",nullable = false, length = 100)
    private String ticketDate;

    @Column(name = "ticket_nickname",nullable = true, length = 100)
    private String ticketNickname;

    @Column(name = "depart_place",nullable = false, length = 100)
    private String departPlace;

    @Column(name = "depart_country",nullable = true, length = 100)
    private String departCountry;

    @Column(name = "arrive_place",nullable = false, length = 100)
    private String arrivePlace;

    @Column(name = "arrive_country",nullable = true, length = 100)
    private String arriveCountry;

    @Column(name = "ticket_price",nullable = true, length = 100)
    private String ticketPrice;

    @Column(name = "depart_time",nullable = true, length = 100)
    private String departTime;

    @Column(name = "arrive_time",nullable = true, length = 100)
    private String arriveTime;

    @Column(name = "depart_date",nullable = true, length = 100)
    private String departDate;

    @Column(name = "arrive_date",nullable = true, length = 100)
    private String arriveDate;

    @Column(name = "memo",nullable = true, length = 100)
    private String memo;

    @Column(name = "menu",nullable = true, length = 1000)
    private String menu;

    @Column(name = "transport_id",nullable = true, length = 45)
    private String transportId;

    @Column(name = "ticket_type",nullable = true)
    private String ticketType;


}
