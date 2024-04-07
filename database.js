import mysql from 'mysql2'

import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

export async function getManagers(){
    const [result] = await pool.query("SELECT * FROM Managers")
    return result
}

export async function getManager(id) {
    const [result] = await pool.query(`
    SELECT *
    FROM Managers
    WHERE managerID = ?
    `, [id])
    return result[0]
}


export async function addManager(wallet){
    const [result] = await pool.query(`
    INSERT INTO Managers (wallet)
    VALUES(?)
    `, [wallet])
    const id = result.insertId
    return getManager(id)
}

export async function getResidents(){
    const [result] = await pool.query("SELECT * FROM Residents")
    return result
}

export async function getResident(id) {
    const [result] = await pool.query(`
    SELECT *
    FROM Residents
    WHERE residentID = ?
    `, [id])
    return result[0]
}

export async function addResident(wallet){
    const [result] = await pool.query(`
    INSERT INTO Residents (wallet)
    VALUES(?)
    `, [wallet])
    const id = result.insertId
    return getResident(id)
}

export async function getProperties(){
    const [result] = await pool.query("SELECT * FROM Properties")
    return result
}

export async function getProperty(id) {
    const [result] = await pool.query(`
    SELECT *
    FROM Properties
    WHERE propertyID = ?
    `, [id])
    return result[0]
}

export async function addProperty(Rent, Bills, Maintenance, Events, ERC, managerID){
    const [result] = await pool.query(`
    INSERT INTO Properties (Rent, Bills, Maintenance, Events, ERC, managerID)
    VALUES(?,?,?,?,?,?)
    `, [Rent, Bills, Maintenance, Events, ERC, managerID])
    const id = result.insertId
    return getProperty(id)
}