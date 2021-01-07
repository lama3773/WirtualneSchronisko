package Spring.Entity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
@RepositoryRestResource
public interface OrdersRepository extends JpaRepository<Orders, Integer> {
    Orders findItemById(Integer orderId);
}