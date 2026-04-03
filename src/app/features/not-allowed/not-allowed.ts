import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';

@Component({
  selector: 'app-not-allowed',
  standalone: true,
  templateUrl: './not-allowed.html',
  styleUrl: './not-allowed.scss'
})
export class NotAllowedComponent implements OnInit {

  ngOnInit() {
    this.startFakeHack();
  }

  startFakeHack() {
    const terminal = document.getElementById('terminal-output');

    const ip = `192.168.${this.rand()}.${this.rand()}`;
    const device = navigator.userAgent.split(' ')[0];

    const lines = [
      "> Initializing secure breach protocol...",
      "> Bypassing firewall...",
      "> Access granted...",
      `> Target IP detected: ${ip}`,
      "> Scanning device...",
      `> Device identified: ${device}`,
      "> Accessing location...",
      "> Connecting to satellite...",
      "> Fetching coordinates...",
      "> Location Found: India 🇮🇳",
      "> Injecting tracking script...",
      "> Uploading user data...",
      "> WARNING: Unauthorized access detected 🚨",
      "> Sending logs to admin server...",
      "> ALERT: System trace activated ⚠️",
      "> Notifying cyber security...",
      "> 🚓 Authorities have been alerted...",
    ];

    let i = 0;

    const interval = setInterval(() => {
      if (i < lines.length) {
        const p = document.createElement('p');
        p.innerText = lines[i];

        // make last lines red
        if (i > 10) {
          p.classList.add('red');
        }

        terminal?.appendChild(p);
        setTimeout(() => {
          terminal!.scrollTop = terminal!.scrollHeight;
        }, 50);

        i++;
      } else {
        clearInterval(interval);
      }
    }, 800); // speed of typing
  }

  rand() {
    return Math.floor(Math.random() * 255);
  }
}