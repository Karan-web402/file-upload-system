import express, { Request, Response } from 'express';
import multer from 'multer';

// Create a Multer instance with a destination folder for file uploads
const upload = multer({ dest: 'uploads/' });

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
    // Define a POST route for file uploads using Multer middleware
    this.express.post('/upload', upload.single('file'), (req: Request, res: Response) => {
      if (!req.file) {
        res.status(400).json({ error: 'No file uploaded' });
        return
      }
      res.json({ message: 'File uploaded successfully' });
    });
  }
}

const app = new App().express;
export { app };
