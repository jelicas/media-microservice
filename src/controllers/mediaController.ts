import { RequestHandler } from "express";

import { IncomingForm, Files } from "formidable";
import { resolve } from "path";

interface IMediaController {
  upload: RequestHandler;
  getMedia: RequestHandler;
}

export const mediaController: IMediaController = {
  async upload(req, res) {
    try {
      const form = new IncomingForm();
      form.multiples = false;
      form.uploadDir = resolve("files");
      form.keepExtensions = true;

      const { image }: Files = await new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
          if (err) {
            return reject(err);
          }
          return resolve(files);
        });
      });

      return res.status(200).send({ filePath: image.path });
    } catch (error) {
      console.error(error);
      return res
        .status(error.status || 500)
        .send({ message: error.message || "Internal Server Error" });
    }
  },
  getMedia(req, res) {
    try {
      const path = req.query.path?.toString()!;
      return res.sendFile(path);
    } catch (error) {
      console.error(error);
      return res
        .status(error.status || 500)
        .send({ message: error.message || "Internal Server Error" });
    }
  },
};
