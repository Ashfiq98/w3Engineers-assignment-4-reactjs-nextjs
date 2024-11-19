// routes/hotelRoutes.ts
import express from 'express';
import { uploadHotelImages,validateUploadHotelImages,validateUploadRoomImages,uploadRoomImages,getHotel,addHotel,updateHotel, validateAddHotel, getHotelByIdAndSlugController } from '../controllers/hotelController';
import { upload } from '../middlewares/uploadMiddleware';
// import { addHotel } from '../controllers/hotelController';
// import { uploadRoomImages } from '../controllers/hotelController';
import cors from 'cors';


const router = express.Router();

router.use(cors());
router.use(express.json());

router.post('/hotel',validateAddHotel, addHotel);

router.post('/image', upload.array('images', 5),validateUploadHotelImages, uploadHotelImages);

// const router = express.Router();

router.post('/room-image', upload.array('room-image', 5),validateUploadRoomImages, uploadRoomImages);
router.get('/hotel/:hotelId', getHotel);  // Map the GET request to the controller method
router.put('/hotel/:hotelId', updateHotel); 

// router.get('hotel/:slug/:hotelId',getHotelByIdAndSlugController);


export default router;
