import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonTextarea,
  IonCard,
  IonCardContent,
  IonSpinner
} from '@ionic/angular/standalone';
import { debounceTime, distinctUntilChanged, switchMap, tap, filter } from 'rxjs/operators';
import { Subscription, of } from 'rxjs';
import { GroqService, GrammarResult } from '../services/groq.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonTextarea,
    IonCard,
    IonCardContent,
    IonSpinner
  ],
})
export class HomePage implements OnInit, OnDestroy {

  // FormControl untuk textarea input - biar bisa pake valueChanges
  inputControl = new FormControl('');

  // Status loading saat sedang mengecek grammar
  isLoading = false;

  // Hasil dari pengecekan grammar
  grammarResult: GrammarResult | null = null;

  // Subscription untuk clean up saat component destroy
  private grammarSubscription: Subscription | null = null;

  constructor(private groqService: GroqService) { }

  ngOnInit(): void {
    // Setup reactive stream untuk memantau perubahan input
    this.setupGrammarChecker();
  }

  ngOnDestroy(): void {
    // Bersihkan subscription saat component dihancurkan
    if (this.grammarSubscription) {
      this.grammarSubscription.unsubscribe();
    }
  }

  /**
   * Setup stream reactive untuk grammar checking
   * Menggunakan pipe RxJS: debounceTime, distinctUntilChanged, switchMap
   */
  private setupGrammarChecker(): void {
    this.grammarSubscription = this.inputControl.valueChanges
      .pipe(
        // Aktifkan loading indicator saat user mulai mengetik
        tap(() => {
          if (this.inputControl.value && this.inputControl.value.trim().length > 0) {
            this.isLoading = true;
            this.grammarResult = null;
          }
        }),

        // Tunggu 1 detik setelah user berhenti mengetik
        debounceTime(1000),

        // Cegah request duplikat jika teks sama
        distinctUntilChanged(),

        // Filter: hanya proses jika teks tidak kosong
        filter(text => !!text && text.trim().length > 0),

        // Batalkan request lama, ganti dengan request baru
        switchMap(text => {
          // Kirim request ke Groq service
          return this.groqService.checkGrammar(text!.trim());
        })
      )
      .subscribe({
        next: (result) => {
          // Simpan hasil dan matikan loading
          this.grammarResult = result;
          this.isLoading = false;
        },
        error: (error) => {
          // Handle error
          console.error('Grammar check error:', error);
          this.isLoading = false;
          this.grammarResult = {
            status: 'Incorrect',
            correction: 'Terjadi kesalahan saat mengecek grammar.'
          };
        }
      });
  }
}
