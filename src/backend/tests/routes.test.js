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
    test("should respond with a 404 status code", async () => {
      const response = await request(app)
        .post("/api/login")
        .send({ email: "doesnot@gmail.com", password: "password@547" }); 
      expect(response.statusCode).toBe(404);
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
    test("should respond with a 400 status code", async () => {
      const response = await request(app)
        .post("/api/js/signup")
        .send({ first: "example@gmail.com", name: "password@547" }); 
      expect(response.statusCode).toBe(400);
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

// PHASE 2 test cases
//saved jobs api:

describe('GET /api/saved-jobs/:jsId', () => {

  it('responds with an error message if there is a server error', async () => {
    // Mock SavedJob.find to throw an error
    jest.spyOn(SavedJob, 'find').mockImplementation(() => {
      throw new Error('Internal Server Error');
    });

    const response = await request(app)
      .get('/api/saved-jobs/jobSeeker1'); // Assuming 'jobSeeker1' as the job seeker ID

    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Internal Server Error');
  });
});


const SavedJob = require('../models/saved-jobs'); // Import your SavedJob model

describe('PUT /api/saved-jobs', () => {
  it('should save a job successfully', async () => {
    const mockSavedJobSave = jest.fn().mockResolvedValue();

    SavedJob.findOne = jest.fn().mockResolvedValue(null);
    SavedJob.prototype.save = mockSavedJobSave;

    const mockReqBody = {
      jsId: 'validJsId',
      jobData: { _id: 'validJobId' },
    };

    const response = await request(app)
      .put('/api/saved-jobs')
      .send(mockReqBody);

    expect(response.status).toBe(201);
    expect(mockSavedJobSave).toHaveBeenCalled();
    // Add more assertions based on the expected response
  });

  it('should return error if job is already saved', async () => {
    SavedJob.findOne = jest.fn().mockResolvedValue(true);

    const mockReqBody = {
      jsId: 'validJsId',
      jobData: { _id: 'validJobId' },
    };

    const response = await request(app)
      .put('/api/saved-jobs')
      .send(mockReqBody);

    expect(response.status).toBe(400);
    // Add more assertions based on the expected response
  });

  it('should handle internal server error', async () => {
    // Mock SavedJob.findOne to throw an error
    SavedJob.findOne = jest.fn().mockRejectedValue(new Error('Internal Server Error'));

    const response = await request(app)
      .put('/api/saved-jobs')
      .send({});

    expect(response.status).toBe(500);
    // Add more assertions based on the expected response
  });
});



// job seeker skills experience, work experience, education API's
describe('PUT /api/js/:id/skills', () => {
  it('updates skills successfully', async () => {
    const response = await request(app)
      .put('/api/js/65f7945aa5bcf28a25709d87/skills') // Assuming '65f7945aa5bcf28a25709d87' as the job seeker ID
      .send({ skills: ['JavaScript', 'Node.js', 'React'] });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('skills updated successfully');
    expect(response.body.updatedSkills).toBeDefined(); // Ensure updatedSkills is returned
  });

  it('responds with an error if there is a server error', async () => {
    const response = await request(app)
      .put('/api/js/123/skills')
      .send({ skills: ['JavaScript', 'Node.js', 'React'] });

    expect(response.status).toBe(500);
    expect(response.body.error).toBe('Error updating SKILLS');
    expect(response.body.errorMessage).toBeDefined(); // Ensure errorMessage is returned
  });
});

describe('PUT /api/js/:id/education', () => {

  it('responds with an error if there is a server error', async () => {
    const response = await request(app)
      .put('/api/js/123/education')
      .send({ education: 'Bachelor of Science in Computer Science' });

    expect(response.status).toBe(500);
    expect(response.body.error).toBe('Error updating education');
    expect(response.body.errorMessage).toBeDefined(); // Ensure errorMessage is returned
  });
});

describe('PUT /api/js/:id/workexp', () => {
  it('updates work experience successfully', async () => {
    const response = await request(app)
      .put('/api/js/65f7945aa5bcf28a25709d87/workexp')
      .send({ employement_history: 'Software Engineer at XYZ Company' });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('WE updated successfully');
    expect(response.body.updatedWorkExp).toBeDefined(); // Ensure updatedWorkExp is returned
  });

  it('responds with an error if there is a server error', async () => {
    const response = await request(app)
      .put('/api/js/123/workexp')
      .send({ employement_history: 'Software Engineer at XYZ Company' });

    expect(response.status).toBe(500);
    expect(response.body.error).toBe('Error updating WE');
    expect(response.body.errorMessage).toBeDefined(); // Ensure errorMessage is returned
  });
});