const validate = (Schema) => async (req, res, next) => {
    try {
        const parseBody = await Schema.parse(req.body);
        req.body = parseBody
        next()
    } catch (error) {
        res.status(400).json(error)
    }
}

module.exports = validate