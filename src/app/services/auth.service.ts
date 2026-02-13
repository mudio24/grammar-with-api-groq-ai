import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Preferences } from '@capacitor/preferences';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:3000/api';
    private TOKEN_KEY = 'auth_token';

    constructor(private http: HttpClient) { }

    register(data: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/register`, data);
    }

    login(data: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/login`, data);
    }

    async setToken(token: string): Promise<void> {
        await Preferences.set({
            key: this.TOKEN_KEY,
            value: token
        });
    }

    async getToken(): Promise<string | null> {
        const { value } = await Preferences.get({ key: this.TOKEN_KEY });
        return value;
    }

    async isLoggedIn(): Promise<boolean> {
        const token = await this.getToken();
        return !!token; // Mengembalikan true jika token ada, false jika null
    }

    async logout(): Promise<void> {
        await Preferences.remove({ key: this.TOKEN_KEY });
    }
}
