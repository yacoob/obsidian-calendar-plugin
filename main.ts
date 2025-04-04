import { Plugin } from "obsidian";

import Calendar from "@event-calendar/core";
import DayGrid from "@event-calendar/day-grid";
import TimeGrid from "@event-calendar/time-grid";
import List from "@event-calendar/list";

export default class EventCalendarPlugin extends Plugin {
  public Calendar: any = null;
  public AllPlugins: any = null;

  async onload() {
    this.Calendar = Calendar;
    this.AllPlugins = [DayGrid, TimeGrid, List];
    console.log("...magical Event Calendar powers activate!");
  }

  async onunload() {
    this.Calendar = null;
    this.AllPlugins = null;
    console.log("Event Calendar plugin unloaded.");
  }
}
