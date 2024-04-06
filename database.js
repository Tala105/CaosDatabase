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
    WHERE id = ?
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

export async function getManagers(){
    const [result] = await pool.query("SELECT * FROM Managers")
    return result
}

export async function getManager(id) {
    const [result] = await pool.query(`
    SELECT *
    FROM Managers
    WHERE id = ?
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
    WHERE id = ?
    `, [id])
    return result[0]
}

export async function addResident(wallet, propertyID){
    const [result] = await pool.query(`
    INSERT INTO Residents (wallet, propertyID)
    VALUES(?,?,?)
    `, [wallet, propertyID])
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
    WHERE id = ?
    `, [id])
    return result[0]
}

export async function addProperty(name, numberUnits, managerID){
    const [result] = await pool.query(`
    INSERT INTO Properties (name, numberUnits, managerID)
    VALUES(?,?,?)
    `, [name, numberUnits, managerID])
    const id = result.insertId
    return getProperty(id)
}