import { Component, ElementRef, ViewChild } from '@angular/core';
import { Template, BLANK_PDF, PreviewProps } from '@pdfme/common';
import { generate } from '@pdfme/generator';
import { Form } from '@pdfme/ui';
import template from 'src/assets/pdfTemplatePayloads/basicComparingWithWords';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'miss-davis-designs';
  @ViewChild('myDiv') myDiv: ElementRef;

  userInput: any;

  async createPDF() {
    const inputs = [{ num1a: '' }];
    const div = <HTMLElement>this.myDiv.nativeElement;
    const form = new Form({ domContainer: div, template, inputs });

    // generate({ template, inputs, options: { font } }).then((pdf) => {
    //   const blob = new Blob([pdf.buffer], { type: 'application/pdf' });
    //   window.open(URL.createObjectURL(blob));
    // });
    this.userInput = form.getInputs();
  }
  async generatePDF() {
    const font = {
      KGBehindTheseHazelEyes: {
        data: await fetch('../assets/fonts/KGBehindTheseHazelEyes.ttf').then(
          (res) => res.arrayBuffer()
        ),
      },
      KGCornerOfTheSky: {
        data: await fetch('../assets/fonts/KGCorneroftheSky.ttf').then((res) =>
          res.arrayBuffer()
        ),
        fallback: true,
      },
    };

    generate({ template, inputs: this.userInput, options: { font } }).then(
      (pdf) => {
        const blob = new Blob([pdf.buffer], { type: 'application/pdf' });
        window.open(URL.createObjectURL(blob));
      }
    );
  }
}
