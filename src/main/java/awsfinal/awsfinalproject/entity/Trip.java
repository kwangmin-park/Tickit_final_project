package awsfinal.awsfinalproject.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "trip")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Trip {

    @Id
    @Column(name = "trip_id",nullable = false, unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tripId;

    @Column(name = "username",nullable = false, length = 100)
    private String username;

    @Column(name = "trip_name",nullable = false, length = 100)
    private String tripName;

    @Column(name = "target_price",nullable = true, length = 100)
    private String targetPrice;

    @Column(name = "cur_price",nullable = true, length = 100)
    private String curPrice;
}