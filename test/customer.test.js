const request = require('supertest');
const app = require('../src/app');
const { createUser, getAllUser, getUserbyId } = require('../src/models/V1/customer.model');

jest.mock('../src/models/V1/customer.model');

describe('Customer Controller Integration Tests', () => {
    const dummyUser = { id: 1, name: 'John Doe', email: 'john.doe@example.com' };
    const dummyUsers = [dummyUser];

    beforeEach(() => {
        jest.clearAllMocks(); 
    });

    afterEach(() => {
        jest.clearAllTimers(); 
    });


    it('should create a user successfully', async () => {
        createUser.mockResolvedValue(dummyUser);

        const response = await request(app)
            .post('/v1/user/create')
            .send(dummyUser)
            .expect('Content-Type', /json/)
            .expect(201);

        expect(response.body.status).toBe('Success');
        expect(response.body.result).toEqual(dummyUser);
        expect(createUser).toHaveBeenCalledWith(dummyUser);
    });

    it('should get all users successfully', async () => {
        getAllUser.mockResolvedValue(dummyUsers);

        const response = await request(app)
            .get('/v1/user/')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body.status).toBe('Success');
        expect(response.body.usersData).toEqual(dummyUsers);
        expect(getAllUser).toHaveBeenCalled();
    });

    it('should get a user by ID successfully', async () => {
        getUserbyId.mockResolvedValue(dummyUser);

        const response = await request(app)
            .get('/v1/user/1')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body.status).toBe('Success');
        expect(response.body.user).toEqual(dummyUser);
        expect(getUserbyId).toHaveBeenCalledWith('1');
    });
});
