const app = require("./server");

// Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, (err) => {
  if (err) {
    console.error("Failed to start server:", err);
    process.exit(1); // Exit the process with an error code
  }
  console.log(`Server is running on port ${PORT}`);
});
