import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import Quill from 'quill';

@Component({
  selector: 'app-content-blocks-page',
  templateUrl: './content-blocks-page.component.html',
  styleUrls: ['./content-blocks-page.component.css']
})
export class ContentBlocksPageComponent implements AfterViewInit {
  @ViewChild('editor') editor: ElementRef<HTMLDivElement>;

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit called', this.editor);

    if (this.editor) {
      const quill = new Quill(this.editor.nativeElement, {
        theme: 'snow',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['blockquote', 'code-block'],
          
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
            [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
          
            // [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          
            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            // [{ 'font': [] }],
            [{ 'align': [] }],
          
            // ['clean']                                         // remove formatting button
            ['omega']
          ],
          table: true
        }
      });

      var toolbar = quill.getModule('toolbar') as { addHandler: (name: string, callback: () => void) => void };
      toolbar.addHandler('omega', function() {
        console.log('omega')
      });

      window.setTimeout(() => {
        var customButton = document.querySelector('.ql-omega');
        customButton.addEventListener('click', function() {
          var range = quill.getSelection();
          if (range) {
            quill.insertText(range.index, "Ω", Quill.sources.USER);
          }
        });
      });
      
    }
  }
}
