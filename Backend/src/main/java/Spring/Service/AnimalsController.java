package Spring.Service;

import Spring.Entity.Animals;
import Spring.Entity.AnimalsRepository;

import com.google.gson.Gson;
import Spring.Model.GetDashboardResponse;
import org.springframework.web.bind.annotation.*;

import javax.ejb.NoSuchEntityException;

@CrossOrigin
@RestController
public class AnimalsController {
    private final AnimalsRepository animalsRepository;

    public AnimalsController(AnimalsRepository animalsRepository) {
        this.animalsRepository = animalsRepository;
    }

    Gson gson = new Gson();
    @CrossOrigin
    @GetMapping("/animals")
       public @ResponseBody Iterable<Animals> getAllAnimals(@RequestParam(required=false) Boolean onlyNonAdopted) {
        if (onlyNonAdopted) {
            return animalsRepository.findByUser(null);
        }
        return animalsRepository.findAll();
    }
    @CrossOrigin
    @PutMapping("/animals/{id}")
    public String doPut(@RequestBody Animals newAnimal) {

        Animals animal = animalsRepository.findItemById(newAnimal.getId());
        if (animal != null) {
            if (newAnimal.getImage() != null) animal.setImage(newAnimal.getImage());
            if (newAnimal.getName() != null) animal.setName(newAnimal.getName());
            if (newAnimal.getBreed() != null) animal.setBreed(newAnimal.getBreed());
            if (newAnimal.getAge() != null) animal.setAge(newAnimal.getAge());
            if (newAnimal.getUser() != null) animal.setUser(newAnimal.getUser());
            if (newAnimal.getCategory() != null) animal.setCategory(newAnimal.getCategory());
            animalsRepository.save(animal);
            GetDashboardResponse response = new GetDashboardResponse(animal, 200);
            return gson.toJson(response);
        }
        throw new NoSuchEntityException("Rekord o podanym id nie istnieje.");
    }
    @CrossOrigin
    @PostMapping("/animals")
    protected String doPost(@RequestBody Animals animal) {

        animalsRepository.save(animal);
        GetDashboardResponse response = new GetDashboardResponse(animal, 200);
        return gson.toJson(response);
    }

    @CrossOrigin
    @DeleteMapping("/animals/{animalId}")
    protected String doDelete(@PathVariable Integer animalId) {

        Animals removedAnimal = animalsRepository.findItemById(animalId);
        animalsRepository.deleteById(animalId);
        if (removedAnimal == null) {
            throw new NoSuchEntityException("Rekord o podanym id nie istnieje.");
        }
        GetDashboardResponse res = new GetDashboardResponse(removedAnimal, 200);

        return gson.toJson(res);
    }
}
