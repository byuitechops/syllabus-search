# Project Capture Document for Syllabus Search
#### *Author: Seth Childers*
#### *Stakeholder(s): Jilane Richardson and Corey Moore*
#### *Date: Friday March 08, 2019*


## Background

A high up person at the school passed away and his name is on every syllabus. His name needs to be identified in each syllabus so it can be removed.

-----

## Definition of Done
Create a course search tool that will go through each syllabus section for the courses in a given account and look for matches to regex objects in the HTML only.

-----

# Requirements

### Input Requirements

#### Source of Inputs

All of online and campus courses need this. Therefore, run it on all courses in those accounts. This will happen inside the tool itself, so there will be no input.

#### Definition of Inputs

None (technically I'll run a get request to get the courses which could be done by uploading a csv...but that's no fun)

---

### Output Requirements
#### Destination

Jilane Richardson: richardsonji@byui.edu

Corey Moore: moorec@byui.edu

#### Definition of Outputs

Report: 

| Course Identifier | Link to Reference |
| ----------------- | ----------------- |
| 1234 | byui.instructure.com/courses/1234/assignments/syllabus |

---

### User Interface

#### Type:

CLI with no input or flags

-----

## Expectations

### Timeline
One week: Friday March 08, 2019 - Friday March 15, 2019

### Best Mode of Contact
Jilane Richardson: Email, but Slack works as well

Corey Moore: Slack

### Next Meeting
Wednesday March 13, 2019

### Action Items
<!-- Recap Meeting -->
#### TechOps
Build the tool and get the report to them

#### Stakeholder
None

-----

#### *Approved By:* 
Ryan Gewondjan

#### *Approval Date:*
Friday March 08, 2019

#### *Date Delivered:*
Wednesday March 13, 2019
