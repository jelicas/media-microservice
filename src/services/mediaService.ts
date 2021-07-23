import { Files, IncomingForm } from 'formidable';

export const mediaService = {
  async processUpload(req: any): Promise<Files> {
    return new Promise((resolve, reject) => {
      const form = new IncomingForm();
      form.multiples = false;
      form.keepExtensions = true;
      form.uploadDir = __dirname + `./../../files`;

      form.parse(req, (err, fields, files) => {
        if (err) {
          return reject(err);
        }
        return resolve(files);
      });
    });
  },
};
