import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { QuestionDto } from 'src/app/dto/abstractDto/QuestionDto';
import { AnswerOptionDto } from 'src/app/dto/AnswerOptionDto';
import { ExamStudentDto } from 'src/app/dto/ExamStudentDto';
import { AnswerOptionService } from 'src/app/services/answer-option.service';
import { SelectedResponseService } from 'src/app/services/selected-response.service';

@Component({
  selector: 'app-exam-studen-selected-response',
  templateUrl: './exam-studen-selected-response.component.html',
  styleUrls: ['./exam-studen-selected-response.component.css']
})
export class ExamStudenSelectedResponseComponent implements OnInit {

  public selectedQuestion : QuestionDto;
  public examStudent : ExamStudentDto;
  public asnOpts : Array<AnswerOptionDto>;

  public selectedAnsOpt : AnswerOptionDto;
  public selectedAnsOpts : Array<AnswerOptionDto>;

  constructor(
    private selectedResponseService : SelectedResponseService,
    private ansOptsService : AnswerOptionService,
    private dynamicDialogConfig : DynamicDialogConfig,
    private dynamicDialogRef : DynamicDialogRef
  ) { 
    this.selectedQuestion = this.dynamicDialogConfig.data.selectedQuestion;
    this.examStudent = this.dynamicDialogConfig.data.examStudent;
    this.asnOpts = new Array<AnswerOptionDto>();

    this.selectedAnsOpt = new AnswerOptionDto;
    this.selectedAnsOpts = new Array<AnswerOptionDto>();
  }

  ngOnInit(): void {
    this.getAnsOpts();
  }

  private getAnsOpts() : void {
    this.ansOptsService.getAnsOptByQuestion(this.selectedQuestion.id).subscribe(
      ansOpts => {
        this.asnOpts = ansOpts;
        this.asnOpts.forEach( ansOpt => this.getSelectedResponse(ansOpt));
      },
      error => console.log(error)
    )
  }

  private getSelectedResponse(ansOpt : AnswerOptionDto) : void {
    this.selectedResponseService.getSelectedResponseByExamStudentAndQuestion(this.examStudent.id, ansOpt.id).subscribe(
      selectedResponse => {
        if (selectedResponse && this.selectedQuestion.type === "mu" && selectedResponse.answerOption.id === ansOpt.id) {
          this.selectedAnsOpt = ansOpt;
        }
        else if(selectedResponse && this.selectedQuestion.type === "mm" && selectedResponse.answerOption.id === ansOpt.id) {
          this.selectedAnsOpts.push(ansOpt);
        }
      },
      error => console.log(error),
    );
  }

}
