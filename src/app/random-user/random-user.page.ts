import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonButton,
    IonAvatar,
    IonItem,
    IonLabel,
    IonIcon,
    IonSpinner,
    IonButtons,
    IonMenuButton
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { refreshOutline, personOutline, mailOutline, locationOutline } from 'ionicons/icons';

@Component({
    selector: 'app-random-user',
    templateUrl: './random-user.page.html',
    styleUrls: ['./random-user.page.scss'],
    standalone: true,
    imports: [
        CommonModule,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        IonCard,
        IonCardHeader,
        IonCardTitle,
        IonCardSubtitle,
        IonCardContent,
        IonButton,
        IonAvatar,
        IonItem,
        IonLabel,
        IonIcon,
        IonSpinner,
        IonButtons,
        IonMenuButton
    ]
})
export class RandomUserPage {
    user: any = null;
    loading = false;

    constructor(private http: HttpClient) {
        addIcons({ refreshOutline, personOutline, mailOutline, locationOutline });
    }

    // API Call using async/await and Promise
    async generateUser() {
        this.loading = true;
        this.user = null; // Reset user data while loading

        try {
            // 1. Convert Observable to Promise using lastValueFrom
            const observable$ = this.http.get<any>('http://localhost:3000/api/random-user');
            const response = await lastValueFrom(observable$);

            // 2. Process the response
            if (response && response.results && response.results.length > 0) {
                this.user = response.results[0];
            }
        } catch (error) {
            console.error('Error fetching random user:', error);
            // Handle error (optional: show toast or alert)
        } finally {
            this.loading = false;
        }
    }
}
