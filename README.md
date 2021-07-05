# Project-Approach-Tool

## About

The Project Approach Tool helps students and professionals determine their project approach by defining the necessary deliverables (called "stepping stones") to achieve the end goal, formulating the questions to be answered to get the necessary information, and choosing the methods to answer these questions and realize the deliverables.

This tool is based on two frameworks: Stepping Stones by Miriam Losse (Saxion), and the DOT framework by Koen van Turnhout (HU, formerly HAN), and makes use of the card decks that have been developed to enable people in the use of these frameworks. 

The project is currently being developed by Saxion, but we welcome anyone to contribute.

## Installation and deployment

See the readme files in the front-end and back-end folders.

## Version history

### v1 - Basic functionality - july 2020
Allows an end user to define phases (groups of cards), select stepping stone and methods cards already present in the server, and to locally add question cards and any custom cards of preference. Relationships between phases can be indicated by adding arrows.
Developed by Matyas Köne as part of his graduation project.

### v2 - Online collaboration - january 2021
In version 2, a full online collaboration system was introduced. With this system, multiple users can collaborate on a single project approach. The collaboration is real-time thanks to the use of a websocket connection, so that each user can receive changes from others.
Also new in version 2 is an "on-boarding" system that helps new users to familiarize themselves with the Project Approach Tool. 
Another new feature is that workspaces (project approaches) are now stored persistently and online, instead of locally for each user.
Version 2 was developed by Lars Hendriks, a Saxion HBO-ICT software engineering student for his graduation project.

### v3 - Virtual teacher - july 2021
In version 3, an automatic feedback system was introduced called the "Virtual Teacher". Prior to this version, users of the Project Approach Tool experienced a lack of guidance because of their often low experience with the DOT Framework. 
To combat this problem, an automatic feedback system was introduced that can give feedback to users based on their project approach. Currently, a flexible configurable rule engine is used to perform a variety of low-level checks.

A few examples:
- Does every project phase have at least one deliverable, question and activity?
- What is the current balance between used research strategies?
- How often is literature research used?

The rule engine allows teachers to fully customize feedback. Meanwhile, students can choose which kinds of feedback they want to get, in order to tailor to as many students and project types as possible.
The virtual teacher was developed by Robin van Alst, a Saxion HBO-ICT software engineering student for his graduation project.


