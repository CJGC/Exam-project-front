import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ExamDto } from '../dto/ExamDto';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  constructor(private http : HttpClient) { }

  public getExams() : Observable<Array<ExamDto>> {
    return this.http.get<Array<ExamDto>>(environment.apiURL + 'exam/all');
  }

  public getExamByProfessor(professorID : Number) : Observable<Array<ExamDto>> {
    let url : string = environment.apiURL + 'exam/byprofessor?id=' + professorID.toString();
    console.log(url);
    return this.http.get<Array<ExamDto>>(url);
  }

  public getExamByLink(link : String) : Observable<ExamDto> {
    return this.http.get<ExamDto>(environment.apiURL + 'exam/bylink?id=' + link);
  }

  public saveExam(exam : ExamDto) : Observable<ExamDto> {
    return this.http.post<ExamDto>(environment.apiURL + 'exam', exam);
  }

  public updateExam(exam : ExamDto) : Observable<ExamDto> {
    return this.http.put<ExamDto>(environment.apiURL + 'exam', exam);
  }

  public delExam(exam : ExamDto) : Observable<String> {
    return this.http.delete(environment.apiURL + 'exam/' + exam.id, {responseType : 'text'});
  }
}
