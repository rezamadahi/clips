import {Component, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AngularFireStorage, AngularFireUploadTask} from "@angular/fire/compat/storage";
import {v4 as uuid} from "uuid";
import {last, switchMap} from "rxjs/operators";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import firebase from "firebase/compat/app";
import {ClipService} from "../../services/clip.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnDestroy {
  isDragover = false;
  file: File | null = null;
  nextStep = false;
  showAlert = false;
  alertColor = 'blue';
  alertMsg = 'Please wait! Your clip is being uploaded.';
  inSubmission = false;
  percentage = 0;
  showPercentage = false;
  user: firebase.User | null = null;
  task?: AngularFireUploadTask;

  titleController = new FormControl('', {
    validators:     [
      Validators.required,
      Validators.minLength(3),
    ],
    nonNullable: true,
  });

  uploadForm = new FormGroup({
    title: this.titleController,
  });

  constructor(
    private storage: AngularFireStorage,
    private auth: AngularFireAuth,
    private clipsService: ClipService,
    private router: Router,
  ) {
    auth.user.subscribe(user => {this.user = user});
  }

  storeFile($event: Event) {
    this.isDragover = false;
    this.file = ($event as DragEvent).dataTransfer ?
      (($event as DragEvent).dataTransfer?.files.item(0) ?? null) :
      (($event.target as HTMLInputElement).files?.item(0) ?? null);

    if (!this.file || this.file.type !== 'video/mp4') {
      return
    }
    this.titleController.setValue(this.file.name.replace(/\.[^/.]+$/, ''));
    this.nextStep = true;
  }

  uploadFile() {
    this.uploadForm.disable();
    this.showAlert = true;
    this.alertColor = 'blue';
    this.alertMsg = 'Please wait! Your clip is being uploaded.';
    this.inSubmission = true;
    this.showPercentage = true;

    const clipFileName = uuid();
    const clipPath = `clips/${clipFileName}.mp4`;

    this.task = this.storage.upload(clipPath, this.file);
    const clipRef = this.storage.ref(clipPath);

    this.task.percentageChanges().subscribe(progress => {
      this.percentage = progress as number / 100;
    });

    this.task.snapshotChanges().pipe(
      last(),
      switchMap(() => clipRef.getDownloadURL())
    ).subscribe({
      next: async (url) => {
        const clip = {
          uid: this.user?.uid as string,
          displayName: this.user?.displayName as string,
          title: this.titleController.value,
          fileName: `${clipFileName}.mp4`,
          url,
        };

        const clipDocRef =  await this.clipsService.createClip(clip);

        this.alertColor = 'green';
        this.alertMsg = 'Success! Your clip is now ready to share with the world';
        this.showPercentage = false;

        setTimeout(() => {
          this.router.navigate([
            'clip', clipDocRef.id,
          ]);
        }, 1000);
      },
      error: (err) => {
        this.uploadForm.enable();
        this.alertColor = 'red';
        this.alertMsg = 'Upload failed! Please try again later.';
        this.inSubmission = true;
        this.showPercentage = false;
        console.log(err);
      },
    });
  }

  ngOnDestroy() {
    this.task?.cancel();
  }

}
