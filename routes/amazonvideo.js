const connectDB = require('./db/connection');
const express = require('express');
const app = express();
const mongodb = require('mongodb');

// Wait for the connection to be established
connectDB().then((db) => {
    // This is the native MongoDB DB object required for GridFS
    const GridFSBucket = mongodb.GridFSBucket;
    const bucket = new GridFSBucket(db, { bucketName: 'fs' }); // 'fs' is the default bucket name

    // Example Route to STREAM your video (as outlined in the previous answer)
    app.get('/video/stream/:fileId', (req, res) => {
        const fileId = new mongodb.ObjectId(req.params.fileId);

        // Open a read stream from the bucket
        const downloadStream = bucket.openDownloadStream(fileId);

        downloadStream.on('error', (error) => {
            console.error('Streaming error:', error);
            res.status(404).send('Video not found or streaming error.');
        });
        
        // Pipe the chunks directly to the HTTP response
        downloadStream.pipe(res);
    });

    const PORT = 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});