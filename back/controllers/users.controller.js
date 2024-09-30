export const usersApp = async (req, res, next) => {
    app.get('/API/v1/users', async (req, res, next) => {
        res.status(200).json({data: users, message: "Aqui estan los usuarios"})
    })
}