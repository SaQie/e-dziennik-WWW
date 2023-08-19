import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ScriptService } from './script.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { ScriptResult } from './model/ScriptResult';
import { HttpError } from 'src/app/common/error/HttpError';
import { ErrorDialogComponent } from 'src/app/common/error/error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { SuccessOperationComponent } from 'src/app/common/success/success-operation/success-operation.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-script',
  templateUrl: './script.component.html',
  styleUrls: ['./script.component.scss']
})
export class ScriptComponent implements OnInit, AfterViewInit {

  executingScript = false;
  scriptContentForm: FormGroup;
  scriptResult!: ScriptResult;
  @ViewChild('scriptTextArea') scriptTextArea!: ElementRef;

  constructor(
    private service: ScriptService,
    private formBuilder: FormBuilder,
    private detectChangeRef: ChangeDetectorRef,
    private dialog: MatDialog) {

    this.scriptContentForm = formBuilder.group({
      scriptContent: ['', Validators.required],
    })

  }
  ngAfterViewInit(): void {
    this.scriptTextArea.nativeElement.value = "// Groovy script executor \n \n//Write code here \n \nreturn new ScriptResult(value); // Put result value into constructor";
  }

  ngOnInit(): void {
    
  }

  runScript() {
    if (this.scriptContentForm.valid) {
      const scriptContent = this.scriptContentForm.value['scriptContent'];
      const scriptContent2 = {
        scriptContent: scriptContent
      }
      this.executingScript = true;
      this.service.execute(scriptContent2).subscribe({
        next: (response: HttpResponse<any>) => {
          console.log(response);
          this.executingScript = false;
          const location = response.headers.keys();
          console.log(location);
          const locationHeader = response.headers.get('Location');
          this.callForScriptResult(locationHeader!);
          this.detectChangeRef.detectChanges();
        },
        error: (error: HttpError[]) => {
          this.executingScript = false;
          this.dialog.open(ErrorDialogComponent, {
            data: {
              message: 'An error occurred during executing script.',
              error: error
            }
          });
          this.detectChangeRef.detectChanges();
        }
      });
    }
  }

  handleKeydown(event:KeyboardEvent){
    if (event.key === 'Tab'){
      const start = this.scriptTextArea.nativeElement.selectionStart;
      const end = this.scriptTextArea.nativeElement.selectionEnd;

      
      const spaces = '\t';
      this.scriptTextArea.nativeElement.value =
        this.scriptTextArea.nativeElement.value.substring(0, start) +
        spaces +
        this.scriptTextArea.nativeElement.value.substring(end);

      
      this.scriptTextArea.nativeElement.selectionStart = start + spaces.length;
      this.scriptTextArea.nativeElement.selectionEnd = start + spaces.length;

      return false;
    }
    return true;
  }

  private callForScriptResult(httpRequest: string) {
    this.service.getResult(httpRequest).subscribe({
      next: (scriptResult: ScriptResult) => {
        this.scriptResult = scriptResult;
      }
    })
  }


}
