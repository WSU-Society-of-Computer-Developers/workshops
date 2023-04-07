export default function handler(req, res) {
    try {
        const { id } = req.query
        if (!id) throw "Please give an id."
        if (isNaN(id)) throw "Please provide a valid number for the id"
        res.revalidate("/users/" + id)
        res.status(200).json({msg: `User ${id}'s page has been rebuilt.`})
    } catch (err) {
        res.status(400).json({ msg: err?.toString() })
    }
}