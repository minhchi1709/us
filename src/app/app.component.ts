import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';

import moment from 'moment';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit, OnInit {
  readonly phoneWidth: number = 850
  readonly start = moment([2023, 7, 30, 18, 47, 29])
  @ViewChild('time', {static: true}) time!: ElementRef;
  isMobile: boolean = false
  backgroundSrc: string = 'assets/bg-pc.jpg'

  constructor(
    private titleService: Title,
  ) {
  }

  ngOnInit(): void {
    this.updateLayout()
  }

  ngAfterViewInit(): void {
    const time = this.time.nativeElement
    const updateDisplayedTime = () => {
      const duration = moment.duration(moment().diff(this.start))
      const year = duration.years()
      const month = duration.months()
      const day = duration.days()
      const hours = duration.hours()
      const minutes = duration.minutes()
      const seconds = duration.seconds()
      let displayedTime = ''
      if (year) {
        displayedTime += `${year} ${year > 1 ? 'YEARS' : 'YEAR'} `
      }
      if (month || displayedTime) {
        displayedTime += `${month} ${month > 1 ? 'MONTHS' : 'MONTH'} `
      }
      if (day || displayedTime) {
        displayedTime += `${day} ${day > 1 ? 'DAYS' : 'DAY'} `
      }
      displayedTime += `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
      time.innerText = displayedTime

      const days = moment().diff(this.start, 'days')
      this.titleService.setTitle(`Been ${days} days together`)
    }

    updateDisplayedTime()

    setInterval(() => {
      updateDisplayedTime()
    }, 1000)
  }

  @HostListener('window:resize', [])
  onResize(): void {
    this.updateLayout();
  }

  private updateLayout(): void {
    this.isMobile = window.innerWidth <= this.phoneWidth
    this.backgroundSrc = `assets/bg-${this.isMobile ? 'mobile' : 'pc'}.jpg`
  }
}
