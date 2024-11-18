// src/__test__/uploadImage.test.ts
// import { Request, Response } from 'express';
import { uploadHotelImages, uploadRoomImages } from '../controllers/hotelController';
import { getHotelById, updateHotelImages } from '../models/hotelModel';
import * as fs from 'fs-extra';

jest.mock('../models/hotelModel');
jest.mock('fs-extra');

// Helper functions
const createMockFile = (filename: string): Express.Multer.File => ({
  fieldname: 'images',
  originalname: filename,
  encoding: '7bit',
  mimetype: 'image/jpeg',
  destination: './uploads/',
  filename: filename,
  path: `./uploads/${filename}`,
  size: 1024 * 50,
  stream: {} as any,
  buffer: Buffer.from([]) as Buffer
});

const mockRequest = () => {
  const req: Partial<Request> = {
    body: {},
    params: {},
    files: []
  };
  return req;
};

const mockResponse = () => {
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
    json: jest.fn()
  };
  return res;
};

describe('Image Upload Operations', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('uploadHotelImages', () => {
    it('should successfully upload hotel images', async () => {
      const req = mockRequest();
      const res = mockResponse();
      
      req.body = { hotelId: '123' };
      req.files = [
        createMockFile('test1.jpg'),
        createMockFile('test2.jpg')
      ];

      const mockHotel = { hotelId: '123', images: [] };
      (getHotelById as jest.Mock).mockResolvedValue(mockHotel);
      (updateHotelImages as jest.Mock).mockResolvedValue(true);

      await uploadHotelImages(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith({
        message: 'Images uploaded and hotel data updated successfully',
        imageUrls: expect.any(Array)
      });
    });

    it('should return 400 if no files are uploaded', async () => {
      const req = mockRequest();
      const res = mockResponse();
      
      req.body = { hotelId: '123' };
      req.files = [];

      await uploadHotelImages(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith('No files uploaded');
    });
  });

  describe('uploadRoomImages', () => {
    it('should successfully upload room images', async () => {
      const req = mockRequest();
      const res = mockResponse();
      
      req.body = { 
        hotelId: '123',
        roomSlug: 'test-room'
      };
      req.files = [createMockFile('test1.jpg')];

      const mockHotelsData = [{
        hotelId: '123',
        rooms: [{ roomSlug: 'test-room', roomImages: [] }]
      }];

      (fs.readJson as jest.Mock).mockResolvedValue(mockHotelsData);
      (fs.writeJson as jest.Mock).mockResolvedValue(undefined);

      await uploadRoomImages(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith({
        message: 'Room images uploaded and hotel data updated successfully',
        roomImageUrls: expect.any(Array)
      });
    });

    it('should return 404 if hotel not found', async () => {
      const req = mockRequest();
      const res = mockResponse();
      
      req.body = { 
        hotelId: 'non-existent',
        roomSlug: 'test-room'
      };
      req.files = [createMockFile('test1.jpg')];

      (fs.readJson as jest.Mock).mockResolvedValue([]);

      await uploadRoomImages(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith('Hotel not found');
    });
  });
});

// src/__test__/updateHotel.test.ts
import { Request, Response } from 'express';
import { updateHotel } from '../controllers/hotelController';
import { updateHotelById } from '../models/hotelModel';

jest.mock('../models/hotelModel');

describe('Update Hotel Operations', () => {
  const mockRequest = () => ({
    body: {},
    params: {},
  } as Partial<Request>);

  const mockResponse = () => ({
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
    json: jest.fn()
  } as Partial<Response>);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should successfully update hotel details', async () => {
    const req = mockRequest();
    const res = mockResponse();
    
    req.params = { hotelId: '123' };
    req.body = {
      title: 'Updated Hotel',
      description: 'Updated description'
    };

    const mockUpdatedHotel = {
      hotelId: '123',
      ...req.body,
      slug: 'updated-hotel'
    };

    (updateHotelById as jest.Mock).mockResolvedValue(mockUpdatedHotel);

    await updateHotel(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({
      message: 'Hotel data updated successfully',
      hotel: mockUpdatedHotel
    });
  });

  it('should return 400 if required fields are missing', async () => {
    const req = mockRequest();
    const res = mockResponse();
    
    req.params = { hotelId: '123' };
    req.body = {
      title: 'Updated Hotel'
      // Missing description
    };

    await updateHotel(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('Title and description are required');
  });
});

// src/__test__/image.test.ts
// import { Request, Response } from 'express';
// import  fs from 'fs-extra';
import { getHotel } from '../controllers/hotelController';
// import { getHotelById } from '../models/hotelModel';

jest.mock('../models/hotelModel');
jest.mock('fs-extra');

describe('Image Operations', () => {
  const mockRequest = () => ({
    body: {},
    params: {},
  } as Partial<Request>);

  const mockResponse = () => ({
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
    json: jest.fn()
  } as Partial<Response>);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getHotel with images', () => {
    it('should successfully retrieve hotel details with images', async () => {
      const req = mockRequest();
      const res = mockResponse();
      
      req.params = { hotelId: '123' };

      const mockHotel = {
        hotelId: '123',
        title: 'Test Hotel',
        images: ['image1.jpg'],
        rooms: [{ roomImage: 'room1.jpg' }]
      };

      (getHotelById as jest.Mock).mockResolvedValue(mockHotel);

      await getHotel(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({
        message: 'Hotel data retrieved successfully',
        hotelData: mockHotel
      });
    });

    it('should return 404 if hotel not found', async () => {
      const req = mockRequest();
      const res = mockResponse();
      
      req.params = { hotelId: 'non-existent' };

      (getHotelById as jest.Mock).mockResolvedValue(null);

      await getHotel(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith('Hotel not found');
    });
  });
});