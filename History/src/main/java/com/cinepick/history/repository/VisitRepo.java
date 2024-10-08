package com.cinepick.history.repository;

import com.cinepick.history.model.Visited;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface VisitRepo extends JpaRepository<Visited, UUID>
{
    List<Visited> findFirst5ByUseridOrderByDateTime(UUID userid);
    List<Visited> findAllByUserid(UUID userid);

    @Query("select v from Visited v where v.userid = :userid and v.mid = :mid")
    Visited findByUseridAndMid(UUID userid, UUID mid);
}
