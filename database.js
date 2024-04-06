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

export async function addManager(manager, building){
    const [result] = await pool.query(`
    INSERT INTO Managers (manager, building)
    VALUES(?,?)
    `, [manager, building])
    const id = result.insertId
    return getManager(id)
}