import axios from "axios";
import { BASE_URL } from "../config";

class CommentService {

    addComment(comment) {
        return axios.post(BASE_URL + "/api/comment/add", comment);
    }

}


const commentService = new CommentService();

export default commentService;