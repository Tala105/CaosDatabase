CREATE DATABASE Orca_db;
use Orca_db;

CREATE TABLE Properties (
    propertyID INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
    numberUnits INT NOTNULL, 
    managerID INT FOREIGN KEY REFERENCES Managers(managerID) NOT NULL
);

CREATE TABLE Resident (
    residentID INT AUTO_INCREMENT PRIMARY KEY,
    wallet VARCHAR(255) NOT NULL, 
    propertyID INT FOREIGN KEY REFERENCES Managers(propertyID)
);

CREATE TABLE Managers (
    managerID INT AUTO_INCREMENT PRIMARY KEY,
    wallet VARCHAR(255) NOT NULL,
);