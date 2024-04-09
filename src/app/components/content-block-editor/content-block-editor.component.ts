import { AfterViewInit, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { ApiService } from '@services/api.service';
import Quill from 'quill';

@Component({
  selector: 'app-content-block-editor',
  templateUrl: './content-block-editor.component.html',
  styleUrls: ['./content-block-editor.component.css']
})
export class ContentBlockEditorComponent implements OnChanges, AfterViewInit {
  @Input() key: string;
  @ViewChild('editor') editor: ElementRef<HTMLDivElement>;

  private quill: Quill;
  
  constructor(
    private api: ApiService,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.api.contentBlocks$(this.key).subscribe((blocks) => {
      this.quill.root.innerHTML = blocks.slice(-1)[0].ContentHTML;
    });
  }
  
  ngAfterViewInit(): void {
    if (!this.editor) return;
    
    this.quill = new Quill(this.editor.nativeElement, {
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
          // TODO: CHAD: Table isn't working right, maybe in a newer version...
          //[{'table': [ 'insert', 'delete', 'insert-row-above', 'insert-row-below', 'insert-column-left', 'insert-column-right', 'delete-row', 'delete-column']}]
        ],
        table: true
      },
    });

    this.api.contentBlocks$(this.key).subscribe((blocks) => {
      this.quill.root.innerHTML = blocks.slice(-1)[0].ContentHTML;
    });

    // const table = quill.getModule('table') as any;
    
    // window.setTimeout(() => {
    //   document.querySelector('.ql-picker-item[data-value="insert"]').addEventListener('click', function() {
    //     var range = quill.getSelection();
    //     if (range) {
    //       table.insertTable(2, 2);
    //     }
    //   });

    //   document.querySelector('.ql-picker-item[data-value="delete"]').addEventListener('click', function() {
    //     var range = quill.getSelection();
    //     if (range) {
    //       table.deleteTable();
    //     }
    //   });

    //   document.querySelector('.ql-picker-item[data-value="insert-row-above"]').addEventListener('click', function() {
    //     var range = quill.getSelection();
    //     if (range) {
    //       table.insertRowAbove();
    //     }
    //   });

    //   document.querySelector('.ql-picker-item[data-value="insert-row-below"]').addEventListener('click', function() {
    //     var range = quill.getSelection();
    //     if (range) {
    //       table.insertRowBelow();
    //     }
    //   });

    //   document.querySelector('.ql-picker-item[data-value="insert-column-left"]').addEventListener('click', function() {
    //     var range = quill.getSelection();
    //     if (range) {
    //       table.insertColumnLeft();
    //     }
    //   });

    //   document.querySelector('.ql-picker-item[data-value="insert-column-right"]').addEventListener('click', function() {
    //     var range = quill.getSelection();
    //     if (range) {
    //       table.insertColumnRight();
    //     }
    //   });

    //   document.querySelector('.ql-picker-item[data-value="insert-delete-row"]').addEventListener('click', function() {
    //     var range = quill.getSelection();
    //     if (range) {
    //       table.deleteRow();
    //     }
    //   });

    //   document.querySelector('.ql-picker-item[data-value="insert-delete-column"]').addEventListener('click', function() {
    //     var range = quill.getSelection();
    //     if (range) {
    //       table.deleteColumn();
    //     }
    //   });
    // });
  }
}
