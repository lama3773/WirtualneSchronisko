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

    @CrossOrigin
    @PostMapping("/register")
    public @ResponseBody String addNewUser(@RequestParam String email, @RequestParam String username, @RequestParam String password) {

        User newUser = new User();
        newUser.setUsername(username);
        newUser.setPassword(password);
        newUser.setRole(0);
        userRepository.save(newUser);
        return "Saved";
    }

    @CrossOrigin
    @GetMapping("/users/all")
    public @ResponseBody Iterable<User> getAllUsers() {
        return userRepository.findAll();
    }

    @CrossOrigin
    @GetMapping("/users/newones")
    public @ResponseBody Iterable<User> getAllNotConfirmedUsers() {
        return userRepository.findByRole(0);
    }
}