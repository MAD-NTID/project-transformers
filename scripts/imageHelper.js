const path = require('path');
const fileUrl = require('file-url');

function getImageUrl(extRelativePath) {
    try {
        const imagePath = path.join(
            context.extensions.directory,
            'project-transformers',
            extRelativePath
        );
        return fileUrl(imagePath)
    } catch (e) {
        // A default image that exists in the app bundle
        return 'images/app/shield.png';
    }
}

module.exports = {
    getImageUrl
}