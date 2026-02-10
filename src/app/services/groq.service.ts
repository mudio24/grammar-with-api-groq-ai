import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';

// Interface untuk response hasil grammar check dari AI
export interface GrammarResult {
    status: 'Correct' | 'Incorrect';
    correction: string;
}

@Injectable({
    providedIn: 'root'
})
export class GroqService {

    // API Key dari Groq
    private apiKey = 'YOUR_GROQ_API_KEY_HERE';

    // URL endpoint Groq API (OpenAI compatible)
    private apiUrl = 'https://api.groq.com/openai/v1/chat/completions';

    constructor(private http: HttpClient) { }

    /**
     * Fungsi untuk mengecek grammar menggunakan Groq AI
     * @param text - Teks yang akan dicek grammar-nya
     * @returns Observable<GrammarResult> - Hasil pengecekan dalam format JSON
     */
    checkGrammar(text: string): Observable<GrammarResult> {
        // Header untuk request ke Groq API
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`
        });

        // Prompt yang dikirim ke AI sesuai format yang diminta
        const prompt = `Check grammar for: ${text}. Return valid JSON { "status": "Correct/Incorrect", "correction": "..." }`;

        // Body request untuk Groq API (format OpenAI)
        const body = {
            model: 'llama-3.3-70b-versatile',
            messages: [
                {
                    role: 'user',
                    content: prompt
                }
            ],
            temperature: 0.3,
            max_tokens: 1024
        };

        // Kirim request POST ke Groq API
        return this.http.post<any>(this.apiUrl, body, { headers })
            .pipe(
                // Map response dari Groq ke format GrammarResult
                map(response => {
                    try {
                        // Ambil teks dari response Groq
                        const responseText = response.choices[0].message.content;

                        console.log('Raw AI Response:', responseText); // Debug log

                        // Bersihkan response dari markdown code block jika ada
                        let cleanedText = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

                        // Parse JSON dari response
                        const result: GrammarResult = JSON.parse(cleanedText);

                        return result;
                    } catch (error) {
                        // Jika parsing gagal, kembalikan default response
                        console.error('Error parsing AI response:', error);
                        return {
                            status: 'Incorrect' as const,
                            correction: 'Gagal memproses response dari AI'
                        };
                    }
                }),
                // Handle error dari HTTP request
                catchError(error => {
                    console.error('Error calling Groq API:', error);
                    return of({
                        status: 'Incorrect' as const,
                        correction: `Error: ${error.error?.error?.message || 'Terjadi kesalahan saat menghubungi AI'}`
                    });
                })
            );
    }
}
