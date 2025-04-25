import { Plugin } from "obsidian";

import { Calendar } from '@fullcalendar/core';
import CalendarWrapper from 'wrapper';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

const allPlugins = [dayGridPlugin, timeGridPlugin, listPlugin];

function createCalendar(calendarEl: HTMLElement, url: string): void {
  const c = new Calendar(calendarEl, {
    plugins: allPlugins,
    initialView: 'dayGridMonth',
    height: 900,
    events: url,
    headerToolbar: { left: 'prev,next today', center: 'title', right: 'dayGridMonth,timeGridWeek,listWeek' },
  });
  c.render();
}

function dummyCalendar(calendarEl: HTMLElement): void {
  createCalendar(calendarEl, 'https://fullcalendar.io/api/demo-feeds/events.json');
}

export default class CalendarWrapperPlugin extends Plugin {
  public Calendar = Calendar;
  public AllPlugins = allPlugins;
  public CalendarWrapper = CalendarWrapper;

  public createCalendar = createCalendar;
  public dummyCalendar = dummyCalendar;

  async onload() {
    console.log("...magical Calendar Wrapper powers activate!");
  }

  async onunload() {
    console.log("Calendar Wrapper plugin unloaded.");
  }
}
