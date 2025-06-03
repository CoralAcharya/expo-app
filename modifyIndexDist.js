const fs = require('fs');
const path = require('path');

const filePath = './dist/index.html'; // Assuming the HTML file is in the same directory

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    // const modifiedData = data.replace(/\/_expo/g, './_expo');
    const regex = /(?<!\.)\/_expo/g;

    // Check if there are any matches that need modification
    if (regex.test(data)) {
        // Perform the replacement
        modifiedData = data.replace(regex, './_expo');
        console.log('Modifications applied: Prepending "./" to "/_expo" paths.');
    } else {
        console.log('No modifications needed: "/_expo" paths are already correctly formatted or do not exist.');
    }

    // Option 1: Log to console (for verification)
    console.log(modifiedData);

    // Option 2: Write to a new file (e.g., 'modified_index.html')
    const newFilePath = './dist/index.html';
    fs.writeFile(newFilePath, modifiedData, 'utf8', (err) => {
        if (err) {
            console.error('Error writing the modified file:', err);
            return;
        }
        console.log(`Successfully modified and saved to ${newFilePath}`);
    });

    // Option 3: Overwrite the original file (use with caution!)
    // fs.writeFile(filePath, modifiedData, 'utf8', (err) => {
    //     if (err) {
    //         console.error('Error overwriting the original file:', err);
    //         return;
    //     }
    //     console.log('Successfully modified and overwrote the original file.');
    // });
});