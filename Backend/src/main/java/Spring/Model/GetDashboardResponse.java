package Spring.Model;

import java.util.HashSet;

public class GetDashboardResponse {

    private HashSet<Book> books;
    private Book book;
    private int status;

    public GetDashboardResponse(HashSet<Book> books, int status) {
        this.books = books;
        this.status = status;
    }
    public GetDashboardResponse(Book book, int status) {
        this.book = book;
        this.status = status;
    }
}