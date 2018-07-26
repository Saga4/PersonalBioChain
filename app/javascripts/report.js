var app=angular.module('formvalid', ['ui.bootstrap','ui.utils']);
app.controller('validationCtrl',function($scope){
    var btn = document.createElement("BUTTON");
  $scope.data=[["Delhi Public School","Adam","Educational","Transfer Certificate","10/6/2001","30/4/2010"],
               ["Laidlaw memorial School","Adam","Educational","Transfer Certificate","18/6/2010","27/4/2015"],
               ["SRM University","Adam","Educational","Degree Certificate","4/7/2015","26/5/2019"],
               ["JPMC","Adam","Professional","Internship Certificate","27/5/2017","27/6/2017"],
               ["Microsoft","Adam","Professional","Internship Certificate","04/6/2018","27/7/2018"]];

console.log($scope.data);
});

function table(doctype){
  
}