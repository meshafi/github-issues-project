function errorHandler(err, req, res, next) {
    console.error(err);

    if (err instanceof CustomError) {
      return res.status(400).json({ success: false, message: err.message });
    }
  
    res.status(500).json({ success: false, message: "Internal server error" });
  }
  
  module.exports = errorHandler;
  