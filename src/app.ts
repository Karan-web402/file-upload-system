import express, { Request, Response } from 'express';
import multer from 'multer';
import * as path from 'path';


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now();
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });
  


class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  private middleware(): void {
    this.express.use(express.json());
  }

  private routes(): void {
    setTimeout(() => {
      this.express.post('/upload', upload.single('file'), (req: Request, res: Response) => {
        if (!req.file) {
          res.status(400).json({ error: 'No file uploaded' });
          return
        }
        res.json({ message: 'File uploaded successfully' });
      });
    },0)
  }
}

const app = new App().express;
export { app };
