import { RequestHandler } from 'express';

import { mediaService } from '../services/mediaService';

interface IMediaController {
  upload: RequestHandler;
  getMedia: RequestHandler;
}

export const mediaController: IMediaController = {
  async upload(req, res) {
    try {
      const { image } = await mediaService.processUpload(req);

      return res.status(200).send({ filePath: image.path });
    } catch (error) {
      return res
        .status(error.status || 500)
        .send({ message: error.message || 'Internal Server Error' });
    }
  },
  getMedia(req, res) {
    try {
      const { id } = req.params;
      const path = __dirname.replace('src/controllers', `files/${id}`);

      return res.sendFile(path);
    } catch (error) {
      console.error(error);
      return res
        .status(error.status || 500)
        .send({ message: error.message || 'Internal Server Error' });
    }
  },
};
