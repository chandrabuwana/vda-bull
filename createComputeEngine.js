const Compute = require('@google-cloud/compute');
const compute = new Compute();

// Creates a new VM using the latest Ubuntu image.
(async () => {
  try {
    const zone = await compute.zone('us-central1-a');
    const data = await zone.createVM(
      'ubuntu-instance', 
      { os: 'ubuntu' }
    );
    const operation = data[1];
    await operation.promise();
    // Virtual machine created.
  } catch (error) {
    console.error(error);
  }
})();