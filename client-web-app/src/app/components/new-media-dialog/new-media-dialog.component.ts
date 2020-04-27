import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Media } from 'src/app/models/media';

@Component({
  selector: 'app-new-media-dialog',
  templateUrl: './new-media-dialog.component.html',
  styleUrls: ['./new-media-dialog.component.scss']
})
export class NewMediaDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<NewMediaDialogComponent>) { }

  public media: Media;
  public fileInfo = {
    fileName: '',
    contentType: '',
    file: null
  };

  ngOnInit(): void {
  }

  updateFileInfo(files: File[]) {
    if (files && files.length > 0) {
      const file = files[0];
      this.fileInfo.fileName = file.name;
      this.fileInfo.contentType = file.type;
      this.fileInfo.file = file;
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onUpload(): void {

  }
}
