import { connectDB } from '../data/mongodb.js'
import { Album } from '../data/mongodb.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

connectDB();



export const getAllAlbums = async (req, res, next) => {
    try {
        console.log("albums")
        const albums = await Album.find().populate('');
        res.json(albums);
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}