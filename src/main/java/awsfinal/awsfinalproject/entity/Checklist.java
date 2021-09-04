package awsfinal.awsfinalproject.entity;
import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "minilist")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Checklist {
    @Id
    @Column(name = "list_id",nullable = false, unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long listId;

    @Column(name = "username",nullable = false, length = 100)
    private String username;

    @Column(name = "trip_id",nullable = false, length = 100)
    private String tripId;

    @Column(name = "checklist_date",nullable = false, length = 100)
    private String checklistDate;

    @Column(name = "category_id",nullable = false)
    private String categoryId;

    @Column(name = "is_checked",nullable = false)
    private String isChecked;

    @Column(name = "content",nullable = false, length = 100)
    private String content;
}
