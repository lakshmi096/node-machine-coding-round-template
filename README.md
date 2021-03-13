# NODE.JS MACHINE CODING ROUND TEMPLATE - TOLL MANAGEMENT SYSTEM
###### This is solution for a toll management system 

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)
* [Prolem statement](#problem-statement)

## General info
This is simple nodejs project for making REST APIs with local database setup according to the given problem statement.
	
## Technologies
Project is created with:
* express: ~4.16.1,
* mongoose: ^5.11.19
* cookie-parser: ~1.4.4
* debug: ~2.6.9
* dotenv: ^8.2.0
* http-errors: ~1.6.3
* jade: ~1.11.0
* morgan: ~1.9.1
	
## Setup
To run this project, install it locally using npm:

```
$ git clone https://github.com/lakshmi096/node-machine-coding-round-template.git
$ cd node-machine-coding-round-template
$ npm install
$ npm start
```

## Problem statement
### Toll Management Application

We want to build an application which helps a toll company in managing different tolls
across India.

1. There is a toll company having tolls across the country, with each toll having
    multiple toll booths.
2. Tolls have 3 kinds of toll pass
    a. Single Pass (one time use)
    b. Return pass (valid for current trip and one return trip within 24 hours)
    c. 7 day pass (unlimited passages in either direction for 7 days for that toll)
3. There are two kinds of vehicles - Two Wheeler and a 4 wheeler with different
    charges for above mentioned kinds of toll passes.
**Assume that:**
1. Tolls and Toll Booths are already registered in the system. APIs to register them are
not needed.
2. Vehicle can be identified by its registration number.
3. Payment is handled offline. You only need to keep track of the sales.
**Demonstrate:**
1. Given a vehicle registration number and toll,
a. If the vehicle has a valid pass, show the existing toll pass and let the
vehicle go through.
b. If there is no active pass, display charges for 3 different passes and allow
the vehicle to choose one.
2. Build leaderboard of toll booth (gate) by number of vehicles processed and toll
charges collected.
**Evaluation Criteria:**
1. Code walkthrough to showcase structure and modelling.
2. A demonstration of the functional requirements stated above.
For the demonstration, you can choose any of - CLI, API, Unit tests or a runner class.
**Additional Notes:**
1. You may use any programming language.
2. Database is optional. We don’t recommend setting up a db, it takes a lot of time. In
memory stores or flat files are acceptable for storing data.
3. You may access documentation and any other resources as needed.

