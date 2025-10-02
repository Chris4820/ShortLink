import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService, type LocalStorageShortLinks } from '../../core/localstorage.service';

import { Urls } from './urls';

describe('Urls', () => {
  let component: Urls;
  let fixture: ComponentFixture<Urls>;
  let mockLocalStorageService: jasmine.SpyObj<LocalStorageService>;

  const mockUrls$ = new BehaviorSubject<LocalStorageShortLinks[]>([]);

  beforeEach(async () => {
    mockLocalStorageService = jasmine.createSpyObj<LocalStorageService>('LocalStorageService', ['removeItem'], { urls$: mockUrls$ });

    await TestBed.configureTestingModule({
      imports: [Urls],
      providers: [
        { provide: LocalStorageService, useValue: mockLocalStorageService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Urls);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe to urls$ and update urls', () => {
    const testUrls: LocalStorageShortLinks[] = [
      { name: 'Test URL', hash: 'abc123', redirectTo: 'https://example.com' }
    ];
    mockUrls$.next(testUrls);
    expect(component.urls).toEqual(testUrls);
  });

  it('should call removeItem with the correct hash on deleteUrl', () => {
    const hash = 'def456';
    component.deleteUrl(hash);
    expect(mockLocalStorageService.removeItem).toHaveBeenCalledWith(hash);
  });
});