import { Plugin } from "obsidian";

import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

export default class CalendarWrapperPlugin extends Plugin {
  public Calendar: any = null;
  public AllPlugins: any = null;

  async onload() {
    this.Calendar = Calendar;
    this.AllPlugins = [dayGridPlugin, timeGridPlugin, listPlugin];
    console.log("...magical Calendar Wrapper powers activate!");
  }

  async onunload() {
    this.Calendar = null;
    this.AllPlugins = null;
    console.log("Calendar Wrapper plugin unloaded.");
  }

  async dummyCalendar(calendarEl: HTMLElement) {
    let c = new Calendar(calendarEl, {
      plugins: this.AllPlugins,
      initialView: 'dayGridMonth',
      height: 900,
      events: 'https://fullcalendar.io/api/demo-feeds/events.json',
      headerToolbar: { left: 'prev,next today', center: 'title', right: 'dayGridMonth,timeGridWeek,listWeek' },
    });
    c.render();
  }
}
