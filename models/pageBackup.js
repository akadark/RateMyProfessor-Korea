let data = [];

function Page(pages) {
  this.id = pages.id;
  this.course = pages.course;
  this.professor = pages.professor;
  this.difficulty = pages.difficulty;
  this.description = pages.description;
  this.ratingCourse = pages.ratingCourse;
  this.ratingProfessor = pages.ratingProfessor;
  this.question1 = pages.question1;
  this.question2 = pages.question2;
  this.save = function(callback) {
    if (this.id === undefined) { // create new pages info
      this.id = data.length;
      data.push({
        id: this.id,
        course: this.course,
        professor: this.professor,
        difficulty: this.difficulty,
        description: this.description,
        ratingCourse: this.ratingCourse,
        ratingProfessor: this.ratingProfessor,
        question1: this.question1,
        question2: this.question2,
      });
      callback(null);
    }
    else {
      if (data[this.id] !== undefined) { // update by id
        data[this.id] = {
          id: this.id,
          course: this.course,
          professor: this.professor,
          difficulty: this.difficulty,
          description: this.description,
          ratingCourse: this.ratingCourse,
          ratingProfessor: this.ratingProfessor,
          question1: this.question1,
          question2: this.question2,
        };
        callback(null);
      }
      else {
        if (typeof callback === "function") {
          callback("does not exist");
        }
      }
    }
  };

  this.remove = function(callback) {
    if (data[this.id] !== undefined) {
      data.splice(this.id, 1);
      callback(null);
    }
    else {
      callback("document not found");
    }
  };

}

Page.find = function(callback) {
  let docs = [];

  for (let i = 0; i < data.length; i++) {
    docs.push(new Page(data[i]));
  }

  callback(null, data);
};

Page.findById = function(id, callback) {
  if (data[id] !== undefined) {
    callback(null, new Page(data[id]));
  }
  else {
    callback("document not found", null);
  }
};

module.exports = Page;
