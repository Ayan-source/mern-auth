class AppError extends Error {
    constructor(message, statusCode) {
        super(message);

        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith("4")
            ? "fail"
            : "error";

        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;

// Production projects mein hum throw new Error() kam use karte hain.

// Iski jagah custom error class banate hain.
// Ab controller mein tum likh sakte ho:

// throw new AppError("Email already exists", 409);

// instead of

// throw new Error("Email already exists");

// Ye status code bhi carry karega.

// Ek structured error object banta hai.errorMiddleware us object ko uthata hai aur client ko proper JSON response bhejta hai.