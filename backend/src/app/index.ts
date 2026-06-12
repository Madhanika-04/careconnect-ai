import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import * as dotenv from 'dotenv';
import { authMiddleware } from '../middleware/auth';
import { rateLimiter } from '../middleware/rateLimiter';
import sosRouter from '../routes/sos';
import reportsRouter from '../routes/reports';
import hotspotsRouter from '../routes/hotspots';
import trendsRouter from '../routes/trends';
import openapiSpec from '../openapi.yaml';
import { logger } from '../utils/logger';

dotenv.config();

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(rateLimiter);
app.use(authMiddleware);

// API routes
app.use('/sos', sosRouter);
app.use('/reports', reportsRouter);
app.use('/hotspots', hotspotsRouter);
app.use('/trends', trendsRouter);

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpec));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  logger.info(`⚡️ Backend listening on http://localhost:${PORT}`);
});

export default app;
