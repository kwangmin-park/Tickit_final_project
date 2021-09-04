package awsfinal.awsfinalproject.repository;

import awsfinal.awsfinalproject.entity.Checklist;
import awsfinal.awsfinalproject.entity.TicketMemoInterface;
import awsfinal.awsfinalproject.entity.TicketPriceByDateInterface;
import awsfinal.awsfinalproject.entity.TransTicket;
import org.apache.ibatis.annotations.Param;
import org.hibernate.annotations.Check;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ChecklistRepository extends JpaRepository<Checklist, Long> {
//    @EntityGraph(attributePaths = "authorities")

    //사용자의 이름과 여행id에 맞는 체크리스트 보여주기
    Optional<Checklist[]> findAllByUsernameAndTripId(String username, String tripId);

//    @Query(value=
//            "SELECT" +
//                    " count(*) AS check_count," +
//                    " count(case when is_checked='1' then 1  end ) AS total_count " +
//                    "FROM test.minilist " +
//                    "where checklist_date='2021.05.05'",nativeQuery = true)
//    List<String> getCheckDataByDate(@Param("checklist_date")String checkDate, @Param("username")String username, @Param("trip_id")String tripId);
//

//    @Query(value=
//            "select" +
//                    "p.content as content " +
//                    "from minilist p " +
//                    "where 1=1 " +
//                    "and username= :username " +
//                    "and trip_id =:tripId "  ,nativeQuery = true)
//    List<String> getContentsByUsernameAndTripId(String username, String tripId);


}