const { spawn } = require('node:child_process');
const path = require('path');

// const { exec } = require('child_process');
// exec('which RScript', (err, stdout, stderr) => {
//     if (err) {
//         console.error('Error locating RScript:', stderr);
//     } else {
//         console.log('RScript located at:', stdout);
//     }
// });

// // console.log('PATH:', process.env.PATH);

// function R(path) {
//     this.d = {};
//     this.path = path;
//     this.options = {
//         env: {
//             ...process.env,
//             PATH: process.env.PATH + '/usr/local/bin/RScript'
//         }
//     }
//     this.idCounter = 0;
//     this.args = ["--vanilla", __dirname + "/R/launch.R"];
// }

const rScriptPath = path.resolve(__dirname, '../R/pos_tag_single_file.R');

const processFileContent = (req, res, next) => {
    const dataToSend = {
        message: req.body.fileContent
    };

    const envVars = {...process.env, R_INPUT_DATA: JSON.stringify(dataToSend)};
    const R = spawn('RScript', [rScriptPath], { env: envVars });

    let output = '';
    let errorOutput = '';

    // Capture output from stdout
    R.stdout.on('data', (data) => {
        output += data.toString();
    });

    // Capture error from stderr
    R.stderr.on('data', (data) => {
        errorOutput += data.toString();
        console.error("R stderr:", data.toString());
    });

    // Handle script exit
    R.on('close', (code) => {
        if (code === 0) {
            console.log("Successfully processed");
            console.log(output);
            res.status(200).json(output);  // Send the output to the client
        } else {
            console.log("Could not process file!", code);
            console.log("Error output:", errorOutput);
            res.status(500).send("Could not process file!"); // Handle errors
        }
    });

    // Handle error if R script cannot be spawned
    R.on('error', (err) => {
        console.error("Failed to start RScript", err);
        res.status(500).send("Internal server error");
    });
}

module.exports = {
    processFileContent
}