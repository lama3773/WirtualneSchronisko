package Spring.Model;

import java.util.HashSet;

public final class Book {
    public static final String BOOKS = "books";
    private final Integer id;
    private final String title;
    private final String author;
    private final String releaseDate;
    public static Integer idCounter = 0;

    public Book(String title, String author, String releaseDate) {
        this.id = createBookId();
        this.title = title;
        this.author = author;
        this.releaseDate = releaseDate;
    }

    public Integer getId() {
        return id;
    }

    public static Book getBookById(HashSet<Book> books, Integer bookId) {
        Book foundBook = null;
        for(Book book : books){
            if(book.id.equals(bookId)){
                foundBook = book;
                break;
            }
        }
        return foundBook;
    }

    //to make contains function work properly in HashSet
    @Override
    public int hashCode() {
        final int prime = 31;
        return prime * (prime * title.hashCode() + author.hashCode()) + releaseDate.hashCode();
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Book bookObj = (Book) obj;
        //check if objects are identical
        return title.equals(bookObj.title) && author.equals(bookObj.author) && releaseDate.equals(bookObj.releaseDate);
    }

    public Integer createBookId()
    {
        return idCounter++;
    }
}