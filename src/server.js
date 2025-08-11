const app = require('./app');
const sequelize = require('./database-connection/db');
const cors = require('cors');
const helmet = require('helmet');
const routes = require('./api-routes/index');
const swaggerUi = require('swagger-ui-express');
const specs = require('./swagger/swagger');

const PORT = process.env.PORT || 3000;


app.use(helmet());
app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));


app.use('/api', routes, (req, res, next) => {
    res.status(404).json({ message: 'Not Found' });
})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

async function startServer() {
    try {
        await sequelize.authenticate();
        console.log('✅ Database connected');
        sequelize.sync({ alter: true })
        app.listen(PORT, () => {
            console.log(`🚀 Server is running on http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error('❌ DB connection failed:', err);
        process.exit(1); // Exit the process if DB fails
    }
}

startServer();

