package Spring.Service;

import Spring.Model.User;
import Spring.Enum.Role;
import java.util.HashMap;
import java.util.Map;

public class UserService {
    //init user credentials
    public static final Map<String, String> userCredentials = new HashMap<>();
    public static final Map<String, String> adminCredentials = new HashMap<>();

    public UserService()
    {
        userCredentials.put("user1", "user1");
        userCredentials.put("user2", "user2");
        userCredentials.put("user3", "user3");
        userCredentials.put("user4", "user4");

        adminCredentials.put("admin", "admin");
    }

    public User findUserByUsername(String username) {
        if (userCredentials.containsKey(username)) {
            return new User(Role.USER, username, userCredentials.get(username));
        }
        if (adminCredentials.containsKey(username)) {
            return new User(Role.ADMIN, username, adminCredentials.get(username));
        }
        return null;
    }
}
