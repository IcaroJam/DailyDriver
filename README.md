# DailyDriver
### A small dayplanning webapp

This projects aims to serve as a way to both learn svelte and webdev and also help me plan out my days a bit better.
The website is in early alpha, so expect bugs and a lack of common useful features. In spite of this, the minimum for it to be usable is already in place, so try it out!

I don't pretend to make a fully-fledged, multiplatform and portable app, but a tiny companion to help you manually keeping track of your stuff without getting too much in the way. 
It should also be customizable enough to adapt to your normal work schedule and theme preferences.

I also plan on allowing time independent tasks that act as simple ToDos, but none of that for now.

## Current Features
As of now, DailyDriver offers the following:
- Creation of tasks.
    - These tasks each hold a start and end hour and a description.
    - All their fields can be edited once created.
    - Tasks can be marked as completed.
    - Tasks can also be deleted.
    - Tasks are displayed as boxes laid out from their start to end hours.
- A green and brown palette that's cozy and soft on the eyes (at least to me, contrast is a bit too low for some people though).
- Animations and transitions for most stuff that makes it feel more alive and less stiff.
- Barebones configuration menu that allows the user to change the day's start and end hours. If a task would fall out of the new day range, no changes are made and a warning indicating the issue is displayed.
- Working mostly fine in both desktop and mobile.

## Planned features
- Settings and customization.
    - Being able to change the title bar text.
    - Having a set of default themes to choose from.
    - Being able to create custom themes, import and export them.
- Taskier tasks.
    - Currently tasks MUST have start and end times. Allowing for ToDos that aren't limited that way would be nice.
    - A way of viewing and marking tasks and todos as completed in a list-like fashion.
    - A way of batch-completing and batch-deleting tasks.
    - Better task overlapping. There's no defined behaviour for tasks to follow when they overlap, that's no good.
- A toggable time marker that moves in real time. Some kind of in-site indicator of the current time.
