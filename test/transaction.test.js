const request = require('supertest');
const app = require('../src/app'); 
const { createTransaction, getAllTransactions, getTransactionId } = require('../src/models/V1/transaction.model');

jest.mock('../src/models/V1/transaction.model');

describe('Transaction Controller Integration Tests', () => {
    const dummyTransaction = { id: 1, type: 'Deposit', amount: 1000, accountId: 1 };
    const dummyTransactions = [dummyTransaction];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterEach(() => {
        jest.clearAllTimers();
    });

    it('should create a transaction successfully', async () => {
        createTransaction.mockResolvedValue(dummyTransaction);

        const response = await request(app)
            .post('/v1/transaction/create')
            .send(dummyTransaction)
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body.status).toBe('Success');
        expect(response.body.result).toEqual(dummyTransaction);
        expect(createTransaction).toHaveBeenCalledWith(dummyTransaction);
    });

    it('should get all transactions successfully', async () => {
        getAllTransactions.mockResolvedValue(dummyTransactions);

        const response = await request(app)
            .get('/v1/transaction/')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body.status).toBe('Success');
        expect(response.body.result).toEqual(dummyTransactions);
        expect(getAllTransactions).toHaveBeenCalled();
    });

    it('should get a transaction by ID successfully', async () => {
        getTransactionId.mockResolvedValue(dummyTransaction);

        const response = await request(app)
            .get('/v1/transaction/1')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body.status).toBe('Success');
        expect(response.body.result).toEqual(dummyTransaction);
        expect(getTransactionId).toHaveBeenCalledWith('1');
    });
});
