# CS 260 Notes Fall 2025 Neve Callaway

[My startup - Simon](https://simon.cs260.click)

## Helpful links

- [Course instruction](https://github.com/webprogramming260)
- [Canvas](https://byu.instructure.com)
- [MDN](https://developer.mozilla.org)

## AWS

My IP address is: 98.89.159.49
I had an issue where my instance did not properly clone the course AWI, but once I tried to ssh into my server and saw that ls yielded no content, that helped me realize my issue.

## Caddy

Successfully obtained domain name and redirected traffic to my server. I encountered no issues changing the Caddy file and then creating a subdomain wildcard ('*.portraitportal.me'),

## HTML

- Cloned the HTML Simon repository to my development environment.
- Opened the project in VS Code and examined the application's use of HTML.
- Executed in my development environment using the VS Code Live Server extension.
- Debugged using the browser's dev tools to examine the loading of the HTML on the Network tab, and the HTML in the Elements tab.
- Deployed to my production environment using the deployment script so that it is available with my domain's simon subdomain (https://simon.portraitportal.me).

## CSS

So hard and confusing honestly, spacing was hard and remembering what was in each container, but debugging in browser helped. My classic mistake was not including Bootstrap properly so my header wouldn't load as I wanted to. Somehow forgot every single time. Had a hard time getting my files to show up on my domain properly as the deployFiles.sh expects them to be in a "/public" folder. Eventually had to change the file paths of every image reference and move everything to that expected directory.

## React Part 1: Routing

- Start dev server: `npm run dev`
- Public assets (images) served from `public/images` and referenced with absolute paths like `/images/logo_portrait_portal.png`
- If you add new component files, export them as named exports (`export function X(){}`) or adjust imports accordingly

## React Part 2: Reactivity

This was a lot of fun to see it all come together. I had to keep remembering to use React state instead of just manipulating the DOM directly.

Handling the toggling of the checkboxes was particularly interesting.

```jsx
<div className="input-group sound-button-container">
  {calmSoundTypes.map((sound, index) => (
    <div key={index} className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        value={sound}
        id={sound}
        onChange={() => togglePlay(sound)}
        checked={selectedSounds.includes(sound)}
      ></input>
      <label className="form-check-label" htmlFor={sound}>
        {sound}
      </label>
    </div>
  ))}
</div>
```
