package Spring.Entity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin
@RepositoryRestResource
public interface UserRepository extends JpaRepository<User, Integer> {

    User findByUsername(String username);

    List<User> findByRole(Integer role);

    User getByUsernameAndPassword(String username, String password);

    User findUserById(Integer id);
}