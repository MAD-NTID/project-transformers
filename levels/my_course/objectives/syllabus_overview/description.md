<%

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
            console.log('embedded image path not found:', path);
            console.log(e);
            // A default image that exists in the app bundle
            return 'images/app/shield.png';
        }
    }
%>

# The importance of the Syllabus

## What is a syllabus
A syllabus is a document that contains information on what the course is about, professor information, office hours and
what is required for you to be successful in the course.


### NMAD 180 Syllabus
![180 Course Syllabus 2215-01.png](<%= getImageUrl('images/syllabus/180 Course Syllabus 2215-01.png') %>)
![180 Course Syllabus 2215-02.png](<%= getImageUrl('images/syllabus/180 Course Syllabus 2215-02.png') %>)
![180 Course Syllabus 2215-03.png](<%= getImageUrl('images/syllabus/180 Course Syllabus 2215-03.png') %>)
![180 Course Syllabus 2215-04.png](<%= getImageUrl('images/syllabus/180 Course Syllabus 2215-04.png') %>)
![180 Course Syllabus 2215-05.png](<%= getImageUrl('images/syllabus/180 Course Syllabus 2215-05.png') %>)
![180 Course Syllabus 2215-06.png](<%= getImageUrl('images/syllabus/180 Course Syllabus 2215-06.png') %>)
![180 Course Syllabus 2215-07.png](<%= getImageUrl('images/syllabus/180 Course Syllabus 2215-07.png') %>)
![180 Course Syllabus 2215-08.png](<%= getImageUrl('images/syllabus/180 Course Syllabus 2215-08.png') %>)
![180 Course Syllabus 2215-09.png](<%= getImageUrl('images/syllabus/180 Course Syllabus 2215-09.png') %>)
![180 Course Syllabus 2215-10.png](<%= getImageUrl('images/syllabus/180 Course Syllabus 2215-10.png') %>)
![180 Course Syllabus 2215-11.png](<%= getImageUrl('images/syllabus/180 Course Syllabus 2215-11.png') %>)
![180 Course Syllabus 2215-12.png](<%= getImageUrl('images/syllabus/180 Course Syllabus 2215-12.png') %>)
![180 Course Syllabus 2215-13.png](<%= getImageUrl('images/syllabus/180 Course Syllabus 2215-13.png') %>)
![180 Course Syllabus 2215-14.png](<%= getImageUrl('images/syllabus/180 Course Syllabus 2215-14.png') %>)
