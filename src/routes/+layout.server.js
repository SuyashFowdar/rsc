import mongoose from 'mongoose';

export async function load() {
    mongoose.connect('mongodb://127.0.0.1:27017/');
}