package Spring.Service;

import Spring.Entity.UserRepository;
import Spring.Entity.User;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {
    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/add")
    public @ResponseBody String addNewUser (@RequestParam String name, @RequestParam String password) {

        User n = new User();
        n.setUsername(name);
        n.setPassword(password);
        n.setRole(1);
        userRepository.save(n);
        return "Saved";
    }

    @GetMapping("/all")
    public @ResponseBody Iterable<User> getAllUsers() {
        return userRepository.findAll();
    }
}