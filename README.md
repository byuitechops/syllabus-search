# syllabus-search
## Description 
A way to search for content for each syllabus html for each course in a given Canvas account

## How to Install
First clone the repo:

```bash
git clone https://github.com/byuitechops/syllabus-search.git
```

Then install dependencies:

```bash
npm install
```

## How to Use
There are two things that need to be modified in the code to run:

First, in the `domain` object there are four properties:

```js
// which account to run the tool on
const domain = {
    campus: 48,
    online: 5,
    pathway: 24,
    everything: 1
};
```

To select which account's courses you would like to run the tool on, change the property referenced in the main API call in `main()` where it says `${domain.campus}` as shown below:

```js
// get all the courses with their syllabus' html
    const courses = await canvas.get(`/api/v1/accounts/${domain.campus}/courses`, { include: 'syllabus_body' });
```

Then, in the `searchFor` array, put the regex of what you want to search for:

```js
// what to search for in the syllabus
let searchFor = [
    /peanutbutter/gim,
    /jell(y|ies)/gim,
    /bread/gim
];
```

To run, use:
```bash
npm start
```

## Output

After running, the program will output a CSV report with the following for each Syllabus that had the searched-for regex in it:
- The Course ID 
- A link to the syllabus where the text was found

The report is set to be named `report.csv` and will write to the current working directory. This can be modified in the last line of `main()` if desired:

```js
// write the report
fs.writeFileSync(path.resolve(`./report.csv`), report, { encoding: "utf8" })
```
