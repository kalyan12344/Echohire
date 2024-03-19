const request = require("supertest");
const app = require("../server"); 

// employer test cases
describe("POST /api/login", () => {
  describe("when passed a email and password are given correct for the login", () => {
    test("should respond with a 200 status code", async () => {
      const response = await request(app)
        .post("/api/login")
        .send({ email: "bhanuja497@gmail.com", password: "Bhanu@0208" }); 
      expect(response.statusCode).toBe(200);
    });
  });
  describe("when passed a email and password are given incorrect for the login", () => {
    test("should respond with a 400 status code", async () => {
      const response = await request(app)
        .post("/api/login")
        .send({ email: "doesnot@gmail.com", password: "password@547" }); 
      expect(response.statusCode).toBe(400);
    });
  });
});

describe("POST /api/employers/signup", () => {
    describe("", () => {
      test("should respond with a 200 status code", async () => {
        const response = await request(app)
          .post("/api/employers/signup")
          .send({ 
            companyName: "test",
            companyType: "IT",
            companyDescription: "Software company",
            companyEmail: "new@gmail.com",
            companyPassword: "139",
            companyLogo: null,
             }); 
        expect(response.statusCode).toBe(200);
      });
    });
    describe("", () => {
      test("should respond with a 500 status code", async () => {
        const response = await request(app)
          .post("/api/employers/signup")
          .send({ email: "example@gmail.com", companyPassword: "password@547" }); 
        expect(response.statusCode).toBe(500);
      });
    });
  });


  describe("POST /api/employers/login", () => {
    describe("", () => {
      test("should respond with a 200 status code", async () => {
        const response = await request(app)
          .post("/api/employers/login")
          .send({ 
            email: "bhanu497@gmail.com",
            password: "1234",
             }); 
        expect(response.statusCode).toBe(200);
      });
    });
    describe("when passed a email and password are given incorrect for employer login", () => {
      test("should respond with a 404 if employer does not exist", async () => {
        const response = await request(app)
          .post("/api/employers/login")
          .send({ email: "doesnot@gmail.com", password: "password@547" }); 
        expect(response.statusCode).toBe(404);
      });
    });
    describe("when passed a email is correct and password is incorrect for employer login", () => {
        test("should respond with a 401 for invalid credentials", async () => {
          const response = await request(app)
            .post("/api/employers/login")
            .send({ email: "bhanu497@gmail.com", password: "password@547" }); 
          expect(response.statusCode).toBe(401);
        });
      });
  });


// job_seeker test cases


describe("POST /api/js/signup", () => {
  describe("", () => {
    test("should respond with a 200 status code", async () => {
      const response = await request(app)
        .post("/api/js/signup")
        .send({ 
          firstName: "testing",
          lastName: "test",
          profession: "test developer",
          jsEmail: "test@gmail.com",
          jsPassword: "pwd",
           }); 
      expect(response.statusCode).toBe(400);
    });
  });
  describe("", () => {
    test("should respond with a 500 status code", async () => {
      const response = await request(app)
        .post("/api/js/signup")
        .send({ first: "example@gmail.com", name: "password@547" }); 
      expect(response.statusCode).toBe(500);
    });
  });
});


const Js = require('../models/job_seeker'); // Update this with the correct path to your job_seeker model
  
  describe('GET /api/js/email/:id', () => {
    it('should return job seeker details by ID', async () => {
      // Mock the save method of the job seeker model
      const saveMock = jest.fn();
      const findOneMock = jest.spyOn(Js, 'findOne').mockResolvedValue({
        _id: 'test_id',
        jsEmail: 'test@example.com',
        jsPassword: 'testpassword',
        // Add any other necessary fields
        save: saveMock, // Assign the mocked save method
      });
  
      // Make a request to the endpoint with a fake ID
      const response = await request(app).get('/api/js/email/test_id');
  
      // Assert on the response
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('js');
      expect(response.body.js).toHaveProperty('jsEmail', 'test@example.com');
      // Add more assertions as needed for other fields
  
      // Assert that the mock was called
      expect(findOneMock).toHaveBeenCalledWith({_id: 'test_id'});
      expect(saveMock).not.toHaveBeenCalled(); // Ensure that save method was not called
  
      // Restore the original implementation of findOne method
      findOneMock.mockRestore();
    });
  
    it('should return 500 Internal Server Error if ID is invalid', async () => {
      const response = await request(app).get('/api/js/email/invalid_id');
  
      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('message', 'Internal Server Error');
    });
  });


  // Application form

  const ApplicationForm = require('../models/job_application_form'); // Update this with the correct path to your model file
  const mockApplicationForm = {
    _id: 'mock_id',
    resume: {
      contentType: 'application/pdf',
      data: Buffer.from('mock_resume_data', 'base64')
    },
    // Add any other necessary fields
  };
  
  jest.mock('../models/job_application_form', () => ({
    findById: jest.fn().mockImplementation((id) => {
      if (id === 'mock_id') {
        return Promise.resolve(mockApplicationForm);
      } else {
        return Promise.resolve(null);
      }
    })
  }));
  
  describe('GET /application/:id', () => {
    it('should return application form by ID', async () => {
      const response = await request(app).get('/application/mock_id');
  
      expect(response.status).toBe(200);
    });
  
    it('should return 404 if application form is not found', async () => {
      const response = await request(app).get('/application/non_existent_id');
  
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'Application form not found' });
    });
  });

  
  // job test cases
  const Job = require('../models/jobs'); // Update this with the correct path to your Job model

// Mock the Job model

describe("POST /api/jobpost", () => {
  describe("", () => {
    test("should respond with a 200 status code", async () => {
      const response = await request(app)
        .post("/api/jobpost")
        .send({ 
          title:"Full stack",
        description:"test description",
        qualifications:"test qualifications",
        skills:"test skills",
        location:"test location",
        type:"test type",
        deadline:"2024-03-25",
        salary:1000,
        companyName:"test company",
           }); 
      expect(response.statusCode).toBe(200);
    });
  });
});


