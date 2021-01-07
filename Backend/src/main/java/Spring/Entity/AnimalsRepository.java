package Spring.Entity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
@RepositoryRestResource(exported = true)
public interface AnimalsRepository extends JpaRepository<Animals, Integer> {
    Animals findItemById(Integer id);

    Iterable<Animals> findByUser(Integer user);
}