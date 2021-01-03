package Spring.Service;

import Spring.Entity.UserRepository;
import Spring.Entity.User;
import Spring.Enum.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class UserService {
    //init user credentials
    public static final Map<String, String> userCredentials = new HashMap<>();
    public static final Map<String, String> adminCredentials = new HashMap<>();

    @Autowired
    private UserRepository userRepository;


    public User findUserByUsername(String username) {
        Spring.Entity.User user = userRepository.findByUsername(username);
        return user;
    }
}
