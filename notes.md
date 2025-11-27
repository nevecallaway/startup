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

Deployed simon-react to simon.portraitportal.me successfully after debugging using browser. Then added reactivity to each app component, and completed deploying those files to server.

## Midterm Study Guide

### HTML & CSS

**Q: In the following code, what does the link element do?**
It links an external resource (usually a CSS file) to the HTML document. 
Example: `<link rel="stylesheet" href="styles.css">` applies styles from styles.css to the page.

**Q: In the following code, what does a div tag do?**
A `<div>` is a block-level container that groups other elements. It's used for structure and layout.
Examples (use in layouts):
```html
<div class="header"> ... </div>
<div class="content"> ... </div>
```
Divs have default `display:block` and take full width. They don't add behavior by themselves.

**Q: What is the difference between the #title and .grid selector?**
- `#title` selects an element by ID (unique)
- `.grid` selects elements by class (can apply to multiple elements)

**Q: What is the difference between padding and margin?**
- **Padding**: space inside the element (between content and border)
- **Margin**: space outside the element (between border and other elements)

**Q: Given this HTML and this CSS how will the images be displayed using flex?**
If the container uses `display: flex;`, the images will be displayed in a row by default, side by side, unless `flex-direction: column;` is specified.

**Q: What does the following padding CSS do?**
Example: `padding: 10px 20px;` adds 10px top/bottom and 20px left/right inside the element.

**Q: By default, the HTML span element has a default CSS display property value of:**
`inline`

**Q: How would you use CSS to change all the div elements to have a background color of red?**
```css
div { background-color: red; }
```

**Q: How would you display an image with a hyperlink in HTML?**
Wrap the `<img>` element with an `<a>` tag. Ensure the image file is in the correct folder (public or images/) and the src path points to it.
```html
<a href="https://example.com">
  <img src="images/logo.png" alt="Logo">
</a>
```

**Q: In the CSS box model, what is the ordering of the box layers starting at the inside and working out?**
Order: **Content → Padding → Border → Margin**
```
+----------------+
|     Margin     |
| +------------+ |
| |   Border   | |
| | +--------+ | |
| | |Padding | | |
| | |Content | | |
| | +--------+ | |
| +------------+ |
+----------------+
```

**Q: Given the following HTML, what CSS would you use to set the text "trouble" to green and leave the "double" text unaffected?**
Given `<p><span class="trouble">trouble</span> double</p>`, use:
```css
.trouble { color: green; }
```

### JavaScript

**Q: What does the following code using arrow syntax function declaration do?**
Arrow functions are a compact function syntax. `(a, b) => a + b` means a function with parameters a and b that returns a+b.
```javascript
const add = (a, b) => a + b;
const greet = name => `Hi ${name}`;
const square = x => { return x * x; } // block form
```
*Note: arrow functions do not bind their own 'this' and are not suitable as constructors.*

**Q: What does the following code using map with an array output?**
`map()` transforms every element of an array and returns a new array without mutating the original.
```javascript
const nums = [1,2,3];
const doubled = nums.map(n => n * 2); // [2,4,6]
const names = ['Amy','Bob'];
const greetings = names.map(n => `Hi ${n}`); // ['Hi Amy','Hi Bob']
```

**Q: What does the following code output using getElementById and addEventListener?**
Typical pattern:
```javascript
const btn = document.getElementById('btn');
btn.addEventListener('click', () => console.log('Clicked!'));
```
**Behavior**: When user clicks the element with id 'btn', the callback runs and prints 'Clicked!'.

**Q: What does the following line of Javascript do using a # selector?**
`document.querySelector('#title')` selects the first element that matches the CSS selector #title (element with id="title"). querySelector accepts any CSS selector (classes, attributes, pseudos).

**Q: What will the following code output when executed using a for loop and console.log?**
```javascript
for (let i = 0; i < 3; i++) { console.log(i); }
```
This initializes i=0, checks i<3 each loop, runs body and increments i++ after each iteration. 
**Output**: 0, 1, 2

**Q: How would you use JavaScript to select an element with the id of "byu" and change the text color of that element to green?**
```javascript
document.getElementById('byu').style.color = 'green';
// OR
const byu = document.getElementById('byu');
byu.style.color = 'green';
```

**Q: What is the correct syntax for creating a javascript object?**
```javascript
const person = { name: "John", age: 30 };
```

**Q: Is it possible to add new properties to javascript objects?**
Yes. Example: `person.city = "Provo";`

**Q: If you want to include JavaScript on an HTML page, which tag do you use?**
```html
<script src="script.js"></script>
```

**Q: Given the following HTML, what JavaScript could you use to set the text "animal" to "crow" and leave the "fish" text unaffected?**
```html
<p id="animal">animal</p>
<p id="fish">fish</p>
```
```javascript
document.getElementById('animal').textContent = 'crow';
// OR
const animal = document.getElementById('animal');
animal.textContent = 'crow';
```

### HTML Tags

**Q: What is the opening HTML tag for a paragraph, ordered list, unordered list, second level heading, first level heading, third level heading?**
- Paragraph: `<p>`
- Ordered list: `<ol>`
- Unordered list: `<ul>`
- First level heading: `<h1>`
- Second level heading: `<h2>`
- Third level heading: `<h3>`

**Q: How do you declare the document type to be html?**
```html
<!DOCTYPE html>
```

**Q: What is valid javascript syntax for if, else, for, while, switch statements?**
```javascript
if (x > 5) { ... } else { ... }
for (...) { ... }
while (...) { ... }
switch (x) { case 1: ...; break; default: ... }
```

### DOM

**Q: Which of the following are true about the DOM?**
- The DOM represents the HTML document as a tree of objects
- You can use JavaScript to access and modify DOM elements
- Each HTML element is a node in the DOM

### JSON

**Q: Which of the following correctly describes JSON?**
JSON (JavaScript Object Notation) is a text-based format for structured data using key-value pairs. 
Example: `{ "name": "John", "age": 25 }`

### Console Commands

**Q: What does each console command do?**
- `chmod` - change permissions
- `pwd` - print working directory
- `cd` - change directory
- `ls` - list files
- `vim/nano` - text editors
- `mkdir` - make directory
- `mv` - move/rename
- `rm` - remove
- `man` - manual
- `ssh` - remote shell
- `ps` - processes
- `wget` - download files
- `sudo` - run as admin

**Q: Which console command creates a remote shell session?**
`ssh`

**Q: What is true when the -la parameter is specified for the ls console command?**
`ls -la` lists all files (including hidden) in long format

### Networking & Web

**Q: For the domain name banana.fruit.bozo.click, which is the top level domain, which is a subdomain, which is a root domain?**
- **TLD**: .click
- **Root domain**: bozo.click
- **Subdomain**: fruit.bozo.click (and banana.fruit.bozo.click is a nested subdomain)

**Q: Is a web certificate necessary to use HTTPS?**
Yes, HTTPS requires a valid SSL/TLS certificate.

**Q: Can a DNS A record point to an IP address or another A record?**
A DNS A record points to an IP address; it should not point to another A record.

**Q: What protocol is each port reserved for?**
- Port 443 → HTTPS
- Port 80 → HTTP
- Port 22 → SSH

### Promises

**Q: What will the following code using Promises output when executed?**
Many possibilities depending on promise behavior. Examples:
```javascript
// 1) Resolved promise
Promise.resolve('Done').then(console.log) // → 'Done'

// 2) Rejected promise
Promise.reject('Error').catch(console.error) // → 'Error'

// 3) Delayed promise
new Promise(res => setTimeout(() => res('Hi'),1000)).then(console.log) // → 'Hi' after 1s

// 4) Promise chain
Promise.resolve(2).then(x=>x*2).then(x=>x+1).then(console.log) // → 5
```
## Service
- I learned that you need to make sure simon is deployed with an index.js script that specifies listening on a different port from startup.

### DB
- Successfully deployed simon-db to production environment

## MongoDB Integration
- Connected to MongoDB Atlas using connection string in dbConfig.json
- Created database.js module with async functions for user/commission CRUD
- Replaced in-memory arrays with persistent database storage
- Used bcrypt for password hashing, UUID for tokens

## Third-Party API
- Integrated Colormind.io color palette API via backend proxy endpoint
- Transformed RGB arrays to hex color strings for frontend
- Handled CORS by proxying through Express backend

## Deployed Simon Websocket
- Not quite sure how to run VSCode debugger, going to watch video again