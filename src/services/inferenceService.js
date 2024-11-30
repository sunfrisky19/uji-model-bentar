const tf = require('@tensorflow/tfjs-node');
const InputError = require('../exceptions/InputError');
 
async function predictClassification(model, image) {
    try {
        const tensor = tf.node
            .decodeJpeg(image)
            .resizeNearestNeighbor([150, 150])
            .expandDims()
            .toFloat()
 
        const classes = ['Bawang Bombai','Daging Ayam','Daging Sapi','Daun Bawang','Kubis Merah','Telur','Terong','Timun','Tomat','Wortel'];
 
        const prediction = model.predict(tensor);
        const score = await prediction.data();
        const confidenceScore = Math.max(...score) * 100;
 
        const classResult = tf.argMax(prediction, 1).dataSync()[0];
        const label = classes[classResult];
  
        // if(label === 'Bawang Bombai') 
        // if(label === 'Daging Ayam') 
        // if(label === 'Daging Sapi') 
        // if(label === 'Daun Bawang') 
        // if(label === 'Kubis Merah') 
        // if(label === 'Telur') 
        // if(label === 'Terong') 
        // if(label === 'Timun') 
        // if(label === 'Tomat') 
        // if(label === 'Wortel') 

        return { confidenceScore, label };
    } catch (error) {
        throw new InputError(`Terjadi kesalahan input: ${error.message}`)
    }
}
 
module.exports = predictClassification;