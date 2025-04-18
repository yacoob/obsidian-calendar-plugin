import { Plugin } from "obsidian";

import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

export default class CalendarWrapperPlugin extends Plugin {
  public Calendar = Calendar;
  public AllPlugins = [dayGridPlugin, timeGridPlugin, listPlugin];

  async onload() {
    console.log("...magical Calendar Wrapper powers activate!");
  }

  async onunload() {
    console.log("Calendar Wrapper plugin unloaded.");
  }

  public dummyCalendar(calendarEl: HTMLElement): void {
    const c = new Calendar(calendarEl, {
      plugins: this.AllPlugins,
      initialView: 'dayGridMonth',
      height: 900,
      events: 'https://fullcalendar.io/api/demo-feeds/events.json',
      headerToolbar: { left: 'prev,next today', center: 'title', right: 'dayGridMonth,timeGridWeek,listWeek' },
    });
    c.render();
  }
}
