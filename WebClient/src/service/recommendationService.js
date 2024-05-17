import axios from "axios";
import { BASE_URL } from "../config";
import { Recommendation_URL } from "../config";

class RecommendationService {

    getAllSymptoms() {
        return axios.get(Recommendation_URL + "/getAllSymptoms")
    }

    predict(symptomsList) {
        return axios.get(Recommendation_URL + "/predict", {
            params: {
                symptomsList: symptomsList
            }
        });
    }

}


const recommendationService = new RecommendationService();

export default recommendationService;