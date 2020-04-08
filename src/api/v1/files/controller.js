const httpStatus = require('http-status');
const path = require('path');
const fs = require('fs');
const Busboy = require('busboy');
const mongoose = require('mongoose');
const Files = require('./model');
const {
  resizeImage,
  authorize
} = require('../../../lib/methods');
const {
  Error
} = require('../../../lib/api-response');

const asyncFsMkdir = Promise.promisify(fs.mkdir);

async function mkDir(folderPath) {
  if (!fs.existsSync(folderPath)) {
    await asyncFsMkdir(folderPath, {
      mode: '0777',
      recursive: true
    });
  }
}

/**
 * Add new file
 * 
 * @public
 */

exports.create = async (req, res, next) => {
  try {
    const {
      user: {
        id
      },
      body: {
        fileType
      }
    } = req;

    const busboy = new Busboy({
      headers: req.headers
    });
    req.pipe(busboy);

    busboy.on('file', async (fieldName, file, filename, encoding, mimeType) => {
      const userData = req.user;
      const folderPath = path.join(__dirname, `../../../cdn/${userData.id}`);
      const extension = path.extname(filename);
      const mongoObjectId = mongoose.Types.ObjectId();
      const customFileName = mongoObjectId + extension;

      await mkDir(path.join(__dirname, '../../../../cdn/'));
      await mkDir(folderPath);
      const fsStream = fs.createWriteStream(path.join(folderPath, customFileName));

      file.pipe(fsStream);

      fsStream.on('close', async () => {
        console.log(`'${filename}' is successfully uploaded as ${customFileName} in ${folderPath}`);

        const saveFile = new Files({
          _id: mongoObjectId,
          file_extension = extension,
          file_mime_type = mimeType,
          file_original_name = filename,
          file_size: 0,
          file_type: fileType,
          is_temp: false,
          is_video: false,
          user_id: id
        });

        await saveFile.save();

        res.status(httpStatus.CREATED).json({
          _id: mongoObjectId
        });
      })
    })
  } catch (e) {
    return next(e);
  }
}

/**
 * Download file
 * 
 * @public
 */