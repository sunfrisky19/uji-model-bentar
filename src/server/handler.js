const predictClassification = require('../services/inferenceService');
const crypto = require('crypto');
 
async function postPredictHandler(request, h) {
  const { image } = request.payload;
  const { model } = request.server.app;
  const { confidenceScore, label } = await predictClassification(model, image);
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();
 
  const data = {
    "id": id,
    "result": label,
    "confidenceScore": confidenceScore,
    "createdAt": createdAt
  }
 
  const response = h.response({
    status: 'success',
    message: confidenceScore > 99 
        ? 'Model is predicted successfully.'
        : `Prediction confidence is below threshold (Score: ${confidenceScore.toFixed(2)}%). Please try a clearer picture.`,
    data
});

  response.code(201);
  return response;
}
 
module.exports = postPredictHandler;