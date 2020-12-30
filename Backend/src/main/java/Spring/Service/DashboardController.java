package Spring.Service;

import java.util.HashSet;

import Spring.Model.Book;
import com.google.gson.Gson;
import Spring.Model.GetDashboardResponse;
import org.springframework.web.bind.annotation.*;

import javax.ejb.NoSuchEntityException;

@RestController
public class DashboardController {
    Gson gson = new Gson();
    DashboardService dashboardService = new DashboardService();
    @CrossOrigin
    @GetMapping("/dashboard")
    public String doGet() throws Exception {
        HashSet<Book> books = dashboardService.getBooks();
        if (books != null) {
            GetDashboardResponse response = new GetDashboardResponse(books, 200);
            return gson.toJson(response);
        }
        throw new Exception();
    }
    @CrossOrigin
    @GetMapping("/dashboard/{id}")
    public String doGetWithParam(@PathVariable String id) {
        HashSet<Book> books = dashboardService.getBooks();
        Book book = Book.getBookById(books, Integer.parseInt(id));
        if (book != null) {
            GetDashboardResponse response = new GetDashboardResponse(book, 200);
            return gson.toJson(response);
        }
        throw new NoSuchEntityException("Rekord o podanym id nie istnieje.");
    }
    @CrossOrigin
    @PostMapping("/dashboard")
    protected String doPost(@RequestBody Book newBook) {
        //add new book, return created obj
        dashboardService.addBook(newBook);
        GetDashboardResponse response = new GetDashboardResponse(newBook, 200);
        return gson.toJson(response);
    }
    @CrossOrigin
    @DeleteMapping("/dashboard/{bookId}")
    protected String doDelete(@PathVariable String bookId) {
        //delete book

        Book removedBook = dashboardService.removeBook(Integer.parseInt(bookId));
        if (removedBook == null) {
            throw new NoSuchEntityException("Rekord o podanym id nie istnieje.");
        }
        GetDashboardResponse res = new GetDashboardResponse(removedBook, 200);

        return gson.toJson(res);
    }
}
