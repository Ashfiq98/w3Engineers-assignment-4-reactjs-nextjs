// import bodyParser from 'body-parser';
import bodyParser from 'body-parser';
import express, { Request, Response } from 'express';
import path from 'path'; // For file path
import fs from 'fs'
import hotelRoutes from './routes/hotelRoutes';
import cors from 'cors';

export const app = express();
const PORT = 3001;

// backend connection - start

app.use(cors());
app.use(express.json());
app.get("/api/test",(req,res)=>{
  res.json({message:"Hello from the server.."});
})
// images from backend
// Route to serve images data from the hotel-id.json file


// Serve images from the 'images' folder (make sure images are placed here)
app.use("/images", express.static(path.join(__dirname, "images")));

// backend connection  - end

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});


// https://ideone.com/tQmeyC

app.post('/hotel', hotelRoutes);
app.use(hotelRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve static files

// https://ideone.com/9ehiRf

//................................................................................... work - 2 /images




// Exactly what we wanted the image POST
// .......................................
// https://ideone.com/zbtl8a

//......................................... 

//..........................................POST for single images only................................
// https://ideone.com/ejnSPe

// ........................................room image

// POST /image endpoint to upload multiple room images for a specific room in a hotel

// https://ideone.com/yYdXKn

// ....................................end of room image

//................ work - 3 (get details with hotelId)

// GET /hotel/:hotelId endpoint to get details of a specific hotel
// https://ideone.com/J4aW13
// ....................... work - 4 (put or update)

// PUT /hotel/:hotelId endpoint to update an existing hotel
// https://ideone.com/DGEbkh



app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
    });

export default app;