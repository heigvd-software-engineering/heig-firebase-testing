# Firebase testing

## Goals

Goals:
* Show how to test firebase's firestore with rule testing
* Show how to test some firebase's cloud functions

Non-Goals:
* Implement an interface
* Have a lot of features
* Have perfect NoSQL model
* Be a complete example of the application

## Application

We are making a simple team-based todo application. We're going to have three main data structures:
* Teams
* Projects
* Tasks

Teams will have administrators who will be allowed to create, modify and delete projects. In addition, administrators will have the right to create, modify and delete other people's tasks.
Teams will also have normal members who will be allowed to create, modify and delete their own tasks.

Projects are just going to be "containers" for tasks. They will contain some sort of metadata.

Tasks are the heart of the program, but they're going to be a glorified text fiel.