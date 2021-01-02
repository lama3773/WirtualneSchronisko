package Spring.Service;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@RestController
public class UploadController {
    @CrossOrigin
    @PostMapping("/upload")
    protected String doUpload(@RequestParam("file") MultipartFile file) {
        // FOR PROPER USE
        String relativeFilePath = "/uploads/" + file.getOriginalFilename();
        String realPathToUploads = "D:\\PK\\ZTP\\Projekt\\Backend\\uploads\\";
        String realPathFile = "D:\\PK\\ZTP\\Projekt\\Backend\\uploads\\" + file.getOriginalFilename();
        Path root = Paths.get(realPathToUploads);

        try {
            if (!new File(realPathToUploads).exists()) {
                new File(realPathToUploads).mkdir();
            }
            InputStream inputStream = file.getInputStream();
            Files.copy(inputStream, root.resolve(realPathFile), StandardCopyOption.REPLACE_EXISTING);
        } catch (Exception e) {
            System.out.println(e);
        }
        // END
        return relativeFilePath;
    }
}
