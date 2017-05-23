// middleware handler for getting s3 signed url
import aws from 'aws-sdk';
import express from 'express';

function S3Router(options) {
  const S3_BUCKET = options.bucket;

  if (!S3_BUCKET) {
    throw new Error('S3_BUCKET is required.');
  }

  const router = express.Router();

  function findType(string) {
    const n = string.lastIndexOf('/');
    return string.substring(n+1);
  }

  router.get('/sign', function(req, res) {
    const filename = req.query.objectName;
    const mimeType = req.query.contentType;
    const ext = '.' + findType(mimeType);
    const fileKey = filename + ext;

    const s3 = new aws.S3({
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_KEY,
      region: 'us-east-1',
    });

    const params = {
      Bucket: S3_BUCKET,
      Key: fileKey,
      Expires: 600,
      ContentType: mimeType,
      ACL: options.ACL || 'private'
    };

    s3.getSignedUrl('putObject', params, function(err, data) {
      if (err) {
        console.log(err);
        return res.status(500).send('Cannot create S3 signed URL');
      }
      console.log('data: ', data)
      res.status(200).json({
        signedUrl: data,
        publicUrl: 'https://s3.amazonaws.com/'+ S3_BUCKET + '/' + fileKey,
        filename: filename
      });
    });
  });

  return router;
}

module.exports = S3Router;
