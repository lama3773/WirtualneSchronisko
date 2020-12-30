package Spring.Exceptions;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.RestController;

@ControllerAdvice
@RestController
public class GlobalDefaultExceptionHandler {
//
//    @ExceptionHandler(Exception.class)
//    public final ResponseEntity<ExceptionResponse> handleAllExceptions(Exception ex, WebRequest request) {
//        String message = "Napotkano błąd podczas pracy programu";
//        if (ex.getMessage() != null) {
//            message += ": " + ex.getMessage();
//        }
//        ExceptionResponse exceptionResponse = new ExceptionResponse(new Date(), message, request.getDescription(false));
//        return new ResponseEntity<>(exceptionResponse, HttpStatus.INTERNAL_SERVER_ERROR);
//    }
}