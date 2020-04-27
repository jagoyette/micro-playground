import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Media } from 'src/app/models/media';
import { PatientMediaService } from 'src/app/services/patient-media.service';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-new-media-dialog',
  templateUrl: './new-media-dialog.component.html',
  styleUrls: ['./new-media-dialog.component.scss']
})
export class NewMediaDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<NewMediaDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private mediaService: PatientMediaService) { }

  private patientUuid: string;
  public media: Media;
  public progress: number;

  // Data for dialog
  public fileInfo = {
    fileName: '',
    contentType: '',
    file: null
  };

  ngOnInit(): void {
    this.patientUuid = this.data.patientUuid;
    console.log('Displaying new media dialog for patient: ' + this.patientUuid);
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
    this.media = null;
    this.dialogRef.close();
  }

  onUpload(): void {
    this.mediaService.createMediaItem(this.patientUuid,
      this.fileInfo.fileName, this.fileInfo.contentType, this.fileInfo.file)
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
          console.log('Upload progress: ' + this.progress + '%');
        }
        else if (event.type === HttpEventType.Response) {
          this.media = event.body;
          console.log('Uploaded new media with uuid: ' + this.media.uuid);

          this.dialogRef.close(this.media);
        }
      });
  }
}
