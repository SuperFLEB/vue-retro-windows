# @superfleb/retrowin

A Web "Window environment" with 80s-90s retro flavor.

## Status: Very rough. Very WIP.

This is still in very early development, as is this README. I'm just putting something basic here so there's a readme. 

[There's a demo, though, if you want to see how it's going](https://superfleb.github.io/vue-retro-windows/)

### What works:

- Multiple themes with appropriate image processing.
- Spawning "application" components from launcher icons.
- Multiple instances.
- Menus work, though the demo ones don't do much.

### What's still being worked on

- The ability to terminate applications and close windows. (Yeah, window close buttons do nothing right now.)
- Stacking order when launching a new app/window. Right now, new windows don't come to the front.
- The ability to drag and rearrange launcher icons.
- Folders.
- Persistent sessions.
- Implement system menus (e.g., Windows context menu.)
- MDI (windows inside windows) and breaking it on a theme-by-theme basis.

### Known cosmetic defects

- There's still some jank to weed out in menus, esp. with separators.
- Three Point Win MDI needs to have small context menu icons on interior windows.

Come back later to see more.

## License

I'm planning to put this on some sort of open source license, but I haven't yet.

Some components (fonts, mostly) are licensed under their own terms. Consult license documentation in individual directories for details.

