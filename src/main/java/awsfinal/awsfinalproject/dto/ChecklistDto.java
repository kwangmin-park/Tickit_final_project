package awsfinal.awsfinalproject.dto;

import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ChecklistDto {
    private Long listId;

    @NotNull
    @Size(min = 1, max = 100)
    private String username;

    @NotNull
    @Size(min = 1, max = 100)
    private String tripId;

    @NotNull
    @Size(min = 1, max = 100)
    private String checklistDate;

    @ColumnDefault("0")
    private String categoryId;

    @ColumnDefault("0")
    private String isChecked;
//    true,false

    @Size(min = 1, max = 100)
    private String content;

}
