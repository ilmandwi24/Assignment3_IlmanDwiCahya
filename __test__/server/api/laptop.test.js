// __tests__/laptop.test.js
const Request = require('supertest');
const TestHelper = require('../../../server/helpers/TestHelper');

const laptop = require('../../../server/api/laptop');
const LaptopDb = require('../../../server/services/LaptopDb');
const LaptopPrisma = require('../../../server/services/LaptopPrisma');
// const Prisma = require('../../../server/services/Prisma');
// const Redis = require('../../../server/services/Redis');

// jest.mock('../../../server/services/Redis', () => ({
//   getKey: jest.fn(),
//   setWithExpire: jest.fn()
// }));

let server;
describe('Laptop', () => {
  beforeAll(() => {
    server = TestHelper.createTestServer('/api', laptop);
  });

  afterAll(async () => {
    await server.close();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('API v1 Anime', () => {
    // describe('GET /v1/anime/recomendation', () => {
    //   it('should return 200 and get anime list from fetch', async () => {
    //     const mockAnimeList = {
    //       pagination: {
    //         last_visible_page: 20,
    //         has_next_page: true
    //       },
    //       data: []
    //     };
    //     Redis.getKey.mockResolvedValue(null);
    //     Redis.setWithExpire.mockResolvedValue(null);
    //     jest.spyOn(global, 'fetch').mockResolvedValue({
    //       json: jest.fn().mockResolvedValue(mockAnimeList)
    //     });

    //     const response = await Request(server).get('/api/sample/v1/anime/recomendation');
    //     expect(response.status).toBe(200);
    //   });

    //   it('should return 200 and get anime list from redis', async () => {
    //     const mockAnimeList = '{"pagination":{"last_visible_page":20,"has_next_page":true},"data":[]}';
    //     Redis.getKey.mockResolvedValue(mockAnimeList);
    //     const response = await Request(server).get('/api/sample/v1/anime/recomendation');
    //     expect(response.status).toBe(200);
    //   });
    //   it('should return 500 on error whet fetch anime list', async () => {
    //     Redis.getKey.mockResolvedValue(null);
    //     Redis.setWithExpire.mockResolvedValue(null);
    //     jest.spyOn(global, 'fetch').mockRejectedValue(new Error('Internal Server Error'));
    //     const response = await Request(server).get('/api/sample/v1/anime/recomendation');
    //     expect(response.status).toBe(500);
    //   });
    // });
  });

  describe('API V1 Query Database', () => {
    describe('GET /v1/laptop', () => {
      it('should return 200 and laptop list, when get list laptop', async () => {
        const mockLaptopList = [
            {
                id: 3, 
                nama: "Asus",
                brand: "Asus",
                processor: "Ryzen 5",
                ram: 8,
                vga: "NVIDIA",
                harga: 10000000
              },
        ];
        jest.spyOn(LaptopDb, 'getListLaptop').mockResolvedValue(mockLaptopList);

        const response = await Request(server).get('/api/v1/laptop');
        expect(response.status).toBe(200);
      });

      it('should return 404 when laptop not found', async () => {
        jest.spyOn(LaptopDb, 'getListLaptop').mockResolvedValue([]);
        const response = await Request(server).get('/api/v1/laptop');
        expect(response.status).toBe(404);
      });

      it('should return 500 when error', async () => {
        jest.spyOn(LaptopDb, 'getListLaptop').mockRejectedValue(new Error('Mock error'));
        const response = await Request(server).get('/api/v1/laptop');
        expect(response.status).toBe(500);
      });
    });

    describe('POST /v1/laptop', () => {
      it('should return 200 and success message, when add laptop', async () => {
        jest.spyOn(LaptopDb, 'addLaptop').mockResolvedValue('success');
        const response = await Request(server).post('/api/v1/laptop').send({
            nama: "Asus",
            brand: "Asus",
            processor: "Ryzen 5",
            ram: 8,
            vga: "NVIDIA",
            harga: 10000000
        });
        expect(response.status).toBe(200);
      });

      it('should return 500 when error', async () => {
        jest.spyOn(LaptopDb, 'addLaptop').mockRejectedValue(new Error('Mock error'));
        const response = await Request(server).post('/api/v1/laptop').send({
            nama: "Asus",
            brand: "Asus",
            processor: "Ryzen 5",
            ram: 8,
            vga: "NVIDIA",
            harga: 10000000
        });
        expect(response.status).toBe(500);
      });
    });

    describe('PUT /v1/laptop/:id', () => {
      it('should return 200 and success message, when edit laptop', async () => {
        jest.spyOn(LaptopDb, 'editLaptop').mockResolvedValue({ 
            id: 1, 
            nama: "Asus",
            brand: "Asus",
            processor: "Ryzen 5",
            ram: 8,
            vga: "NVIDIA",
            harga: 10000000 
        });
        const response = await Request(server).put('/api/v1/laptop/1').send({
            nama: "Asus",
            brand: "Asus",
            processor: "Ryzen 5",
            ram: 8,
            vga: "NVIDIA",
            harga: 10000000
        });
        expect(response.status).toBe(200);
      });

      it('should return 400 and success message, incorrect body', async () => {
        const response = await Request(server).put('/api/v1/laptop/1').send({
            nama: "Asus",
            brand: "Asus",
            processor: "Ryzen 5",
            ram: 8,
            vga: "NVIDIA",
        });
        expect(response.status).toBe(400);
      });

      it('should return 404 when laptop not found', async () => {
        jest.spyOn(LaptopDb, 'editLaptop').mockResolvedValue(false);
        const response = await Request(server).put('/api/v1/laptop/1').send({
            nama: "Asus",
            brand: "Asus",
            processor: "Ryzen 5",
            ram: 8,
            vga: "NVIDIA",
            harga: 10000000
        });
        expect(response.status).toBe(404);
      });

      it('should return 500 when error', async () => {
        jest.spyOn(LaptopDb, 'editLaptop').mockRejectedValue(new Error('Mock error'));
        const response = await Request(server).put('/api/v1/laptop/1').send({
            nama: "Asus",
            brand: "Asus",
            processor: "Ryzen 5",
            ram: 8,
            vga: "NVIDIA",
            harga: 10000000
        });
        expect(response.status).toBe(500);
      });
    });

    describe('DELETE /v1/laptop/:id', () => {
      it('should return 200 and success message, when delete laptop', async () => {
        jest.spyOn(LaptopDb, 'deleteLaptop').mockResolvedValue({ 
            id: 2, 
            nama: "Asus",
            brand: "Asus",
            processor: "Ryzen 5",
            ram: 8,
            vga: "NVIDIA",
            harga: 10000000 
        });
        const response = await Request(server).delete('/api/v1/laptop/1');
        expect(response.status).toBe(200);
      });

      it('should return 404 when laptop not found', async () => {
        jest.spyOn(LaptopDb, 'deleteLaptop').mockResolvedValue(false);
        const response = await Request(server).delete('/api/v1/laptop/1');
        expect(response.status).toBe(404);
      });

      it('should return 500 when error', async () => {
        jest.spyOn(LaptopDb, 'deleteLaptop').mockRejectedValue(new Error('Mock error'));
        const response = await Request(server).delete('/api/v1/laptop/1');
        expect(response.status).toBe(500);
      });
    });
  });

  describe('API V2 ORM', () => {
    describe('GET /v2/laptop', () => {
      it('should return 200 and laptop list, when get list laptop', async () => {
        const mocklaptopList = [
            {
                id: 3, 
                nama: "Asus",
                brand: "Asus",
                processor: "Ryzen 5",
                ram: 8,
                vga: "NVIDIA",
                harga: 10000000
              },
        ];
        jest.spyOn(LaptopPrisma, 'getListLaptop').mockResolvedValue(mocklaptopList);

        const response = await Request(server).get('/api/v2/laptop');
        expect(response.status).toBe(200);
      });

      it('should return 404 when laptop not found', async () => {
        jest.spyOn(LaptopPrisma, 'getListLaptop').mockResolvedValue([]);
        const response = await Request(server).get('/api/v2/laptop');
        expect(response.status).toBe(404);
      });

      it('should return 500 when error', async () => {
        jest.spyOn(LaptopPrisma, 'getListLaptop').mockRejectedValue(new Error('Mock error'));
        const response = await Request(server).get('/api/v2/laptop');
        expect(response.status).toBe(500);
      });
    });

    describe('POST /v2/laptop', () => {
      it('should return 200 and success message, when add laptop', async () => {
        jest.spyOn(LaptopPrisma, 'addLaptop').mockResolvedValue('success');
        const response = await Request(server).post('/api/v2/laptop').send({
            nama: "Asus",
            brand: "Asus",
            processor: "Ryzen 5",
            ram: 8,
            vga: "NVIDIA",
            harga: 10000000
        });
        expect(response.status).toBe(200);
      });

      it('should return 500 when error', async () => {
        jest.spyOn(LaptopPrisma, 'addLaptop').mockRejectedValue(new Error('Mock error'));
        const response = await Request(server).post('/api/v2/laptop').send({
            nama: "Asus",
            brand: "Asus",
            processor: "Ryzen 5",
            ram: 8,
            vga: "NVIDIA",
            harga: 10000000
        });
        expect(response.status).toBe(500);
      });
    });

    describe('PUT /v2/laptop/:id', () => {
      it('should return 200 and success message, when edit laptop', async () => {
        jest.spyOn(LaptopPrisma, 'editLaptop').mockResolvedValue({   
            id: 1, 
            nama: "Asus",
            brand: "Asus",
            processor: "Ryzen 5",
            ram: 8,
            vga: "NVIDIA",
            harga: 10000000  });
        const response = await Request(server).put('/api/v2/laptop/1').send({
            nama: "Asus",
            brand: "Asus",
            processor: "Ryzen 5",
            ram: 8,
            vga: "NVIDIA",
            harga: 10000000
        });
        expect(response.status).toBe(200);
      });

      it('should return 400 and success message, incorrect body', async () => {
        const response = await Request(server).put('/api/v2/laptop/1').send({
            nama: "Asus",
            brand: "Asus",
            processor: "Ryzen 5",
            ram: 8,
            vga: "NVIDIA",
        });
        expect(response.status).toBe(400);
      });

      it('should return 404 when laptop not found', async () => {
        jest.spyOn(LaptopPrisma, 'editLaptop').mockResolvedValue(false);
        const response = await Request(server).put('/api/v2/laptop/1').send({
            nama: "Asus",
            brand: "Asus",
            processor: "Ryzen 5",
            ram: 8,
            vga: "NVIDIA",
            harga: 10000000
        });
        expect(response.status).toBe(404);
      });

      it('should return 500 when error', async () => {
        jest.spyOn(LaptopPrisma, 'editLaptop').mockRejectedValue(new Error('Mock error'));
        const response = await Request(server).put('/api/v2/laptop/1').send({
            nama: "Asus",
            brand: "Asus",
            processor: "Ryzen 5",
            ram: 8,
            vga: "NVIDIA",
            harga: 10000000
        });
        expect(response.status).toBe(500);
      });
    });

    describe('DELETE /v2/laptop/:id', () => {
      it('should return 200 and success message, when delete laptop', async () => {
        jest.spyOn(LaptopPrisma, 'deleteLaptop').mockResolvedValue({ 
            id: 2, 
            nama: "Asus",
            brand: "Asus",
            processor: "Ryzen 5",
            ram: 8,
            vga: "NVIDIA",
            harga: 10000000  });
        const response = await Request(server).delete('/api/v2/laptop/1');
        expect(response.status).toBe(200);
      });

      it('should return 404 when laptop not found', async () => {
        jest.spyOn(LaptopPrisma, 'deleteLaptop').mockResolvedValue(false);
        const response = await Request(server).delete('/api/v2/laptop/1');
        expect(response.status).toBe(404);
      });

      it('should return 500 when error', async () => {
        jest.spyOn(LaptopPrisma, 'deleteLaptop').mockRejectedValue(new Error('Mock error'));
        const response = await Request(server).delete('/api/v2/laptop/1');
        expect(response.status).toBe(500);
      });
    });
  });
});
