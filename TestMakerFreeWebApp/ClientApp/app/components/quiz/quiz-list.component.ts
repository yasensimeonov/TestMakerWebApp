import { Component, Inject, Input} from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
    selector: "quiz-list",
    templateUrl: './quiz-list.component.html',
    styleUrls: ['./quiz-list.component.css']
})

export class QuizListComponent {
    @Input() class: string;
    title: string;
    selectedQuiz: Quiz;
    quizzes: Quiz[];

    constructor(private http: HttpClient,
        @Inject('BASE_URL') baseUrl: string) {
        var url = baseUrl + "api/quiz/";

        console.log("QuizListComponent instantiated with the following class: " + this.class);

        switch (this.class) {
            case "latest":
            default:
                this.title = "Latest Quizzes";
                url += "Latest/";
                break;
            case "byTitle":
                this.title = "Quizzes by Title";
                url += "ByTitle/";
                break;
            case "random":
                this.title = "Random Quizzes";
                url += "Random/";
                break;
        }

        this.http.get<Quiz[]>(url).subscribe(result => {
            this.quizzes = result;
        }, error => console.error(error));
    }

    onSelect(quiz: Quiz) {
        this.selectedQuiz = quiz;
        console.log("quiz with Id "
            + this.selectedQuiz.Id
            + " has been selected.");
    }
}