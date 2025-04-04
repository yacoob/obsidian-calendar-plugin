# Event Calendar wrapper for Obsidian

This is an exploratory plugin that wraps https://github.com/vkurko/calendar for usage in Obsidian. Very much work in progress, not for public consumption etc.

## Example usage

```dataviewjs
const ec = app.plugins.plugins["event-calendar"];
console.log(ec);

let c = new ec.Calendar({
  target: this.container,
  props: {
    plugins: [ec.TimeGrid],
    options: {
      view: 'timeGridWeek',
    }
  }
})
```
