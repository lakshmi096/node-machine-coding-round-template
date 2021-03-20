# NODE.JS MACHINE CODING ROUND TEMPLATE - PARKING LOT MANAGEMENT SYSTEM
###### This is solution for a paking lot management system 

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
$ git fetch && git checkout parking-lot
$ npm install
$ npm start
```

## Problem statement
### Parking Management Application

We want to build a parking lot management application. Multiple parking lots want to use this application.

1. There are two types of vehicles: Two-Wheeler, Car.
2. Each parking lot has separate capacity for each kind of vehicle.
3. There are different slab based hourly rate cards for each kind of vehicle.
**Assume that:**
1. Parking lots with rates and capacities are known to the system. No apis are needed to register
these.
**Demonstrate:**
1. Park a Vehicle at a given parking lot (should fail if the lot is full).
2. Exit from the parking area and tell the amount due for the duration.
3. Given a vehicle no., see complete parking history (Lot, Duration, Amount Paid).
**Notes:**
1. Focus on building a working demo first. Demonstrable code is the primary expectation.
2. You are free to use any programming language. You can write a CLI, a HTTP API, or even use the main method to demonstrate the code.
3. You will program on your own machine. Please ensure you have your IDE or development environment set up.
4. You have access to documentation and all of the internet.
5. You will be judged on the basis of your modelling and extensibility of your code.
6. Database is optional. I don't recommend setting up a db, it takes a lot of time. In memory stores are fine.
