import { QuestionDto } from './abstractDto/QuestionDto';
import { SelectedResponseDto } from './SelectedResponseDto';

export class AnswerOptionDto  {
    public id : number;
    public description : String;
    public correctAnswer : Boolean;
    public weight : number;
    public question : QuestionDto | undefined;

    constructor() {
        this.id = 0;
        this.description = new String;
        this.correctAnswer = new Boolean;
        this.weight = 0.0;
    }

}
