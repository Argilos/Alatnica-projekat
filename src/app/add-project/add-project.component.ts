import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent {
  message: string = '';
  ugovorId: string = '';
  company: string = '';
  year: number = 0;

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  openSuccessSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 2000,
      panelClass: ['success-snackbar']
    });
  }

  openErrorSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 2000,
      panelClass: ['error-snackbar']
    });
  }

  onSubmit() {
    const projectData = {
      ugovorId: this.ugovorId,
      company: this.company,
      year: this.year
    };

    // Check if the ugovorId already exists
    this.http.get(`http://localhost:3000/projects/${this.ugovorId}`)
      .subscribe({
        next: (existingProject) => {
          // If a project with the same ugovorId already exists, display an error message
          console.log('Project with the same ugovorId already exists:', existingProject);
          this.openSnackBar('Projekt s istim ugovorom već postoji', 'Zatvori', 'error-snackbar');
        },
        error: (error) => {
          // If no project with the same ugovorId exists, proceed to add the new project
          if (error.status === 404) {
            this.addNewProject(projectData);
          } else {
            console.error('Error checking for existing project:', error);
            // Optionally, display an error message to the user
            this.openSnackBar('Došlo je do pogreške prilikom provjere projekta', 'Zatvori', 'error-snackbar');
          }
        }
      });
  }

  addNewProject(projectData: any) {
    // Add the new project to the database
    this.http.post('http://localhost:3000/projects', projectData)
      .subscribe({
        next: (response) => {
          console.log('Project added successfully:', response);
          // Display a success message to the user
          this.openSnackBar('Projekt uspješno dodan', 'Zatvori', 'success-snackbar');
          // Optionally, you can redirect the user to the project list page
        },
        error: (error) => {
          console.error('Error adding project:', error);
          // Display an error message to the user
          this.openSnackBar('Došlo je do pogreške prilikom dodavanja projekta', 'Zatvori', 'error-snackbar');
        }
      });
  }

  openSnackBar(message: string, action: string, cssClass: string) {
    this.snackBar.open(message, action, {
      duration: 5000, // Duration in milliseconds
      panelClass: [cssClass] // Apply custom CSS class
    });
  }
}
