const errorHandler = (err, res) => {
    if (err.message.includes("$")) {
        const [message, status] = err.message.split("$");

        return res.status(status).json({ error: message });
    }

    return res.status(500).json({ error: err.message });
}

export default errorHandler;