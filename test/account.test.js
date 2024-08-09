const request = require('supertest');
const app = require('../src/app');
const { createAccount, getAllAccount, getAccountId, createAccountType, getAccountType } = require('../src/models/V1/account.model');

jest.mock('../src/models/V1/account.model');

describe('Account Controller Integration Tests', () => {
    const dummyAccount = { id: 1, name: 'John Doe', balance: 1000 };
    const dummyAccounts = [dummyAccount];
    const dummyAccountType = { id: 1, type: 'Savings' };
    const dummyAccountTypes = [dummyAccountType];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterEach(() => {
        jest.clearAllTimers();
    });


    it('should create an account successfully', async () => {
        createAccount.mockResolvedValue(dummyAccount);

        const response = await request(app)
            .post('/v1/account/createAccount')
            .send(dummyAccount)
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body.status).toBe('Success');
        expect(response.body.account).toEqual(dummyAccount);
        expect(createAccount).toHaveBeenCalledWith(dummyAccount);
    });

    it('should get all accounts successfully', async () => {
        getAllAccount.mockResolvedValue(dummyAccounts);

        const response = await request(app)
            .get('/v1/account/')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body.status).toBe('succes');
        expect(response.body.accountsData).toEqual(dummyAccounts);
        expect(getAllAccount).toHaveBeenCalled();
    });

    it('should get an account by ID successfully', async () => {
        getAccountId.mockResolvedValue(dummyAccount);

        const response = await request(app)
            .get('/v1/account/1')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body.status).toBe('success');
        expect(response.body.dataAccount).toEqual(dummyAccount);
        expect(getAccountId).toHaveBeenCalledWith('1');
    });

    it('should create an account type successfully', async () => {
        createAccountType.mockResolvedValue(dummyAccountType);

        const response = await request(app)
            .post('/v1/typeaccount/create')
            .send(dummyAccountType)
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body.status).toBe('succcess');
        expect(response.body.result).toEqual(dummyAccountType);
        expect(createAccountType).toHaveBeenCalledWith(dummyAccountType);
    });

    it('should get all account types successfully', async () => {
        getAccountType.mockResolvedValue(dummyAccountTypes);

        const response = await request(app)
            .get('/v1/typeaccount/type')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body.status).toBe('success');
        expect(response.body.typeAccounts).toEqual(dummyAccountTypes);
        expect(getAccountType).toHaveBeenCalled();
    });
});
