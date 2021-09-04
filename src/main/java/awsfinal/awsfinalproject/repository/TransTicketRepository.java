package awsfinal.awsfinalproject.repository;

import awsfinal.awsfinalproject.entity.*;
import org.apache.ibatis.annotations.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

public interface TransTicketRepository extends JpaRepository<TransTicket, Long> {
//    @EntityGraph(attributePaths = "authorities")


    //사용자의 이름과 여행과 카테고리에 맞는 티켓 보여주기
    Optional<TransTicket[]> findAllByTicketTypeAndUsernameAndTripId(String ticketType, String username, String tripId);


    @Query(value =
            "select "+
            "p.ticket_date as ticketDate, "+
            "sum(cast(p.ticket_price as unsigned)) as ticketPrice, " +
            "TICKET_TYPE AS ticketType, " +
            "CASE	WHEN TICKET_TYPE = 1  THEN '교통수단' "+
            "WHEN TICKET_TYPE = 2  THEN '식당' "+
            "WHEN TICKET_TYPE = 3  THEN '숙소' "+
            "WHEN TICKET_TYPE = 4  THEN '여행지' "+
            "END AS ticketTypeName "+
            "from transticket p "+
            "where 1=1 " +
            "and username = :username " +
            "and trip_id = :tripId " +
            "group by p.username, p.trip_id, p.ticket_date, p.ticket_type", nativeQuery = true)
    List<TicketPriceByDateInterface> getTicketPriceEachDate(String username, String tripId);


    @Query(value=
            "select distinct " +
            "p.ticket_date as ticketDate " +
            "from transticket p " +
            "where 1=1 " +
            "and username= :username " +
            "and trip_id = :tripId ",nativeQuery = true)
    List<String> getChecklistEachDate( String username, String tripId);

    @Query(value =
            "select "+
                    "p.ticket_date as ticketDate, "+
                    "TICKET_NICKNAME AS ticketNickname, " +
                    "MEMO AS memo "+
                    "from transticket p "+
                    "where 1=1 " +
                    "and username = :username " +
                    "and trip_id = :tripId " , nativeQuery = true)
    List<TicketMemoInterface> getTicketMemo(String username, String tripId);

    @Query(value =
            "SELECT " +
                    "ticket_type as id, " +
                    "CONCAT(ticket_date, ' ', replace(depart_time,' ',''), ':00') as start, " +
                    "case " +
                    "   when arrive_time is null or arrive_time = '' or arrive_time = 'undefined' " +
                    "       then CONCAT(ticket_date, ' ', replace(depart_time,' ','') , ':00') " +
                    "   else " +
                    "       CONCAT(ticket_date, ' ', replace(arrive_time,' ',''), ':00') end as end, " +
                    "ticket_nickname as title, " +
                    "memo as description " +
                    "FROM test.transticket " +
                    "where 1=1 " +
                    "and ticket_type in ('2','4') " +
                    "and username = :username " +
                    "and trip_id = :tripId " +
                    " " +
                    "union all " +
                    " " +
                    "SELECT " +
                    "ticket_type as id, " +
                    "CONCAT(depart_date, ' ', replace(depart_time,' ',''), ':00') as start,  " +
                    "CONCAT(arrive_date, ' ', replace(arrive_time,' ',''), ':00') as end, " +
                    "ticket_nickname as title, " +
                    "memo as description " +
                    "FROM test.transticket " +
                    "where 1=1 " +
                    "and ticket_type not in ('2','4') " +
                    "and username = :username " +
                    "and trip_id = :tripId ", nativeQuery = true)
    List<TicketScheduleInterface> getTicketSchedule(String username, String tripId);

}