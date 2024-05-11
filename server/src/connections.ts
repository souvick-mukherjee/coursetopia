import mongoose from 'mongoose';

async function connectMongoDB(url: string | undefined = '') {
    return mongoose.connect(url);
}

export {
    connectMongoDB,
};
