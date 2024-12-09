const { getTodos, addTodo } = require("../../controllers/todoController");
const Todo = require("../../models/todoModel");

jest.mock("../../models/todoModel");
//jest.mock("../../models/todoModel", () => ({
  //create: jest.fn(),
  //find: jest.fn(),
//}));


describe("Todo Controller Tests", () => {
  let req, res;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks(); // Clear previous mocks before each test
  });

  describe("getTodos", () => {
    it("should fetch all todos", async () => {
      const todos = [{ id: 1, title: "Sample Todo", completed: false }];
      Todo.find.mockResolvedValue(todos); // Mock successful response

      await getTodos(req, res);

      expect(Todo.find).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(todos);
    });

    it("should handle errors if something goes wrong", async () => {
      const errorMessage = "Database error";
      Todo.find.mockRejectedValue(new Error(errorMessage)); // Mock failure

      await getTodos(req, res);

      expect(Todo.find).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Something went wrong, please try again later.",
        error: errorMessage,
      });
    });
  });

  describe("addTodo", () => {
    it("should create a new Todo", async () => {
      req.body = { todo: "New Todo" };
      const newTodo = { _id: "123", title: "New Todo" };

      Todo.mockImplementation(() => ({
        save: jest.fn().mockResolvedValue(newTodo), // Mock save method
      }));

      await addTodo(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(newTodo);
    });

    it("should handle errors while creating a new Todo", async () => {
      req.body = { todo: "New Todo" };
      const errorMessage = "Database save error";

      Todo.mockImplementation(() => ({
        save: jest.fn().mockRejectedValue(new Error(errorMessage)),
      }));

      await addTodo(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Failed to add the todo, please try again.",
        error: errorMessage,
      });
    });
  });
});
