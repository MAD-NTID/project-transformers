function IsDoWellOnAllAssignments(answer){
    return answer===true;
}

function IsCanSkipExam(answer){
    return answer===false;
}

function IsCorrectlyDefinedICE(answer){
    if(answer==='undefined' || answer===null)
        return false;

    answer = answer.toLowerCase();
    return answer.includes('in-class exercise') || answer.includes('in class exercise');
}

function IsCorrectICEDue(answer){
    if(answer==='undefined' || answer===null)
        return false;

    answer = answer.toLowerCase();

    return answer.includes('next class');
}

function IsCorrectHomeworkAssigned(answer){
    if(answer==='undefined' || answer===null)
        return false;
    answer = answer.toLowerCase();

    return answer ==='a' || answer==='a.'
}

function isCorrectZeroGradeIfSubmitThreeDaysOrMore(answer){
    return answer === true;
}
