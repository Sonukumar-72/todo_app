const todoController = require("../../controllers/todoController");

// Mocking the Todo model
jest.mock("../../models/todoModel.js", () => {
  const mockSave = jest.fn();
  const mockFind = jest.fn();
  const Todo = jest.fn().mockImplementation(() => ({
    save: mockSave,
  }));
  Todo.find = mockFind; // Adding static method mock
  return Todo;
});

describe("Todo Controller Tests", () => {
  describe("getTodos", () => {
    it("should return a list of todos if everything goes right", async () => {
      const mockTodos = [{ id: 1, title: "Sample Todo", completed: false }];
      const Todo = require("../../models/todoModel.js");
      Todo.find.mockResolvedValue(mockTodos); // Mock resolved value

      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await todoController.getTodos(req, res);

      // Assertions
      expect(Todo.find).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockTodos);
    });

    it("should handle errors if something goes wrong", async () => {
      const errorMessage = "Something went wrong, please try again later.";
      const Todo = require("../../models/todoModel.js");
      Todo.find.mockRejectedValue(new Error(errorMessage)); // Mock rejected value

      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await todoController.getTodos(req, res);

      // Assertions
      expect(Todo.find).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
    });
  });

  describe("addTodo", () => {
    it("should create a new Todo", async () => {
      const newTodo = { _id: "1", title: "New Todo" };
      const Todo = require("../../models/todoModel.js");
      const todoInstance = new Todo();
      todoInstance.save.mockResolvedValue(newTodo); // Mock resolved value for save method

      const req = { body: { title: "New Todo" } }; // Mocking request body
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await todoController.addTodo(req, res);

      // Assertions
      expect(todoInstance.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201); // Assuming status code for resource creation is 201
      expect(res.json).toHaveBeenCalledWith(newTodo);
    });

    it("should handle errors while creating a new Todo", async () => {
      const errorMessage = "Failed to add the todo, please try again.";
      const Todo = require("../../models/todoModel.js");
      const todoInstance = new Todo();
      todoInstance.save.mockRejectedValue(new Error(errorMessage)); // Mock rejected value for save method

      const req = { body: { title: "New Todo" } }; // Mocking request body
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await todoController.addTodo(req, res);

      // Assertions
      expect(todoInstance.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500); // Assuming failure status code is 500
      expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
    });
  });
});
