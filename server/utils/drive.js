// Importing necessary modules
import fs from 'fs';
import { Storage, File } from 'megajs';

// Replace these with your Mega.nz account details
const megaEmail = process.env.MEGA_EMAIL;
const megaPassword = process.env.MEGA_PASSWORD;

// Download Folder Function
const downloadFolderFromMega = async (link, downloadPath) => {
    return new Promise((resolve, reject) => {
        try {
            const folder = File.fromURL(link);

            console.log('Starting download from Mega...');

            // Iterate over each file in the folder
            folder.loadAttributes((err, files) => {
                if (err) {
                    console.error('Error loading folder attributes:', err);
                    return reject(err);
                }

                const downloadPromises = files.map(file => {
                    return new Promise((fileResolve, fileReject) => {
                        const filePath = `${downloadPath}/${file.name}`;
                        const writeStream = fs.createWriteStream(filePath);

                        file.download().pipe(writeStream);

                        writeStream.on('finish', () => {
                            console.log(`File downloaded successfully to ${filePath}`);
                            fileResolve();
                        });

                        writeStream.on('error', (error) => {
                            console.error('Error downloading file:', error);
                            fileReject(error);
                        });
                    });
                });

                Promise.all(downloadPromises)
                    .then(() => {
                        console.log('All files downloaded successfully.');
                        resolve();
                    })
                    .catch(reject);
            });

        } catch (error) {
            console.error('Error downloading from Mega:', error);
            reject(error);
        }
    });
};

// Upload Folder Function
const uploadFolderToMega = async (folderPath) => {
    return new Promise(async (resolve, reject) => {
        try {
            const storage = new Storage({
                email: megaEmail,
                password: megaPassword,
                keepalive: false
            });

            await new Promise((resolve, reject) => {
                storage.on('ready', resolve);
                storage.on('error', reject);
            });

            console.log('Logged into Mega account successfully.');

            // Read the directory and get all files
            fs.readdir(folderPath, async (err, files) => {
                if (err) {
                    console.error('Error reading folder:', err);
                    return reject(err);
                }

                const uploadPromises = files.map(fileName => {
                    return new Promise((fileResolve, fileReject) => {
                        const filePath = `${folderPath}/${fileName}`;
                        const fileStream = fs.createReadStream(filePath);

                        const uploadedFile = storage.upload({
                            name: fileName
                        }, fileStream);

                        uploadedFile.on('complete', () => {
                            console.log(`File uploaded successfully: ${fileName}`);
                            fileResolve();
                        });

                        uploadedFile.on('error', (error) => {
                            console.error('Error uploading file:', error);
                            fileReject(error);
                        });
                    });
                });

                Promise.all(uploadPromises)
                    .then(() => {
                        console.log('All files uploaded successfully.');
                        resolve(storage.root.toString());
                    })
                    .catch(reject);
            });

        } catch (error) {
            console.error('Error uploading folder to Mega:', error);
            reject(error);
        }
    });
};

// Exporting the functions
export {
    downloadFolderFromMega,
    uploadFolderToMega
};