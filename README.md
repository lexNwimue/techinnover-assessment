# NestJS Drone Service

This is a REST API service built with NestJS for managing a fleet of drones and their medication loads. DB: SQLite

## Assumptions

- **Weight Assumption:** The weight of the medication is assumed to be in kilograms (kg) as no weight unit field was specified.
- **Serial Number Assumption:** The serial number is assumed to be the ID of the drone entity/table and would not be entered during registration.
- **Drone Status Assumption:** The registered drone status can only be "IDLE" because no medication is assigned to it at that point.
- **Unique Medication Code Assumption:** It is assumed that the medication code must be unique.
- **No Effect of Medication on Drone Battery Assumption:** There is no assumed effect of medication on the drone's battery percentage.
- **Finding Available Drones Assumption:** In finding available drones for loading, no specific conditions were specified. Hence, drones in the "IDLE", "RETURNING", and "DELIVERED" states are considered available.
- **Implementations for changing Drone/Medication Details :** No requirements were stated to this effect hence this was not considered

## Project Details

The project is a service that allows clients to communicate with drones via a REST API. It provides functionality for registering drones, loading medication items onto drones, checking loaded medication items for a given drone, checking available drones for loading, and checking the battery level of a given drone.

### Drone Entity

A Drone has the following properties:

- Serial Number (up to 100 characters)
- Model (Lightweight, Middleweight, Cruiserweight, Heavyweight)
- Weight Limit (maximum 500kg)
- Battery Capacity (percentage)
- State (IDLE, LOADING, LOADED, DELIVERING, DELIVERED, RETURNING)

### Medication Entity

Each Medication has the following properties:

- Name (letters, numbers, '-', '\_')
- Weight (assumed to be in kilograms)
- Code (uppercase letters, underscore, numbers)
- Image (picture of the medication case)

## Requirements

### Functional Requirements

- There is no need for a UI as this is a REST API service.
- The service prevents loading a drone with more weight than it can carry.
- The drone cannot be in the LOADING state if the battery level is below 25%.
- A periodic task is introduced to check drone battery levels and create history/audit event logs for this.

### Non-Functional Requirements

- Input/output data must be in JSON format.
- The project should be buildable and runnable.
- The project includes a README file with build, run, and test instructions. It uses a DB that can be run locally, such as an in-memory database.
- The required data must be preloaded in the database.
- Unit tests are optional but advisable.
- It is recommended to demonstrate your work through atomic commits in your commit history.

## Build and Run Instructions

1. Clone the repository:

```shell
git clone https://github.com/lexNwimue/techinnover-assessment.git

cd techinnover-assessment
npm install

```
