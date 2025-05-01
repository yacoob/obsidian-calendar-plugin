import { Plugin } from "obsidian";
import { getAPI } from "obsidian-dataview";
import type {
  SMarkdownPage,
  STask,
} from "obsidian-dataview/lib/data-model/serialized/markdown";
import type { DateTime } from "luxon";
import { Calendar } from "@fullcalendar/core";

import CalendarWrapper from "wrapper";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
//
// Custom types for tasks with scheduled property
type OptionalScheduledTask = STask & { scheduled?: DateTime };
type ScheduledTask = STask & { scheduled: DateTime };


const allPlugins = [dayGridPlugin, timeGridPlugin, listPlugin];
const validStatuses = [" ", "x", "*"];
const dateRegex = /\/(2\d{3}-\d{2}-\d{2})\.md$/;
const timeRegex = /^(\d{1,2}):(\d{2})\s+/;

function calendarTasks(): Array<object> {
  const dv = getAPI();
  const tasks = dv
    .pages('"bujo"')
    // grab all bujo files' tasks
    .where((p: SMarkdownPage) => p.file.path.startsWith("bujo/2"))
    .file.tasks// filter to interesting statuses
    .where((t: STask) => validStatuses.includes(t.status))
    // add scheduled property for tasks in daily notes
    .map((t: STask) => {
      const match = t.path.match(dateRegex);
      return match
        ? { ...t, scheduled: dv.luxon.DateTime.fromISO(match[1]) }
        : t;
    })
    .where((t: OptionalScheduledTask) => t.scheduled)
    // Add time information if present in the task text
    .map((t: ScheduledTask) => {
      // Check for time pattern at the beginning of the task text (HH:MM)
      const match = t.text.match(timeRegex);
      return match
        ? {
          ...t,
          allDay: false,
          scheduled: t.scheduled.set({ hour: match[1], minute: match[2] }),
          text: t.text.replace(timeRegex, ''),
        }
        : t;
    });

  // TODO: color depending on status (and maybe origin/type?)

  // convert to objects for fullcalendar
  const calendarTasks = tasks.array().map((t: ScheduledTask) => {
    return {
      allDay: t.allDay,
      start: t.scheduled.toISO(),
      // strip everything past first emoji
      title: t.text.replace(/ [\p{Emoji}].*$/u, ""),
    };
  });

  return calendarTasks;
}

function createCalendar(
  calendarEl: HTMLElement,
  events: string | Array<object>,
): void {
  const c = new Calendar(calendarEl, {
    plugins: allPlugins,
    initialView: "dayGridMonth",
    height: 900,
    firstDay: 1,
    events: events,
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,listWeek",
    },
  });
  c.render();
}

function dummyCalendar(calendarEl: HTMLElement): void {
  createCalendar(
    calendarEl,
    "https://fullcalendar.io/api/demo-feeds/events.json",
  );
}

function actualCalendar(calendarEl: HTMLElement): void {
  createCalendar(calendarEl, calendarTasks());
}

export default class CalendarWrapperPlugin extends Plugin {
  public Calendar = Calendar;
  public AllPlugins = allPlugins;
  public CalendarWrapper = CalendarWrapper;

  public createCalendar = createCalendar;
  public dummyCalendar = dummyCalendar;
  public actualCalendar = actualCalendar;

  async onload() {
    console.log("...magical Calendar Wrapper powers activate!");
  }

  async onunload() {
    console.log("Calendar Wrapper plugin unloaded.");
  }
}
