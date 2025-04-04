import { Plugin } from "obsidian";
import Calendar from "@event-calendar/core";
import TimeGrid from "@event-calendar/time-grid";

export default class EventCalendarPlugin extends Plugin {
  public Calendar = Calendar;
  public TimeGrid = TimeGrid;

  async onload() {
    console.log("magical Event Calendar powers activate!");
  }
}
