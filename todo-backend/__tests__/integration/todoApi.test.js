const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Todo = require('../../models/Todo'); // Ensure path is correct

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany();
  }
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

test('should fetch todos', async () => {
  await Todo.create({ title: 'Sample Todo', completed: false });
  const todos = await Todo.find();
  expect(todos).toHaveLength(1);
  expect(todos[0].title).toBe('Sample Todo');
});
