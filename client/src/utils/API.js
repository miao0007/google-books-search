import axios from "axios";

export default {
    // get books
    getAllBooks: function() {
        return axios.get("/api/books");
    },
    // save a book
    saveBook: function(id) {
        return axios.post(`/api/books/${id}`);
    },
    // search books
    searchBooks: function() {
        return axios.get(`/search/${search}`);
    },
    // delete unsaved books
    deleteUnsaved: function() {
        return axios.delete("/api/books");
    },
    // delete a book
    deleteBook: function(id) {
        return axios.delete(`/api/books/${id}`);
    }
}