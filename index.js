const canvas = require('canvas-api-wrapper');
const cheerio = require('cheerio');
const d3 = require('d3-dsv');
const fs = require('fs');
const path = require('path');

// which account to run the tool on
const domain = {
    campus: 48,
    online: 5,
    pathway: 24,
    everything: 1
};

// what to search for in the syllabus
let searchFor = [
    /kipharris/gim,
    /\(?208\)?\-?498\-?9200/gim,
    /harrisk\@byui\.edu/gim
]

/**
 * Format each course's syllabus and return an array of objects with 
 * course id, the modified syllabus text, and a link to the syllabus
 * @param {Object array} acc The accumulator that will gather all the syllabi
 * @param {Object} course The canvas course object
 */
function getEachSyllabus(acc, course) {
    // get courses that have a syllabus body (the html version of a syllabus)
    if (course.syllabus_body) {
        let $ = cheerio.load(course.syllabus_body); // load the html into a cheerio object
        let syllabus = $.text().toLowerCase(); // get the text in the syllabus and toLowerCase it to make it easier to search
        syllabus = syllabus.replace(/\s+/gim, ''); // make it easier to search by getting rid of white spaces

        // if the syllabus has text, add it to the syllabus array
        if (syllabus !== '') {
            return acc.concat({
                id: course.id,
                text: syllabus,
                link: `https://byui.instructure.com/courses/${course.id}/assignments/syllabus`
            });
        }
    }
    // in case there was no syllabus text found
    return acc;
}

/**
 * Search the syllabus for the items defined in the global 'searchFor' array and return an array of matching syllabi
 * @param {Object array} acc The accumulator that will gather all the data for the report
 * @param {Object} syllabus The object that contains the course id, modified syllabus text, and a link to the syllabus
 */
function searchSyllabus(acc, syllabus) {
    let found = searchFor.find(regex => regex.test(syllabus.text));
    if (found !== undefined) {
        delete syllabus.text;
        return acc.concat(syllabus);
    }
    return acc;
}

/**
 * Define what to search for in the syllabus, then 
 * get the syllabus and search it for the items defined
 */
async function main() {
    // get all the courses with their syllabus' html
    const courses = await canvas.get(`/api/v1/accounts/${domain.campus}/courses`, { include: 'syllabus_body' });
    const syllabi = courses.reduce(getEachSyllabus, []) // get each syllabus and prepare it to be searched
    let reportData = syllabi.reduce(searchSyllabus, []); // search the syllabus html for the search terms
    let report = d3.csvFormat(reportData); // create the csv report
    fs.writeFileSync(path.resolve(`./report.csv`), report, { encoding: "utf8" }) // write the report
}

main();
