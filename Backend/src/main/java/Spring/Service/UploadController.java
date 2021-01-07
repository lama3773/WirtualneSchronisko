package Spring.Service;

import Spring.Entity.Animals;
import Spring.Entity.AnimalsRepository;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class UploadController {
    private final AnimalsRepository animalsRepository;

    public UploadController(AnimalsRepository animalsRepository) {
        this.animalsRepository = animalsRepository;
    }
    @CrossOrigin
    @PostMapping("/upload/{id}")
    protected void doUpload(@RequestParam("file") MultipartFile file, @PathVariable Integer id) {
        try {
            byte [] byteArr=file.getBytes();
            Animals animal = animalsRepository.findItemById(id);

            animal.setImage(byteArr);
            animalsRepository.save(animal);

        } catch (Exception e) {
            System.out.println(e);
        }

        // FOR PROPER USE - SAVE IMAGE ON SERVER PUBLIC DIR AND HOLD ONLY PATH IN DB
//        String relativeFilePath = "/uploads/" + file.getOriginalFilename();
//        String realPathToUploads = "D:\\PK\\ZTP\\Projekt\\Backend\\uploads\\";
//        String realPathFile = "D:\\PK\\ZTP\\Projekt\\Backend\\uploads\\" + file.getOriginalFilename();
//        Path root = Paths.get(realPathToUploads);
//
//        try {
//            if (!new File(realPathToUploads).exists()) {
//                new File(realPathToUploads).mkdir();
//            }
//            InputStream inputStream = file.getInputStream();
//            Files.copy(inputStream, root.resolve(realPathFile), StandardCopyOption.REPLACE_EXISTING);
//        } catch (Exception e) {
//            System.out.println(e);
//        }
//        // END
//        return relativeFilePath;
    }
}
